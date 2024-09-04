<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="py-4 px-2 bg-gray-900 text-white font-semibold">
      <RouterLink class="hover:bg-blue-700 px-4 py-2 rounded-md" to="/">Home</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>
