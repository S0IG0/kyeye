<template>
  <div class="main">
    Добро пожаловать
    {{ urlBackend() }}
    <div class="buttons">
      <my-button @click="$router.push('/register')">Регистрация</my-button>
      <my-button @click="$router.push('/queue')">Очередь</my-button>
      <my-button @click="$router.push('/login')">Войти</my-button>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import {urlBackend} from "../config";

export default {
  name: "Main",
  methods: {
    urlBackend() {
      return urlBackend
    }
  },
  components: {MyButton},
  mounted() {
    console.log('process.env', process.env)
  }
}
</script>

<style scoped>
  .main{
    display: flex;
    flex-direction: column;
  }
  my-button{
    margin-top: 15px;
    width: 100px;
  }
</style>