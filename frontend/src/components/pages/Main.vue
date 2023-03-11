<template>
  <div class="main">
    Добро пожаловать
    <div class="buttons">
      <my-button @click="$router.push('/register')">Регистрация</my-button>
      <my-button @click="$router.push('/queue')">Очередь</my-button>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";

export default {
  name: "Main",
  components: {MyButton}
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