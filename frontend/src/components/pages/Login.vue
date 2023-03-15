<template>
  <div v-if="!auth.onLogin">
    <my-input v-model="email" placeholder="Email"></my-input>
    <my-input v-model="password" placeholder="Пароль"></my-input>
    <div class="forgot__password">
      <a>Забыли пароль?</a>
    </div>
    <my-button @click="logIn">Войти</my-button>
  </div>
  <my-button @click="logOut">Выйти</my-button>
  <div class="text">
    У вас нет аккаунта? <a>Зарегистрироваться</a>
  </div>
  <div>
    {{ this.auth }}
  </div>
</template>

<script>

import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";
import {Auth} from "@/components/js/AuthModule";

export default {
  name: "Login",
  components: {MyInput, MyButton},
  data() {
    return {
      email: 'test1@mail.ru',
      password: 'ss261645',
      auth: Auth,
    }
  },
  methods: {
    logIn() {
      this.auth.logIn(this.email, this.password)
    },
    logOut() {
      this.auth.logOut();
    }
  }
}
</script>

<style scoped>

</style>