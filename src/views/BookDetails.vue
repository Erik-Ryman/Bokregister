<template>
  <div v-if="book">
    <h1>{{ book.title }}</h1>
    <p><strong>Author:</strong> {{ book.author }}</p>
    <p><strong>ISBN:</strong> {{ book.isbn }}</p>
    <router-link to="/">Back to list</router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBookStore } from '../stores/books'

const route = useRoute()
const books = useBookStore()

const book = computed(() => {
  return books.books.find((b) => b.isbn === route.params.isbn)
})
</script>
