<template>
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
      <div class="side">
        <a href="#"><img class="logoImg" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png" alt=""></a>
        <img class="d-m-n" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png" alt="workImg">
      </div>
      <div>
        <form class="formControls" @submit.prevent="login">
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="email">Email</label>
          <input class="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required v-model="email">
          <span v-if="error">{{ error }}</span>
          <label class="formControls_label" for="password">密碼</label>
          <input class="formControls_input" type="password" name="password" id="password" placeholder="請輸入密碼" required v-model="password">
          <input class="formControls_btnSubmit" type="submit" value="登入">
          <router-link class="formControls_btnLink" to="/register">註冊帳號</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
  name: 'Login',
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref('')
    const router = useRouter()

    const API_URL = 'https://todolist-api.hexschool.io'

    const login = async () => {
      try {
        const response = await axios.post(`${API_URL}/users/sign_in`, {
          email: email.value,
          password: password.value
        })
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', response.data.nickname)
        router.push('/')
      } catch (err) {
        error.value = '登入失敗，請檢查您的電子郵件和密碼'
      }
    }

    return {
      email,
      password,
      error,
      login
    }
  }
}
</script>