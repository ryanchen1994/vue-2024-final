<template>
  <div id="todoListPage" class="bg-half">
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input type="text" placeholder="請輸入待辦事項" v-model="newTodo">
          <a href="#" @click.prevent="addTodo">
            <span class="text-white"> ＋ </span>
          </a>
        </div>
        <div class="todoList_list">
          <ul class="todoList_tab">
            <li><a href="#" :class="{ active: filter === 'all' }" @click="filter = 'all'">全部</a></li>
            <li><a href="#" :class="{ active: filter === 'active' }" @click="filter = 'active'">待完成</a></li>
            <li><a href="#" :class="{ active: filter === 'completed' }" @click="filter = 'completed'">已完成</a></li>
          </ul>
          <div class="todoList_items">
            <p v-if="filteredTodos.length === 0">目前尚無待辦事項</p>
            <ul class="todoList_item" v-else>
              <li v-for="todo in filteredTodos" :key="todo.id" class="todo-item">
                <label class="todoList_label">
                  <input class="todoList_input" type="checkbox" :checked="todo.status" @change="toggleTodo(todo)">
                  <span>{{ todo.content }}</span>
                </label>
                <a href="#" @click.prevent="removeTodo(todo.id)" class="delete-btn">
                  <span class="delete-text">Ｘ</span>
                </a>
              </li>
            </ul>
            <div v-if="filteredTodos.length > 0" class="todoList_statistics">
              <p>{{ activeTodosCount }} 個待完成項目</p>
              <a href="#" v-if="completedTodosCount > 0" @click.prevent="clearCompleted">清除已完成項目</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'Home',
  setup() {
    const todos = ref([])
    const newTodo = ref('')
    const filter = ref('all')

    const API_URL = 'https://todolist-api.hexschool.io'

    const fetchTodos = async () => {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get(`${API_URL}/todos`, {
          headers: { Authorization: `${token}` }
        })
        todos.value = response.data.data
      } catch (error) {
        console.error('Failed to fetch todos:', error)
      }
    }

    const addTodo = async () => {
      if (!newTodo.value.trim()) return
      const token = localStorage.getItem('token')
      try {
        await axios.post(`${API_URL}/todos`, { content: newTodo.value }, {
          headers: { Authorization: `${token}` }
        })
        newTodo.value = ''
        await fetchTodos()
      } catch (error) {
        console.error('Failed to add todo:', error)
      }
    }

    const removeTodo = async (id) => {
      const token = localStorage.getItem('token')
      try {
        await axios.delete(`${API_URL}/todos/${id}`, {
          headers: { Authorization: `${token}` }
        })
        await fetchTodos()
      } catch (error) {
        console.error('Failed to remove todo:', error)
      }
    }

    const toggleTodo = async (todo) => {
      const token = localStorage.getItem('token')
      try {
        await axios.patch(`${API_URL}/todos/${todo.id}/toggle`, { status: !todo.status }, {
          headers: { Authorization: `${token}` }
        })
        await fetchTodos()
      } catch (error) {
        console.error('Failed to toggle todo:', error)
      }
    }

    const clearCompleted = async () => {
      const token = localStorage.getItem('token')
      const completedTodos = todos.value.filter(todo => todo.status)
      try {
        await Promise.all(completedTodos.map(todo => 
          axios.delete(`${API_URL}/todos/${todo.id}`, {
            headers: { Authorization: `${token}` }
          })
        ))
        await fetchTodos()
      } catch (error) {
        console.error('Failed to clear completed todos:', error)
      }
    }

    const filteredTodos = computed(() => {
      if (filter.value === 'active') {
        return todos.value.filter(todo => !todo.status)
      } else if (filter.value === 'completed') {
        return todos.value.filter(todo => todo.status)
      }
      return todos.value
    })

    const activeTodosCount = computed(() => {
      return todos.value.filter(todo => !todo.status).length
    })

    const completedTodosCount = computed(() => {
      return todos.value.filter(todo => todo.status).length
    })

    onMounted(fetchTodos)

    return {
      todos,
      newTodo,
      filter,
      filteredTodos,
      activeTodosCount,
      completedTodosCount,
      addTodo,
      removeTodo,
      toggleTodo,
      clearCompleted
    }
  }
}
</script>