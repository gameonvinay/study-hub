<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { subjectCatalog } from '../data/subjectCatalog'

const resumeLink = ref<string | null>(null)
const resumeSubjectName = ref<string | null>(null)

onMounted(() => {
  const saved = localStorage.getItem('mcq-quiz-state')
  if (saved) {
    try {
      const state = JSON.parse(saved)
      const subjectId = state.subjectId

      // Validate that the subject still exists
      const subject = subjectCatalog.find(s => s.id === subjectId)
      if (subject) {
        resumeLink.value = `/${subjectId}/mcq`
        resumeSubjectName.value = subject.name
      } else {
        // Clean up invalid state
        localStorage.removeItem('mcq-quiz-state')
      }
    } catch (e) {
      // Invalid state, clear it
      localStorage.removeItem('mcq-quiz-state')
    }
  }
})

// Get content type badges for each subject
const getContentBadges = (subject: typeof subjectCatalog[0]) => {
  const badges = []
  if (subject.availableContent.mcq) badges.push({ text: 'MCQ', type: 'default' })
  if (subject.availableContent.refresher) badges.push({ text: 'Refresher', type: 'default' })
  if (subject.availableContent.theory) badges.push({ text: 'Theory', type: 'default' })
  if (subject.availableContent.mindmap) badges.push({ text: 'Mindmap', type: 'default' })
  return badges
}
</script>

<template>
  <div>
    <!-- Resume Quiz Banner -->
    <div v-if="resumeLink" class="resume-banner">
      <div>
        <p class="resume-title">Continue where you left off</p>
        <p class="resume-subject">{{ resumeSubjectName }} - MCQ Practice</p>
      </div>
      <RouterLink :to="resumeLink" class="resume-btn">Resume Quiz</RouterLink>
    </div>

    <div class="header">
      <h2>Choose a Subject</h2>
      <p class="subtitle">Select a subject to see available study materials</p>
    </div>

    <div class="subjects-grid">
      <RouterLink
        v-for="subject in subjectCatalog"
        :key="subject.id"
        :to="`/${subject.id}`"
        class="subject-card"
      >
        <h3>{{ subject.name }}</h3>
        <p class="description">{{ subject.description }}</p>

        <div class="badges">
          <span
            v-for="badge in getContentBadges(subject)"
            :key="badge.text"
            class="badge"
          >
            {{ badge.text }}
          </span>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.resume-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 1.5rem 2rem;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  box-shadow: 0 4px 12px rgba(100, 108, 255, 0.3);
}

.resume-title {
  margin: 0 0 0.25rem 0;
  color: #fff;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.resume-subject {
  margin: 0;
  color: #fff;
  font-weight: 500;
  font-size: 1.1rem;
}

.resume-btn {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: #fff;
  padding: 0.75em 1.5em;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
  white-space: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.resume-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.header {
  margin-bottom: 2rem;
}

.header h2 {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
}

.subtitle {
  color: #888;
  margin: 0;
  font-size: 1.1rem;
}

.subjects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.subject-card {
  text-align: left;
  padding: 2rem;
  background: #2a2a2a;
  border: 2px solid #333;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  color: inherit;
  display: block;
}

.subject-card:hover {
  border-color: #555;
  transform: translateY(-2px);
  background: #333;
}

.subject-card h3 {
  margin: 0 0 0.75rem 0;
  font-size: 1.4rem;
  color: #fff;
}

.description {
  margin: 0 0 1.25rem 0;
  color: #888;
  font-size: 0.95rem;
  line-height: 1.5;
}

.badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  background: rgba(100, 108, 255, 0.15);
  color: #646cff;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}


@media (prefers-color-scheme: light) {
  .subject-card {
    background: #f5f5f5;
    border-color: #ddd;
  }

  .subject-card h3 {
    color: #213547;
  }

  .subject-card:hover {
    box-shadow: 0 8px 24px rgba(100, 108, 255, 0.15);
  }

  .badge {
    background: rgba(100, 108, 255, 0.1);
  }
}

@media (max-width: 768px) {
  .resume-banner {
    flex-direction: column;
    text-align: center;
  }

  .subjects-grid {
    grid-template-columns: 1fr;
  }

  .header h2 {
    font-size: 1.5rem;
  }
}
</style>
