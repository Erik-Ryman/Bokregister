<template>
  <div v-if="book" class="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col items-center">
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-2xl">
      <transition name="fade" mode="out-in">
        <div v-if="!isEditing" key="view">
          <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{{ book.title }}</h1>
          <p class="text-lg mb-2 text-gray-700 dark:text-gray-300">
            <strong>Author:</strong> {{ book.author }}
          </p>
          <p class="text-lg mb-6 text-gray-700 dark:text-gray-300">
            <strong>ISBN:</strong> {{ book.isbn }}
          </p>
          <button
            @click="isEditing = true"
            class="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            Edit
          </button>
          <button
            @click="book ? deleteBook(book.id) : null"
            class="inline-block ml-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
          <router-link
            to="/"
            class="inline-block ml-4 px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition-colors"
            >Back to list</router-link
          >
        </div>
        <EditBookForm
          v-else
          key="edit"
          :editBookData="editBookData"
          @submit="handleEditBook"
          @cancel="handleCancelEdit"
        />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBookStore } from '../stores/books'
import type { Book } from '@/types/book'
import router from '@/router'
import EditBookForm from '@/components/EditBookForm.vue'

const route = useRoute()
const books = useBookStore()

const isEditing = ref(false)
const book = computed(() => {
  return books.books.find((b) => b.id === Number(route.params.id))
})

const editBookData = ref<Book>(
  book.value || {
    id: 0,
    title: '',
    author: '',
    isbn: ''
  }
)

watch(
  book,
  (newBook) => {
    if (newBook) {
      editBookData.value = { ...newBook }
    }
  },
  { immediate: true }
)

const handleEditBook = (updatedBook: Book) => {
  books.editBook(updatedBook)
  isEditing.value = false
}

const handleCancelEdit = () => {
  isEditing.value = false
  if (book.value) {
    editBookData.value = { ...book.value }
  }
}

const deleteBook = (id: number) => {
  books.deleteBook(id)
  books.fetchBooks()
  router.push('/')
}
</script>
