<template>
  <div class="bg-gray-800 shadow-md rounded-lg overflow-hidden">
    <table class="w-full border-collapse">
      <thead class="bg-blue-700 text-white">
        <tr>
          <th class="p-4 text-left border-b border-gray-700 cursor-pointer" @click="sort('title')">
            Title
            <span v-if="sortColumn === 'title'">
              {{ sortOrder === 'asc' ? '▲' : '▼' }}
            </span>
          </th>
          <th class="p-4 text-left border-b border-gray-700 cursor-pointer" @click="sort('author')">
            Author
            <span v-if="sortColumn === 'author'">
              {{ sortOrder === 'asc' ? '▲' : '▼' }}
            </span>
          </th>
          <th class="p-4 text-left border-b border-gray-700 cursor-pointer" @click="sort('isbn')">
            ISBN
            <span v-if="sortColumn === 'isbn'">
              {{ sortOrder === 'asc' ? '▲' : '▼' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="book in sortedBooks"
          :key="book.isbn"
          @click="viewBook(book.id)"
          class="hover:bg-blue-800 cursor-pointer transition-colors text-white"
        >
          <td class="p-4 border-t border-gray-700">{{ book.title }}</td>
          <td class="p-4 border-t border-gray-700">{{ book.author }}</td>
          <td class="p-4 border-t border-gray-700">{{ book.isbn }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue'
import type { Book } from '@/types/book'

const props = defineProps<{
  books: Book[]
  searchQuery: string
}>()

const emit = defineEmits(['viewBook'])

const sortColumn = ref('title')
const sortOrder = ref('asc')

const sortedBooks = computed(() => {
  const query = props.searchQuery.toLowerCase()
  const filtered = props.books.filter((book) => {
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.isbn.toLowerCase().includes(query)
    )
  })

  return filtered.sort((a, b) => {
    const aValue = a[sortColumn.value].toLowerCase()
    const bValue = b[sortColumn.value].toLowerCase()

    if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1
    if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })
})

const sort = (column: string) => {
  if (sortColumn.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortOrder.value = 'asc'
  }
}

const viewBook = (id: number) => {
  emit('viewBook', id)
}
</script>
