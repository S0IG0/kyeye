<template>
  <div class="wrapper">
    <div class="title">Авторизация</div>
    <form>
      <my-input placeholder="E-mail"
      v-model="this.email"
      required
      ></my-input>
      <my-input placeholder="Пароль"
      v-model="this.password"
      required></my-input>
      <div class="forgot__password">
        <a>Забыли пароль?</a>
      </div>
      <my-button>Войти</my-button>
    </form>
    <div class="text">
      У вас нет аккаунта? <a class="link" @click="$router.push('/register')">Зарегистрироваться</a>
    </div>
  </div>
</template>

<script>

import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";

export default {
  name: "login-form",
  components: {MyButton, MyInput},
  data(){
    return{
      email: "",
      password: "",
    }
  }
}
</script>

<style scoped>
  .link{
    color: rgb(52, 114, 238);
    cursor: pointer;
    text-decoration: none;
  }
  .text{
    margin-top: 15px;
    text-align: center;
    font-family: Helvetica, sans-serif;
    font-size: 15px;
  }
  .forgot__password{
    text-align: right;
    margin: 15px 0;
    color: gray;
    font-family: Helvetica, sans-serif;
    font-size: 13px;
  }
  .title{
    font-family: Helvetica, sans-serif;
    font-size: 30px;
    font-weight: 600;
  }
</style>