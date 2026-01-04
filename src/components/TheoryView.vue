<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { theorySubjects } from '../data/theorySubjects'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import type { TheorySubject, TheoryQuestion } from '../types'

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
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>'
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
})

// Extract TOC from markdown (h2 headings)
const toc = computed<TocItem[]>(() => {
  if (!selectedQuestion.value) return []
  const headingRegex = /^##\s+(.+)$/gm
  const items: TocItem[] = []
  let match

  while ((match = headingRegex.exec(selectedQuestion.value.content)) !== null) {
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
  content = content.replace(/^(#{1,3})\s+(.+)$/gm, (match, hashes, title) => {
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
      <button class="back-btn" @click="goBack">← Back</button>
      <h2>{{ subject.name }}</h2>
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
            <span :class="['question-type', question.id <= 10 ? 'long-answer' : 'short-answer']">
              {{ question.id <= 10 ? 'Long' : 'Short' }}
            </span>
          </div>
          <h3>{{ question.title }}</h3>
        </button>
      </div>
    </template>

    <!-- Question Detail View -->
    <template v-else>
      <div class="theory-layout">
        <!-- Sidebar -->
        <aside class="sidebar">
          <button class="back-btn" @click="goBackToQuestions">Back to Questions</button>
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
  border: 1px solid #666;
}

.back-btn:hover {
  background: #333;
}

h2 {
  margin: 1rem 0;
}

.subtitle {
  color: #888;
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
  background: #2a2a2a;
  border: 2px solid #333;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.question-card:hover {
  border-color: #646cff;
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
  background: #646cff;
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
  border-right: 1px solid #333;
}

.sidebar-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #646cff;
}

.sidebar-question {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #444;
  line-height: 1.4;
}

.toc-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  color: #666;
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
  color: #888;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
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
  color: #646cff;
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
  margin: 3rem 0;
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
  .theory-layout {
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

  .questions-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-color-scheme: light) {
  .question-card {
    background: #f5f5f5;
    border-color: #ddd;
  }

  .question-number {
    background: #4338ca;
  }

  .question-type.long-answer {
    background: #059669;
  }

  .question-type.short-answer {
    background: #d97706;
  }

  .sidebar {
    border-right-color: #ddd;
  }

  .sidebar-question {
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
