<template>
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
      <div class="side">
        <a href="#"><img class="logoImg" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png" alt=""></a>
        <img class="d-m-n" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png" alt="workImg">
      </div>
      <div>
        <form class="formControls" @submit.prevent="register">
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input class="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required v-model="email">
          <label class="formControls_label" for="name">您的暱稱</label>
          <input class="formControls_input" type="text" name="name" id="name" placeholder="請輸入您的暱稱" v-model="nickname">
          <label class="formControls_label" for="pwd">密碼</label>
          <input class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" required v-model="password">
          <label class="formControls_label" for="pwd">再次輸入密碼</label>
          <input class="formControls_input" type="password" name="pwd" id="pwd-confirm" placeholder="請再次輸入密碼" required v-model="passwordConfirm">
          <input class="formControls_btnSubmit" type="submit" value="註冊帳號">
          <router-link class="formControls_btnLink" to="/login">登入</router-link>
        </form>
        <div v-if="error" style="color: red;">
          <p>註冊失敗：</p>
          <ul>
            <li v-for="(message, key) in error" :key="key">
              {{ getErrorMessage(key, message) }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
  name: 'Register',
  setup() {
    const email = ref('')
    const password = ref('')
    const passwordConfirm = ref('')
    const nickname = ref('')
    const error = ref(null)
    const router = useRouter()

    const API_URL = 'https://todolist-api.hexschool.io'

    const register = async () => {
      if (password.value !== passwordConfirm.value) {
        error.value = { passwordConfirm: '兩次輸入的密碼不一致' }
        return
      }

      try {
        await axios.post(`${API_URL}/users/sign_up`, {
          email: email.value,
          password: password.value,
          nickname: nickname.value
        })
        router.push('/login')
      } catch (err) {
        if (err.response && err.response.data) {
          error.value = err.response.data.error || err.response.data
        } else {
          error.value = { general: '註冊失敗，請稍後再試' }
        }
      }
    }

    const getErrorMessage = (key, message) => {
      const errorMessages = {
        email: '電子郵件',
        password: '密碼',
        nickname: '暱稱',
        general: '錯誤'
      }
      return `${errorMessages[key] || key}: ${message}`
    }

    return {
      email,
      password,
      passwordConfirm,
      nickname,
      error,
      register,
      getErrorMessage
    }
  }
}
</script>