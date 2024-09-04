<template>
  <form @submit.prevent="handleEditBook" class="space-y-4">
    <label class="block">
      <span class="block text-gray-700 dark:text-gray-300">Title:</span>
      <input
        v-model="localEditBookData.title"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
    </label>
    <label class="block">
      <span class="block text-gray-700 dark:text-gray-300">Author:</span>
      <input
        v-model="localEditBookData.author"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
    </label>
    <label class="block">
      <span class="block text-gray-700 dark:text-gray-300">ISBN:</span>
      <input
        v-model="localEditBookData.isbn"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
    </label>
    <div class="flex justify-end space-x-4">
      <button
        type="button"
        @click="handleCancelEdit"
        class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Save
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
import type { Book } from '@/types/book'

const props = defineProps<{
  editBookData: Book
}>()

const emit = defineEmits(['submit', 'cancel'])

const localEditBookData = ref<Book>({ ...props.editBookData })

watch(
  () => props.editBookData,
  (newVal) => {
    localEditBookData.value = { ...newVal }
  }
)

const handleEditBook = () => {
  emit('submit', localEditBookData.value)
}

const handleCancelEdit = () => {
  emit('cancel')
}
</script>
