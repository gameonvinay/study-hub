<template>
  <div class="mindmap-view">
    <div class="back-button">
      <button @click="goBack" class="btn-back">← Back</button>
    </div>

    <div class="mindmap-layout">
      <div class="sidebar">
        <div class="sidebar-header">
          <h3>{{ module1Info.title }}</h3>
          <span class="topic-count">{{ categories.length }} Topics</span>
        </div>

        <div class="category-list">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectCategory(category)"
            :class="['category-item', { active: selectedCategory?.id === category.id }]"
          >
            <span class="category-dot" :style="{ background: category.color }"></span>
            <span class="category-name">{{ category.title }}</span>
          </button>
        </div>
      </div>

      <div class="content-area">
        <div class="mindmap-container" v-if="selectedCategory">
          <MindmapComponent
            :markdown="selectedCategory.markdown"
            :title="selectedCategory.title"
            :color="selectedCategory.color"
            :key="selectedCategory.id"
          />
        </div>

        <div class="empty-state" v-else>
          <div class="empty-content">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="6"/>
              <circle cx="12" cy="12" r="2"/>
            </svg>
            <h3>Select a Topic</h3>
            <p>Choose a topic from the left to explore</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MindmapComponent from '../components/MindmapComponent.vue'
import { module1Categories, module1Info, type MindmapCategory } from '../data/data-science/question-bank/mindmap/module1'

const router = useRouter()
const categories = module1Categories
const selectedCategory = ref<MindmapCategory | null>(null)

const selectCategory = (category: MindmapCategory) => {
  selectedCategory.value = category
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.mindmap-view {
  width: 100%;
  padding: 1rem;
}

.back-button {
  margin-bottom: 1rem;
}

.btn-back {
  padding: 0.5rem 1rem;
  background: #2a2a2a;
  border: 1px solid #444;
  border-radius: 6px;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.btn-back:hover {
  background: #333;
  border-color: #555;
}

.mindmap-layout {
  display: flex;
  gap: 1rem;
  height: calc(100vh - 120px);
}

.sidebar {
  width: 280px;
  background: #2a2a2a;
  border-radius: 8px;
  padding: 1rem;
  overflow-y: auto;
  flex-shrink: 0;
}

.sidebar-header {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #444;
}

.sidebar-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  color: #fff;
  font-weight: 600;
}

.topic-count {
  display: inline-block;
  background: #333;
  color: #aaa;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  color: #ccc;
  font-size: 0.875rem;
}

.category-item:hover {
  background: #333;
}

.category-item.active {
  background: #333;
  color: #fff;
}

.category-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.category-name {
  flex: 1;
  line-height: 1.3;
}

.content-area {
  flex: 1;
  min-width: 0;
}

.mindmap-container {
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: #2a2a2a;
}

.empty-state {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2a2a2a;
  border-radius: 8px;
}

.empty-content {
  text-align: center;
  color: #888;
  padding: 2rem;
}

.empty-content svg {
  opacity: 0.3;
  margin-bottom: 1rem;
  color: #666;
}

.empty-content h3 {
  margin: 1rem 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #aaa;
}

.empty-content p {
  margin: 0;
  font-size: 0.9rem;
  color: #888;
}

@media (max-width: 768px) {
  .mindmap-layout {
    flex-direction: column;
    height: auto;
  }

  .sidebar {
    width: 100%;
    max-height: 300px;
  }

  .mindmap-container {
    height: 500px;
  }
}
</style>
