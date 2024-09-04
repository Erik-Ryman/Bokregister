<template>
  <div
    v-if="showForm"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <form
      @submit.prevent="handleSubmit"
      class="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
    >
      <h2 class="text-2xl mb-6 text-gray-100">Add a new book</h2>
      <label class="block mb-4">
        <span class="block text-gray-300">Title:</span>
        <input
          v-model="localNewBook.title"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-gray-100"
        />
      </label>
      <label class="block mb-4">
        <span class="block text-gray-300">Author:</span>
        <input
          v-model="localNewBook.author"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-gray-100"
        />
      </label>
      <label class="block mb-4">
        <span class="block text-gray-300">ISBN:</span>
        <input
          v-model="localNewBook.isbn"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-gray-100"
        />
      </label>
      <div class="flex justify-end">
        <button
          type="button"
          @click="cancel"
          class="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'
import type { Book } from '@/types/book'

const props = defineProps({
  showForm: Boolean,
  newBook: {
    type: Object as () => Book,
    default: () => ({})
  }
})

const emit = defineEmits(['submit', 'cancel'])

const localNewBook = ref({ ...props.newBook })

watch(props.newBook, (newVal) => {
  localNewBook.value = { ...newVal }
})

const handleSubmit = () => {
  emit('submit', localNewBook.value)
}

const cancel = () => {
  emit('cancel')
}
</script>
