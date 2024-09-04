<template>
  <div class="p-8 bg-gray-900 min-h-screen">
    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by title, author, or ISBN"
        class="w-full px-4 py-2 border border-gray-600 rounded bg-gray-800 text-white"
      />
    </div>
    <BooksTable :books="books.books" :searchQuery="searchQuery" @viewBook="viewBook" />
    <button
      id="addBtn"
      @click="showForm = true"
      class="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
    >
      Add Book
    </button>
    <AddBookForm
      v-if="showForm"
      :showForm="showForm"
      :newBook="newBook"
      @submit="handleAddBook"
      @cancel="showForm = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBookStore } from '../stores/books'
import AddBookForm from '@/components/AddBookForm.vue'
import BooksTable from '@/components/BooksTable.vue'
import type { Book } from '@/types/book'

const books = useBookStore()
const router = useRouter()

const showForm = ref(false)
const newBook = ref({
  id: 0,
  title: '',
  author: '',
  isbn: ''
})

const searchQuery = ref('')

const handleAddBook = async (book: Book) => {
  await books.addBook(book)
  newBook.value = { id: 0, title: '', author: '', isbn: '' }
  showForm.value = false
}

const viewBook = (id: number) => {
  router.push({ path: `/book/${id}` })
}
</script>
