import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Book } from '../types/book'

export const useBookStore = defineStore('books', () => {
  const books = ref([] as Book[])

  const fetchBooks = async () => {
    try {
      const response = await fetch('https://localhost:7197/api/Books')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      books.value = data as Book[]
    } catch (error) {
      console.error('Failed to fetch books:', error)
    }
  }

  const addBook = async (book: Book) => {
    try {
      const response = await fetch('https://localhost:7197/api/Books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      fetchBooks()
    } catch (error) {
      console.error('Failed to add book:', error)
    }
  }

  const editBook = async (book: Book) => {
    try {
      const response = await fetch(`https://localhost:7197/api/Books/${book.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      fetchBooks()
    } catch (error) {
      console.error('Failed to edit book:', error)
    }
  }

  const deleteBook = async (id: number) => {
    try {
      const response = await fetch(`https://localhost:7197/api/Books/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      fetchBooks()
    } catch (error) {
      console.error('Failed to delete book:', error)
    }
  }

  fetchBooks()

  return {
    books,
    fetchBooks,
    addBook,
    editBook,
    deleteBook
  }
})
