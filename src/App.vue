<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import HabitList from './components/HabitList.vue'

const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('darkMode', isDarkMode.value.toString())
}

onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode) {
    isDarkMode.value = savedDarkMode === 'true'
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    }
  } else {
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    }
  }
})

watch(isDarkMode, (newValue) => {
  if (newValue) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-end mb-4">
        <button
          @click="toggleDarkMode"
          class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {{ isDarkMode ? '☀️' : '🌙' }}
        </button>
      </div>
      <HabitList />
    </div>
  </div>
</template>

<!--<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->
