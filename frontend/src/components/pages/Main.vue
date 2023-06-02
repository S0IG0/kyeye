<template>
  <div class="main">
    <div>
      <my-button @click="login({email: 'admin@mail.ru', password: '123456'})">Войти</my-button>
      <my-button @click="logout">Выйти</my-button>
      isAuth: {{ this.isAuth }}
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import {urlBackend} from "../config";
import {mapActions, mapState} from 'vuex'

export default {
  name: "Main",
  data() {
    return {
      result: undefined
    }
  },

  computed: mapState({
    isAuth: state => state.auth.isAuth,
    isLoading: state => state.auth.isLoading,
    error: state => state.auth.error,
    Token: state => state.auth.token
  }),
  methods: {
    urlBackend() {
      return urlBackend
    },
    ...mapActions({
      login: "auth/login",
      check: 'auth/checkIsActiveToken',
      logout: 'auth/logout',
    }),
    test() {
      this.check({token: this.Token.refresh}).then(result => (this.result = result))
    }
  },
  components: {MyButton},
  mounted() {
    console.log('process.env', process.env)
  }
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
}

my-button {
  margin-top: 15px;
  width: 100px;
}
</style>