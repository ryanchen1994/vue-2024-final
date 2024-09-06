<template>
  <div id="app" class="bg-yellow">
    <nav>
      <router-link to="/" v-if="isAuthenticated">
        <img class="logoImg" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png" alt="logo">
      </router-link>
      <ul v-if="isAuthenticated">
        <li class="todo_sm"><router-link to="/"><span>{{ username }}的代辦</span></router-link></li>
        <li><a href="#" @click.prevent="logout">登出</a></li>
      </ul>
      <ul v-else>
        <li><router-link to="/login">登入</router-link></li>
        <li><router-link to="/register">註冊</router-link></li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const isAuthenticated = ref(false)
    const username = ref('')
    const router = useRouter()

    const checkAuth = () => {
      isAuthenticated.value = !!localStorage.getItem('token')
      username.value = localStorage.getItem('username') || '使用者'
    }

    const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      isAuthenticated.value = false
      router.push('/login')
    }

    onMounted(checkAuth)

    watch(() => router.currentRoute.value, checkAuth)

    return {
      isAuthenticated,
      username,
      logout
    }
  }
}
</script>