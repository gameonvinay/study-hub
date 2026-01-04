<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { theorySubjects } from '../data/theorySubjects'
</script>

<template>
  <div>
    <RouterLink to="/" class="back-btn">Back to Menu</RouterLink>
    <h2>Theory Questions</h2>
    <p class="subtitle">Select a subject for detailed theory answers</p>

    <div class="subjects-grid">
      <RouterLink
        v-for="subject in theorySubjects"
        :key="subject.id"
        :to="{ name: 'theory-subject', params: { subjectId: subject.id } }"
        class="subject-card"
      >
        <h3>{{ subject.name }}</h3>
        <p>{{ subject.questions.length }} questions</p>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.back-btn {
  margin-bottom: 1rem;
  background: transparent;
  border: 1px solid #666;
  text-decoration: none;
  color: inherit;
  display: inline-block;
  border-radius: 8px;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  transition: border-color 0.2s, background-color 0.2s;
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

.subjects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.subject-card {
  text-align: left;
  padding: 1.5rem;
  background: #2a2a2a;
  border: 2px solid #333;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  color: inherit;
  display: block;
}

.subject-card:hover {
  border-color: #646cff;
  transform: translateY(-2px);
}

.subject-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.subject-card p {
  margin: 0;
  color: #888;
  font-size: 0.9rem;
}

@media (prefers-color-scheme: light) {
  .subject-card {
    background: #f5f5f5;
    border-color: #ddd;
  }

  .back-btn:hover {
    background: #eee;
  }
}
</style>
