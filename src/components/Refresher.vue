<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { refresherSubjects } from '../data/refreshers'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

interface TocItem {
  id: string
  title: string
  level: number
}

const route = useRoute()
const router = useRouter()

const subject = computed(() => {
  const subjectId = route.params.subjectId as string
  return refresherSubjects.find(s => s.id === subjectId)
})

function goBack() {
  const subjectId = route.params.subjectId as string
  router.push({ name: 'subject-detail', params: { subjectId } })
}

const activeSection = ref('')
const scrollProgress = ref(0)
const searchQuery = ref('')
const mobileMenuOpen = ref(false)

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

const md = new MarkdownIt({
  html: true,
  highlight: function (str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>'
      } catch (__) {
        // fallthrough
      }
    }
    const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (m) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m] || m)
    )
    return '<pre class="hljs"><code>' + escapeHtml(str) + '</code></pre>'
  }
})

// Helper function to generate ID from title
function generateId(title: string): string {
  return title
    .trim()
    .toLowerCase()
    // Decode common HTML entities first
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // Remove non-alphanumeric (except spaces)
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
}

// Extract TOC from markdown (only Module headings)
const toc = computed<TocItem[]>(() => {
  if (!subject.value) return []
  const headingRegex = /^##\s+(Module\s+\d+[^#\n]*?)$/gm
  const items: TocItem[] = []
  let match

  while ((match = headingRegex.exec(subject.value.content)) !== null) {
    if (!match[1]) continue
    const title = match[1].trim()
    const id = generateId(title)

    items.push({ id, title, level: 2 })
  }

  return items
})

// Search results - find headings that match search query
const searchResults = computed<Array<{ id: string; title: string; level: number }>>(() => {
  if (!subject.value || !searchQuery.value.trim()) return []

  const query = searchQuery.value.toLowerCase()
  const headingRegex = /^(#{1,3})\s+(.+)$/gm
  const results: Array<{ id: string; title: string; level: number }> = []
  let match

  while ((match = headingRegex.exec(subject.value.content)) !== null) {
    if (!match[1] || !match[2]) continue
    const title = match[2].trim()
    const level = match[1].length

    // Check if title contains search query
    if (title.toLowerCase().includes(query)) {
      const id = generateId(title)
      results.push({ id, title, level })
    }
  }

  return results
})

// Add IDs to headings in rendered content
const renderedContent = computed(() => {
  if (!subject.value) return ''
  let content = subject.value.content

  // Render markdown first
  let html = md.render(content)

  // Add IDs to h1, h2, h3 headings directly in HTML
  // Match opening tag, capture everything until closing tag
  html = html.replace(/<(h[1-3])>([\s\S]*?)<\/\1>/gi, (_match, tag, titleContent) => {
    // Strip any HTML tags from title to generate clean ID
    const cleanTitle = titleContent.replace(/<[^>]*>/g, '').trim()
    const id = generateId(cleanTitle)
    return `<${tag} id="${id}">${titleContent}</${tag}>`
  })

  // Highlight search matches if there's a query
  // Only highlight text content, not inside HTML tags or attributes
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.trim()
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(escapedQuery, 'gi')

    // Split HTML into tags and text, only highlight in text parts
    html = html.replace(/>([^<]+)</g, (_match, textContent) => {
      const highlighted = textContent.replace(regex, '<mark class="search-highlight">$&</mark>')
      return `>${highlighted}<`
    })
  }

  return html
})

// Custom smooth scroll with fixed 200ms duration
function smoothScrollTo(targetY: number, duration: number = 200) {
  const startY = window.pageYOffset
  const difference = targetY - startY
  const startTime = performance.now()

  function step(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Ease out cubic for smooth deceleration
    const easeOut = 1 - Math.pow(1 - progress, 3)

    window.scrollTo(0, startY + difference * easeOut)

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

// Smooth scroll element into view within container with fixed 200ms duration
function smoothScrollIntoView(element: Element, duration: number = 200) {
  const container = element.closest('.sidebar') as HTMLElement | null
  if (!container) return

  const containerRect = container.getBoundingClientRect()
  const elementRect = element.getBoundingClientRect()

  // Calculate offset needed to bring element into view
  let scrollOffset = 0
  if (elementRect.top < containerRect.top) {
    scrollOffset = elementRect.top - containerRect.top - 10
  } else if (elementRect.bottom > containerRect.bottom) {
    scrollOffset = elementRect.bottom - containerRect.bottom + 10
  } else {
    return // Already in view
  }

  const scrollContainer = container // Capture for closure
  const startScrollTop = scrollContainer.scrollTop
  const targetScrollTop = startScrollTop + scrollOffset
  const startTime = performance.now()

  function step(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOut = 1 - Math.pow(1 - progress, 3)

    scrollContainer.scrollTop = startScrollTop + (targetScrollTop - startScrollTop) * easeOut

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

function scrollToSection(id: string) {
  activeSection.value = id

  nextTick(() => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -20
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      smoothScrollTo(y, 200)
    }
  })
}

function handleScroll() {
  const headings = document.querySelectorAll('.markdown-content h1[id], .markdown-content h2[id]')
  const headingsArray = Array.from(headings)
  let currentActive = ''
  let currentIndex = -1

  headingsArray.forEach((heading, index) => {
    const rect = heading.getBoundingClientRect()
    if (rect.top <= 120) {
      currentActive = heading.id
      currentIndex = index
    }
  })

  // Calculate scroll progress within current section
  if (currentIndex >= 0) {
    const currentHeading = headingsArray[currentIndex] as HTMLElement
    const nextHeading = headingsArray[currentIndex + 1] as HTMLElement | undefined

    const currentTop = currentHeading.offsetTop
    const nextTop = nextHeading ? nextHeading.offsetTop : document.documentElement.scrollHeight
    const sectionHeight = nextTop - currentTop

    const scrolled = window.scrollY - currentTop + 120
    const progress = Math.min(100, Math.max(0, (scrolled / sectionHeight) * 100))
    scrollProgress.value = Math.round(progress)
  }

  // Find the nearest Module heading if current heading is not in TOC
  if (currentActive) {
    const tocIds = toc.value.map(item => item.id)
    let activeToHighlight = currentActive

    // If current heading is not a Module heading, find the nearest Module heading before it
    if (!tocIds.includes(currentActive)) {
      for (let i = currentIndex; i >= 0; i--) {
        const headingId = (headingsArray[i] as HTMLElement).id
        if (tocIds.includes(headingId)) {
          activeToHighlight = headingId
          break
        }
      }
    }

    if (activeToHighlight && activeToHighlight !== activeSection.value) {
      activeSection.value = activeToHighlight
      // Scroll active item into view in sidebar after Vue updates DOM
      nextTick(() => {
        const activeLink = document.querySelector('.toc-item.active')
        if (activeLink) {
          smoothScrollIntoView(activeLink, 200)
        }
      })
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  // Initial check
  setTimeout(() => {
    handleScroll()
    if (!activeSection.value && toc.value.length > 0 && toc.value[0]) {
      activeSection.value = toc.value[0].id
    }
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div v-if="!subject" class="error">
    <p>Subject not found</p>
    <button class="back-btn" @click="goBack">Back to Subject</button>
  </div>

  <div v-else class="refresher-wrapper">
    <!-- Mobile Header -->
    <div class="mobile-header">
      <button class="back-btn" @click="goBack">←</button>
      <div class="mobile-search">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="search-input"
        />
        <span v-if="searchQuery" class="search-clear" @click="searchQuery = ''">×</span>
      </div>
      <button class="hamburger-btn" @click="toggleMobileMenu">
        <span class="hamburger-icon" :class="{ open: mobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu-overlay" :class="{ open: mobileMenuOpen }" @click="closeMobileMenu"></div>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ open: mobileMenuOpen }">
      <div class="mobile-menu-header">
        <h3>{{ subject.name }}</h3>
        <button class="close-btn" @click="closeMobileMenu">×</button>
      </div>

      <!-- Search Input -->
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search in content..."
          class="search-input"
        />
        <span v-if="searchQuery" class="search-clear" @click="searchQuery = ''">×</span>
      </div>

      <!-- Show search results when searching -->
      <nav v-if="searchQuery.trim()" class="toc search-results">
        <p class="search-label">{{ searchResults.length }} result(s) found</p>
        <ul v-if="searchResults.length > 0">
          <li
            v-for="item in searchResults"
            :key="item.id"
            :class="['toc-item', `level-${item.level}`, { active: activeSection === item.id }]"
          >
            <a @click.prevent="scrollToSection(item.id); closeMobileMenu()">
              {{ item.title }}
            </a>
          </li>
        </ul>
        <p v-else class="no-results">No matches found</p>
      </nav>

      <!-- Show normal TOC when not searching -->
      <nav v-else class="toc">
        <ul>
          <li
            v-for="item in toc"
            :key="item.id"
            :class="['toc-item', `level-${item.level}`, { active: activeSection === item.id }]"
          >
            <a @click.prevent="scrollToSection(item.id); closeMobileMenu()">
              {{ item.title }}
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="refresher-layout">
      <!-- Sidebar (Desktop) -->
      <aside class="sidebar">
        <button class="back-btn" @click="goBack">← Back</button>

        <!-- Search Input -->
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search in content..."
            class="search-input"
          />
          <span v-if="searchQuery" class="search-clear" @click="searchQuery = ''">×</span>
        </div>

        <h3 class="sidebar-title">{{ subject.name }}</h3>

        <!-- Show search results when searching -->
        <nav v-if="searchQuery.trim()" class="toc search-results">
          <p class="search-label">{{ searchResults.length }} result(s) found</p>
          <ul v-if="searchResults.length > 0">
            <li
              v-for="item in searchResults"
              :key="item.id"
              :class="['toc-item', `level-${item.level}`, { active: activeSection === item.id }]"
            >
              <a @click.prevent="scrollToSection(item.id)">
                {{ item.title }}
              </a>
            </li>
          </ul>
          <p v-else class="no-results">No matches found</p>
        </nav>

        <!-- Show normal TOC when not searching -->
        <nav v-else class="toc">
          <ul>
            <li
              v-for="item in toc"
              :key="item.id"
              :class="['toc-item', `level-${item.level}`, { active: activeSection === item.id }]"
            >
              <a @click.prevent="scrollToSection(item.id)">
                {{ item.title }}
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Content -->
      <main class="content" ref="contentRef">
        <div class="markdown-content" v-html="renderedContent"></div>
      </main>
    </div>

    <!-- Scroll Progress Indicator -->
    <div class="scroll-progress">
      {{ scrollProgress }}%
    </div>
  </div>
</template>

<style scoped>
.refresher-wrapper {
  max-width: 1600px;
  margin: 0 auto;
  position: relative;
}

.refresher-layout {
  display: flex;
  gap: 2rem;
}

/* Ensure body doesn't clip fixed elements */
:global(body) {
  overflow-x: hidden;
}

/* Sidebar */
.sidebar {
  width: 260px;
  flex-shrink: 0;
  position: sticky;
  top: 1rem;
  height: calc(100vh - 2rem);
  overflow-y: auto;
  padding-right: 1rem;
  border-right: 1px solid var(--border-light);
}

.back-btn {
  width: 100%;
  margin-bottom: 1rem;
  background: transparent;
  border: 1px solid var(--border-color);
  text-align: left;
}

.back-btn:hover {
  background: var(--bg-hover);
}

.sidebar-title {
  font-size: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-secondary);
}

/* Search Box */
.search-box {
  position: relative;
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  color: var(--text-primary);
  font-size: 0.85rem;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--accent-color);
  background: var(--bg-primary);
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-clear {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
  padding: 0 0.25rem;
  transition: color 0.2s;
}

.search-clear:hover {
  color: var(--text-heading);
}

.search-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
  padding: 0 0.75rem;
}

.no-results {
  font-size: 0.85rem;
  color: var(--text-muted);
  padding: 0.5rem 0.75rem;
  font-style: italic;
}

.toc ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin-bottom: 0.25rem;
}

.toc-item a {
  display: block;
  padding: 0.4rem 0.75rem;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.toc-item a:hover {
  color: var(--text-heading);
  background: var(--bg-secondary);
}

.toc-item.active a {
  color: var(--accent-color);
  background: var(--accent-bg);
  border-left: 2px solid var(--accent-color);
}

.toc-item.level-1 a {
  font-weight: 600;
  font-size: 0.95rem;
}

.toc-item.level-2 a {
  padding-left: 1.25rem;
}

.toc-item.level-3 a {
  padding-left: 1.75rem;
  font-size: 0.85rem;
}

/* Content */
.content {
  flex: 1;
  min-width: 0;
  padding-bottom: 4rem;
}

.markdown-content {
  line-height: 1.7;
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3) {
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  scroll-margin-top: 1rem;
}

.markdown-content :deep(h1) {
  font-size: 1.8rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.5rem;
}

.markdown-content :deep(h2) {
  font-size: 1.4rem;
}

.markdown-content :deep(h3) {
  font-size: 1.2rem;
}

.markdown-content :deep(p) {
  margin-bottom: 1rem;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.markdown-content :deep(li) {
  margin-bottom: 0.5rem;
}

.markdown-content :deep(code) {
  background: var(--bg-code);
  color: var(--text-code);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.9rem;
}

.markdown-content :deep(pre.hljs) {
  background: var(--bg-code-block);
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  margin-bottom: 1rem;
  color: var(--text-code);
}

.markdown-content :deep(pre.hljs code) {
  background: none;
  padding: 0;
  color: var(--text-code);
}

.markdown-content :deep(pre.hljs code *) {
  color: inherit !important;
}

.markdown-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
  border: 1px solid var(--border-color);
  padding: 0.5rem 0.75rem;
  text-align: left;
}

.markdown-content :deep(th) {
  background: var(--bg-secondary);
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid var(--accent-color);
  margin: 1rem 0;
  padding-left: 1rem;
  color: var(--text-secondary);
}

.markdown-content :deep(hr) {
  border: none;
  height: 12px;
  background:
    linear-gradient(to right, transparent, var(--accent-color), transparent) 0 0,
    linear-gradient(to right, transparent, var(--border-color), transparent) 0 50%,
    linear-gradient(to right, transparent, var(--accent-color), transparent) 0 100%;
  background-size: 100% 3px;
  background-repeat: no-repeat;
  margin: 4rem 0;
}

.markdown-content :deep(strong) {
  color: var(--text-strong);
}

.markdown-content :deep(mark.search-highlight) {
  background: var(--accent-color);
  color: #fff;
  padding: 0.1rem 0.2rem;
  border-radius: 2px;
  font-weight: 500;
}

/* Scroll Progress Indicator */
.scroll-progress {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
  z-index: 100;
  min-width: 50px;
  text-align: center;
}

/* Mobile Header - hidden on desktop */
.mobile-header {
  display: none;
}

.mobile-menu-overlay {
  display: none;
}

.mobile-menu {
  display: none;
}

/* Mobile */
@media (max-width: 768px) {
  .mobile-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    position: fixed;
    top: 52px;
    left: 0;
    width: 100%;
    max-width: 100vw;
    background: var(--bg-primary);
    padding: 0.75rem 1rem;
    z-index: 9999;
    border-bottom: 1px solid var(--border-light);
    box-sizing: border-box;
    overflow: hidden;
  }

  .refresher-wrapper {
    padding-top: 52px;
  }

  .mobile-header .back-btn {
    margin: 0;
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
    flex-shrink: 0;
    width: auto;
  }

  .mobile-search {
    flex: 1;
    position: relative;
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
  }

  .mobile-search .search-input {
    width: 100%;
    max-width: 100%;
    padding: 0.5rem 2rem 0.5rem 0.75rem;
    font-size: 0.85rem;
    box-sizing: border-box;
    background: var(--bg-input);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    color: var(--text-primary);
  }

  .mobile-search .search-clear {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-secondary);
    cursor: pointer;
  }

  .hamburger-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    flex-shrink: 0;
    background: transparent;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    cursor: pointer;
  }

  .hamburger-icon {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 18px;
    height: 14px;
  }

  .hamburger-icon span {
    display: block;
    width: 100%;
    height: 2px;
    background: var(--text-primary);
    border-radius: 1px;
    transition: all 0.3s;
  }

  .hamburger-icon.open span:nth-child(1) {
    transform: rotate(45deg) translate(4px, 4px);
  }

  .hamburger-icon.open span:nth-child(2) {
    opacity: 0;
  }

  .hamburger-icon.open span:nth-child(3) {
    transform: rotate(-45deg) translate(4px, -4px);
  }

  .mobile-menu-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 200;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
  }

  .mobile-menu-overlay.open {
    opacity: 1;
    visibility: visible;
    width: 100vw;
    height: 100vh;
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-secondary);
    z-index: 300;
    padding: 1rem;
    box-sizing: border-box;
    overflow: hidden;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0.3s, opacity 0.3s;
  }

  .mobile-menu .toc {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    margin: 0 -1rem;
    padding: 0 1rem;
  }

  .mobile-menu.open {
    visibility: visible;
    opacity: 1;
    width: 100vw;
  }

  .mobile-menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);
  }

  .mobile-menu-header h3 {
    margin: 0;
    font-size: 1rem;
    color: var(--accent-color);
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    background: transparent;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
    color: var(--text-primary);
  }

  .mobile-menu .search-box {
    margin-bottom: 1rem;
  }

  .mobile-menu .toc-item a {
    display: block;
    padding: 0.6rem 0.75rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100vw - 3rem);
  }

  .sidebar {
    display: none;
  }

  .refresher-layout {
    flex-direction: column;
  }
}
</style>
