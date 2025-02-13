<template>
  <header class="header">
 
    <nav class="nav-container">
      <router-link to="/" class="logo">
        <Newspaper class="logo-icon" />
        <span>InfoNews</span>
      </router-link>
      <div class="nav-links">
        <router-link to="/">Inicio</router-link>
        <router-link to="/categories">Categorías</router-link>
        <router-link to="/trending">Tendencias</router-link>
      </div>
      <button @click="toggleTheme" class="theme-toggle">
        <Sun v-if="isDarkMode" />
        <Moon v-else />
      </button>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Newspaper, Sun, Moon } from 'lucide-vue-next'

const isDarkMode = ref(false)
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  document.body.classList.toggle('dark-mode')
}
</script>