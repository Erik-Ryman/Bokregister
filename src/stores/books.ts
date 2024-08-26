import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Book } from '../types/book'

export const useBookStore = defineStore('books', () => {
  const books = ref([] as Book[])

  // Define fetch function
  const fetchBooks = async () => {
    try {
      const response = await fetch('/books.json')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      books.value = data as Book[]
    } catch (error) {
      console.error('Failed to fetch books:', error)
    }
  }

  const addBook = (book: Book) => {
    books.value.push(book)
  }

  // Fetch books immediately
  fetchBooks()

  return {
    // Expose state and fetch function
    books,
    fetchBooks,
    addBook
  }
})
