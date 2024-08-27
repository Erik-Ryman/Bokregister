<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style>
header {
  position: fixed; /* Make the header fixed */
  top: 0; /* Stick it to the top */
  left: 0; /* Stick it to the left */
  width: 100%; /* Make it span the full width */
  background: black; /* Add a background color to make the text visible */
  z-index: 1000; /* Make sure it's above other elements */
}

nav {
  padding: 1rem; /* Add some padding to the nav */
}

/* Add a top padding to the body equal to the height of the header */
body {
  padding-top: 4rem; /* Adjust this value as needed */
}
</style>
