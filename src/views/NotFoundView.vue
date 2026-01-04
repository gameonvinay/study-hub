<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="not-found">
    <h2>404 - Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
    <RouterLink to="/" class="back-btn">Go Home</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 4rem 2rem;
}

.not-found h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #646cff;
}

.not-found p {
  color: #888;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.back-btn {
  display: inline-block;
  margin-top: 1rem;
  background: #646cff;
  color: #fff;
  border: none;
  padding: 0.6em 1.2em;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
}

.back-btn:hover {
  background: #535bf2;
}
</style>
