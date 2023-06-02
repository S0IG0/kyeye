<template>
  <nav class="">
      <div class="image">
          <img src="@/components/static/queue.png" alt="">
      </div>
    <form class="links">
      <router-link class="btn" to="/">Главная</router-link>
      <router-link
          v-if="!isAuth"
          class="btn"
          to="/login">Войти
      </router-link>

      <router-link
          v-if="!isAuth"
          class="btn"
          to="/register">Регистрация
      </router-link>

      <router-link
          v-if="isAuth"
          class="btn"
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
.image img{
    width: 50px;
}
nav{
    width: 100%;
    display: flex;
    background: rgb(52, 114, 238);
    padding: 5px 50px;
    justify-content: space-between;
    box-shadow: 0 3px 20px 5px rgba(0, 0, 0, 0.3);
    margin-bottom: 50px;
}
.links{
    display: flex;
    margin-left: 50px;
    padding-right: 50px;
    align-items: center;
    flex-direction: row;
    gap: 20px;
}
.btn{
    text-decoration: none;
    font-family: Helvetica, sans-serif;
    color: white;
    font-weight: 600;
}
</style>