<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <header>
      <h1>Study Hub</h1>
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
}

header {
  margin-bottom: 2rem;
}

h1 {
  font-size: 2rem;
  margin: 0;
}
</style>
