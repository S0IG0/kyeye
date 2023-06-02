<template>
  <nav class="navbar bg-primary" data-bs-theme="white">
    <form class="container-fluid justify-content-start">
      <router-link class="btn btn-outline-light" to="/">Главная</router-link>
      <router-link
          v-if="!isAuth"
          class="btn btn-outline-light ms-2"
          to="/login">Войти
      </router-link>

      <router-link
          v-if="!isAuth"
          class="btn btn-outline-light ms-2"
          to="/register">Регистрация
      </router-link>

      <router-link
          v-if="isAuth"
          class="btn btn-outline-light ms-2"
          to="/account">Личный кабинет
      </router-link>
    </form>
  </nav>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "navigationBar",
  computed: mapState({
    isAuth: state => state.auth.isAuth,
  })
}
</script>

<style scoped>

</style>