<template>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>ISBN</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in books.books" :key="book.isbn">
        <td>{{ book.title }}</td>
        <td>{{ book.author }}</td>
        <td>{{ book.isbn }}</td>
      </tr>
    </tbody>
  </table>
  <button id="addBtn" @click="showForm = true">Add Book</button>

  <div v-if="showForm">
    <form @submit.prevent="handleAddBook">
      <h2>Add a new book</h2>
      <label>
        Title:
        <input v-model="newBook.title" required />
      </label>
      <label>
        Author:
        <input v-model="newBook.author" required />
      </label>
      <label>
        ISBN:
        <input v-model="newBook.isbn" required />
      </label>
      <button type="submit">Submit</button>
      <button type="button" @click="showForm = false">Cancel</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useBookStore } from '../stores/books'

const books = useBookStore()
onMounted(() => {
  books.fetchBooks()
})

const showForm = ref(false)
const newBook = ref({
  title: '',
  author: '',
  isbn: ''
})

const handleAddBook = () => {
  books.addBook(newBook.value)
  newBook.value = {
    title: '',
    author: '',
    isbn: ''
  }
  showForm.value = false
}
</script>
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
}

th,
td {
  padding: 1rem;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f4f4f4;
  color: #333;
}

div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

h2 {
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 400;
}

form {
  background: white;
  color: #333;
  padding: 2rem;
  border-radius: 5px;
  width: 100%;
  max-width: 500px;
}

form label {
  display: block;
  margin-bottom: 1rem;
}

form input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
  border-radius: 3px;
  border: 1px solid #ddd;
}

form button,
#addBtn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  border: none;
  background: #007bff;
  color: white;
  cursor: pointer;
}

form button:hover,
#addBtn:hover {
  background: #0056b3;
}

form button[type='button'] {
  background: #6c757d;
  margin-left: 1rem;
}

form button[type='button']:hover {
  background: #545b62;
}
</style>
