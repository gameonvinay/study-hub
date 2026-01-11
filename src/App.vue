<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'

const isDarkTheme = ref(true)

function toggleTheme() {
  isDarkTheme.value = !isDarkTheme.value
  applyTheme()
  localStorage.setItem('theme', isDarkTheme.value ? 'dark' : 'light')
}

function applyTheme() {
  if (isDarkTheme.value) {
    document.documentElement.classList.remove('light-theme')
  } else {
    document.documentElement.classList.add('light-theme')
  }
}

onMounted(() => {
  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDarkTheme.value = savedTheme === 'dark'
  } else {
    isDarkTheme.value = !window.matchMedia('(prefers-color-scheme: light)').matches
  }
  applyTheme()
})
</script>

<template>
  <div class="app">
    <header>
      <h1>Study Hub</h1>
      <button class="theme-toggle" @click="toggleTheme" :title="isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'">
        <svg v-if="isDarkTheme" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <!-- Moon icon - shown in dark mode -->
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
        <svg v-else class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <!-- Sun icon - shown in light mode -->
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      </button>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  padding: 2rem;
  padding-top: 0;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 1rem;
  position: sticky;
  top: 0;
  background: var(--bg-primary);
  z-index: 100;
  border-bottom: 1px solid var(--border-light);
}

h1 {
  font-size: 2rem;
  margin: 0;
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.theme-toggle:hover {
  border-color: var(--accent-color);
  background: var(--accent-bg-light);
}

.icon {
  width: 20px;
  height: 20px;
}

@media (max-width: 768px) {
  .app {
    padding: 1rem;
    padding-top: 0;
  }

  header {
    padding: 0.75rem 0;
  }

  h1 {
    font-size: 1.25rem;
  }

  .theme-toggle {
    width: 36px;
    height: 36px;
  }

  .icon {
    width: 18px;
    height: 18px;
  }
}
</style>
