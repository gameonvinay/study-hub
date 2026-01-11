<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { theorySubjects } from '../data/theorySubjects'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import type { TheoryQuestion } from '../types'

interface TocItem {
  id: string
  title: string
}

const route = useRoute()
const router = useRouter()

const subject = computed(() => {
  const subjectId = route.params.subjectId as string
  return theorySubjects.find(s => s.id === subjectId)
})

function goBack() {
  const subjectId = route.params.subjectId as string
  router.push({ name: 'subject-detail', params: { subjectId } })
}

const selectedQuestion = ref<TheoryQuestion | null>(null)
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

// Extract TOC from markdown (h2 headings)
const toc = computed<TocItem[]>(() => {
  if (!selectedQuestion.value) return []
  const headingRegex = /^##\s+(.+)$/gm
  const items: TocItem[] = []
  let match

  while ((match = headingRegex.exec(selectedQuestion.value.content)) !== null) {
    if (!match[1]) continue
    const title = match[1].trim()
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')

    items.push({ id, title })
  }

  return items
})

// Add IDs to headings in rendered content
const renderedContent = computed(() => {
  if (!selectedQuestion.value) return ''
  let content = selectedQuestion.value.content

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

function selectQuestion(question: TheoryQuestion) {
  selectedQuestion.value = question
  activeSection.value = ''
  scrollProgress.value = 0
  window.scrollTo(0, 0)
}

function goBackToQuestions() {
  selectedQuestion.value = null
}

function scrollToSection(id: string) {
  activeSection.value = id
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function handleScroll() {
  const headings = document.querySelectorAll('.markdown-content h2[id]')
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

  <div v-else class="theory-container">
    <!-- Question List -->
    <template v-if="!selectedQuestion">
      <div class="theory-header">
        <button class="back-btn" @click="goBack">← Back</button>
        <h2>{{ subject.name }}</h2>
      </div>
      <p class="subtitle">Select a question to view the detailed answer</p>

      <div class="questions-grid">
        <button
          v-for="question in subject.questions"
          :key="question.id"
          class="question-card"
          @click="selectQuestion(question)"
        >
          <div class="question-header">
            <span class="question-number">Q{{ question.id }}</span>
            <span :class="['question-type', question.id === 11 ? 'long-answer' : 'short-answer']">
              {{ question.id === 11 ? 'Long' : 'Short' }}
            </span>
          </div>
          <h3>{{ question.title }}</h3>
        </button>
      </div>
    </template>

    <!-- Question Detail View -->
    <template v-else>
      <!-- Mobile Header -->
      <div class="mobile-nav">
        <button class="back-btn" @click="goBackToQuestions">← Back</button>
        <span class="mobile-title">Q{{ selectedQuestion.id }}</span>
      </div>

      <div class="theory-layout">
        <!-- Sidebar -->
        <aside class="sidebar">
          <button class="back-btn desktop-only" @click="goBackToQuestions">Back to Questions</button>
          <h3 class="sidebar-title">Q{{ selectedQuestion.id }}</h3>
          <p class="sidebar-question">{{ selectedQuestion.title }}</p>

          <nav class="toc" v-if="toc.length > 0">
            <p class="toc-label">Contents</p>
            <ul>
              <li
                v-for="item in toc"
                :key="item.id"
                :class="['toc-item', { active: activeSection === item.id }]"
              >
                <a @click.prevent="scrollToSection(item.id)">
                  {{ item.title }}
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <!-- Content -->
        <main class="content">
          <div class="markdown-content" v-html="renderedContent"></div>
        </main>

        <!-- Scroll Progress Indicator -->
        <div class="scroll-progress">
          {{ scrollProgress }}%
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.theory-container {
  max-width: 1600px;
  margin: 0 auto;
}

.back-btn {
  margin-bottom: 1rem;
  background: transparent;
  border: 1px solid var(--border-color);
}

.back-btn:hover {
  background: var(--bg-hover);
}

h2 {
  margin: 1rem 0;
}

.subtitle {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.questions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.question-card {
  text-align: left;
  padding: 1.5rem;
  background: var(--bg-card);
  border: 2px solid var(--border-light);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.question-card:hover {
  border-color: var(--accent-color);
  transform: translateY(-2px);
}

.question-header {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.75rem;
}

.question-number {
  display: inline-block;
  background: var(--accent-color);
  color: #fff;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.question-type {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.question-type.long-answer {
  background: #10b981;
  color: #fff;
}

.question-type.short-answer {
  background: #f59e0b;
  color: #fff;
}

.question-card h3 {
  margin: 0;
  font-size: 1rem;
  line-height: 1.4;
}

/* Theory Layout */
.theory-layout {
  display: flex;
  gap: 2rem;
}

/* Sidebar */
.sidebar {
  width: 280px;
  flex-shrink: 0;
  position: sticky;
  top: 1rem;
  height: calc(100vh - 2rem);
  overflow-y: auto;
  padding-right: 1rem;
  border-right: 1px solid var(--border-light);
}

.sidebar-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--accent-color);
}

.sidebar-question {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
  line-height: 1.4;
}

.toc-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
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
  font-size: 0.85rem;
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
  color: var(--accent-color);
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
  margin: 3rem 0;
}

.markdown-content :deep(strong) {
  color: var(--text-strong);
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

/* Mobile Nav - hidden on desktop */
.mobile-nav {
  display: none;
}

.mobile-title {
  font-weight: 600;
  color: var(--accent-color);
}

.desktop-only {
  display: block;
}

.theory-header {
  margin-bottom: 1rem;
}

/* Mobile */
@media (max-width: 768px) {
  .theory-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    position: sticky;
    top: 0;
    background: var(--bg-primary);
    padding: 0.75rem 0;
    z-index: 50;
    border-bottom: 1px solid var(--border-light);
  }

  .theory-header .back-btn {
    margin-bottom: 0;
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }

  .theory-header h2 {
    font-size: 1.1rem;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mobile-nav {
    display: flex;
    align-items: center;
    gap: 1rem;
    position: sticky;
    top: 0;
    background: var(--bg-primary);
    padding: 0.75rem 0;
    margin-bottom: 1rem;
    z-index: 50;
    border-bottom: 1px solid var(--border-light);
  }

  .mobile-nav .back-btn {
    margin-bottom: 0;
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }

  .desktop-only {
    display: none !important;
  }

  .theory-layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    position: relative;
    height: auto;
    max-height: 150px;
    border-right: none;
    border-bottom: 1px solid var(--border-light);
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }

  .questions-grid {
    grid-template-columns: 1fr;
  }
}
</style>
