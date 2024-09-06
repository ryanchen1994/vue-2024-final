<template>
    <div>
      <h1>Todo List</h1>
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <input type="checkbox" v-model="todo.completed" @change="toggleComplete(todo)" />
          <span :class="{ completed: todo.completed }">{{ todo.name }}</span>
          <button @click="removeTodo(todo.id)">Delete</button>
        </li>
      </ul>
      <form @submit.prevent="createTodo">
        <input v-model="newTodo" placeholder="New todo" />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  </template>
  
  <script>
  //import { getTodos, addTodo, deleteTodo, updateTodo } from '../api.js';
  
  export default {
    data() {
      return {
        todos: [],
        newTodo: ''
      };
    },
    created() {
      this.fetchTodos();
    },
    methods: {
      fetchTodos() {
        getTodos()
          .then(response => {
            this.todos = response.data;
          })
          .catch(error => {
            console.error('Failed to fetch todos:', error);
          });
      },
      createTodo() {
        if (!this.newTodo.trim()) return;
        const todo = { name: this.newTodo, completed: false };
        addTodo(todo)
          .then(() => {
            this.newTodo = '';
            this.fetchTodos();
          })
          .catch(error => {
            console.error('Failed to add todo:', error);
          });
      },
      removeTodo(id) {
        deleteTodo(id)
          .then(() => {
            this.fetchTodos();
          })
          .catch(error => {
            console.error('Failed to delete todo:', error);
          });
      },
      toggleComplete(todo) {
        const updatedTodo = { ...todo, completed: !todo.completed };
        updateTodo(todo.id, updatedTodo)
          .then(() => {
            this.fetchTodos();
          })
          .catch(error => {
            console.error('Failed to update todo:', error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .completed {
    text-decoration: line-through;
  }
  </style>
  