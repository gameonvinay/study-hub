<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { subjectCatalog } from '../data/subjectCatalog'

const route = useRoute()

const subject = computed(() => {
  const subjectId = route.params.subjectId as string
  return subjectCatalog.find(s => s.id === subjectId)
})

const contentTypes = computed(() => {
  if (!subject.value) return []

  const types = []
  if (subject.value.availableContent.mcq) {
    types.push({
      id: 'mcq',
      name: 'MCQ Practice',
      description: 'Test your knowledge with multiple choice questions',
      path: `/${subject.value.id}/mcq`,
      icon: '📝'
    })
  }
  if (subject.value.availableContent.refresher) {
    types.push({
      id: 'refresher',
      name: 'Quick Refresher',
      description: 'Quick review of key concepts',
      path: `/${subject.value.id}/refresher`,
      icon: '📚'
    })
  }
  if (subject.value.availableContent.theory) {
    types.push({
      id: 'theory',
      name: 'Theory Questions',
      description: 'Detailed answers for long-form questions',
      path: `/${subject.value.id}/theory`,
      icon: '📖'
    })
  }
  if (subject.value.availableContent.mindmap) {
    types.push({
      id: 'mindmap',
      name: 'Interactive Mindmap',
      description: 'Explore concepts through visual mind maps',
      path: `/${subject.value.id}/mindmap`,
      icon: '🗺️'
    })
  }

  return types
})
</script>

<template>
  <div v-if="!subject" class="error">
    <h2>Subject not found</h2>
    <p>The subject you're looking for doesn't exist.</p>
    <RouterLink to="/" class="back-btn">Back to Subjects</RouterLink>
  </div>

  <div v-else class="subject-detail">
    <RouterLink to="/" class="back-btn">← Back to Subjects</RouterLink>

    <div class="subject-header">
      <h1>{{ subject.name }}</h1>
      <p class="description">{{ subject.description }}</p>
    </div>

    <div class="content-types">
      <h2>Choose what you want to study:</h2>

      <div class="types-grid">
        <RouterLink
          v-for="type in contentTypes"
          :key="type.id"
          :to="type.path"
          class="type-card"
        >
          <div class="icon">{{ type.icon }}</div>
          <h3>{{ type.name }}</h3>
          <p>{{ type.description }}</p>
        </RouterLink>
      </div>

      <div v-if="contentTypes.length === 0" class="no-content">
        <p>No content available for this subject yet.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error {
  text-align: center;
  padding: 4rem 2rem;
}

.error h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--accent-color);
}

.error p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.subject-detail {
  width: 100%;
}

.back-btn {
  display: inline-block;
  margin-bottom: 2rem;
  background: transparent;
  border: 1px solid var(--border-color);
  padding: 0.6em 1.2em;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  font-weight: 500;
  transition: all 0.2s;
}

.back-btn:hover {
  background: var(--bg-hover);
  border-color: var(--accent-color);
}

.subject-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid var(--border-light);
}

.subject-header h1 {
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  color: var(--accent-color);
}

.description {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin: 0;
}

.content-types h2 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.type-card {
  text-align: center;
  padding: 3rem 2rem;
  background: var(--bg-card);
  border: 2px solid var(--border-light);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  color: inherit;
  display: block;
}

.type-card:hover {
  border-color: var(--accent-color);
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
}

.icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.type-card h3 {
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  color: var(--text-heading);
}

.type-card p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.5;
}

.no-content {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .types-grid {
    grid-template-columns: 1fr;
  }

  .subject-header h1 {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
  }
}
</style>
