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

// Extract TOC from markdown (only h1 and h2, skip repetitive h3s)
const toc = computed<TocItem[]>(() => {
  if (!subject.value) return []
  const headingRegex = /^(#{1,2})\s+(.+)$/gm
  const items: TocItem[] = []
  let match

  while ((match = headingRegex.exec(subject.value.content)) !== null) {
    if (!match[1] || !match[2]) continue
    const level = match[1].length
    const title = match[2].trim()
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')

    items.push({ id, title, level })
  }

  return items
})

// Add IDs to headings in rendered content
const renderedContent = computed(() => {
  if (!subject.value) return ''
  let content = subject.value.content

  // Add IDs to headings
  content = content.replace(/^(#{1,3})\s+(.+)$/gm, (_match, hashes, title) => {
    const id = title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
    return `${hashes} ${title} {#${id}}`
  })

  // Render with custom heading IDs
  let html = md.render(content)

  // Convert {#id} syntax to actual IDs
  html = html.replace(/<(h[1-3])>(.+?)\s*\{#([^}]+)\}<\/\1>/g, '<$1 id="$3">$2</$1>')

  return html
})

function scrollToSection(id: string) {
  activeSection.value = id
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
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

  if (currentActive && currentActive !== activeSection.value) {
    activeSection.value = currentActive
    // Scroll active item into view in sidebar after Vue updates DOM
    nextTick(() => {
      const activeLink = document.querySelector('.toc-item.active')
      if (activeLink) {
        activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    })
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

  <div v-else class="refresher-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <button class="back-btn" @click="goBack">← Back</button>
      <h3 class="sidebar-title">{{ subject.name }}</h3>

      <nav class="toc">
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

    <!-- Scroll Progress Indicator -->
    <div class="scroll-progress">
      {{ scrollProgress }}%
    </div>
  </div>
</template>

<style scoped>
.refresher-layout {
  display: flex;
  gap: 2rem;
  max-width: 1600px;
  margin: 0 auto;
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
  border-right: 1px solid #333;
}

.back-btn {
  width: 100%;
  margin-bottom: 1rem;
  background: transparent;
  border: 1px solid #666;
  text-align: left;
}

.back-btn:hover {
  background: #333;
}

.sidebar-title {
  font-size: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #444;
  color: #888;
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
  color: #888;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.toc-item a:hover {
  color: #fff;
  background: #2a2a2a;
}

.toc-item.active a {
  color: #646cff;
  background: #1a1a3a;
  border-left: 2px solid #646cff;
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
  border-bottom: 1px solid #444;
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
  background: #2a2a2a;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.9rem;
}

.markdown-content :deep(pre.hljs) {
  background: #1a1a1a;
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.markdown-content :deep(pre.hljs code) {
  background: none;
  padding: 0;
}

.markdown-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
  border: 1px solid #444;
  padding: 0.5rem 0.75rem;
  text-align: left;
}

.markdown-content :deep(th) {
  background: #2a2a2a;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid #646cff;
  margin: 1rem 0;
  padding-left: 1rem;
  color: #888;
}

.markdown-content :deep(hr) {
  border: none;
  height: 12px;
  background:
    linear-gradient(to right, transparent, #646cff, transparent) 0 0,
    linear-gradient(to right, transparent, #444, transparent) 0 50%,
    linear-gradient(to right, transparent, #646cff, transparent) 0 100%;
  background-size: 100% 3px;
  background-repeat: no-repeat;
  margin: 4rem 0;
}

.markdown-content :deep(strong) {
  color: #ccc;
}

/* Scroll Progress Indicator */
.scroll-progress {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #2a2a2a;
  border: 1px solid #444;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.85rem;
  color: #888;
  font-weight: 500;
  z-index: 100;
  min-width: 50px;
  text-align: center;
}

/* Mobile */
@media (max-width: 768px) {
  .refresher-layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    position: relative;
    height: auto;
    max-height: 200px;
    border-right: none;
    border-bottom: 1px solid #333;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
}

@media (prefers-color-scheme: light) {
  .sidebar {
    border-right-color: #ddd;
  }

  .sidebar-title {
    border-bottom-color: #ddd;
  }

  .toc-item a:hover {
    color: #000;
    background: #f0f0f0;
  }

  .toc-item.active a {
    background: #e8e8ff;
  }

  .markdown-content :deep(code) {
    background: #f0f0f0;
  }

  .markdown-content :deep(pre.hljs) {
    background: #f5f5f5;
  }

  .markdown-content :deep(th) {
    background: #f0f0f0;
  }

  .markdown-content :deep(th),
  .markdown-content :deep(td) {
    border-color: #ddd;
  }

  .markdown-content :deep(hr) {
    background:
      linear-gradient(to right, transparent, #646cff, transparent) 0 0,
      linear-gradient(to right, transparent, #ccc, transparent) 0 50%,
      linear-gradient(to right, transparent, #646cff, transparent) 0 100%;
    background-size: 100% 3px;
    background-repeat: no-repeat;
  }

  .markdown-content :deep(strong) {
    color: #000;
  }

  .back-btn:hover {
    background: #eee;
  }

  .scroll-progress {
    background: #f5f5f5;
    border-color: #ddd;
    color: #666;
  }
}
</style>
