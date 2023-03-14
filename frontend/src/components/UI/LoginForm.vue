<template>
  <my-input placeholder="Email"></my-input>
  <my-input placeholder="Пароль"></my-input>
  <div class="forgot__password">
    <a>Забыли пароль?</a>
  </div>
  <my-button>Войти</my-button>
  <div class="text">
    У вас нет аккаунта? <a>Зарегистрироваться</a>
  </div>
</template>

<script>
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";

export default {
  name: "login-form",
  components: {MyButton, MyInput},
  props: {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>