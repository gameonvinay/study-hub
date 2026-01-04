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
  color: #646cff;
}

.error p {
  color: #888;
  margin-bottom: 2rem;
}

.subject-detail {
  max-width: 1200px;
  margin: 0 auto;
}

.back-btn {
  display: inline-block;
  margin-bottom: 2rem;
  background: transparent;
  border: 1px solid #666;
  padding: 0.6em 1.2em;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  font-weight: 500;
  transition: all 0.2s;
}

.back-btn:hover {
  background: #333;
  border-color: #646cff;
}

.subject-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #333;
}

.subject-header h1 {
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  color: #646cff;
}

.description {
  font-size: 1.2rem;
  color: #888;
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
  background: #2a2a2a;
  border: 2px solid #333;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  color: inherit;
  display: block;
}

.type-card:hover {
  border-color: #646cff;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(100, 108, 255, 0.2);
}

.icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.type-card h3 {
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  color: #fff;
}

.type-card p {
  margin: 0;
  color: #888;
  font-size: 1rem;
  line-height: 1.5;
}

.no-content {
  text-align: center;
  padding: 4rem 2rem;
  color: #888;
}

@media (prefers-color-scheme: light) {
  .subject-header {
    border-bottom-color: #ddd;
  }

  .type-card {
    background: #f5f5f5;
    border-color: #ddd;
  }

  .type-card h3 {
    color: #213547;
  }

  .type-card:hover {
    box-shadow: 0 8px 24px rgba(100, 108, 255, 0.15);
  }

  .back-btn:hover {
    background: #eee;
  }
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
