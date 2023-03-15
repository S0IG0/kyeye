<template>
  <div class="wrapper">
    <div class="page__title">
      Личный кабинет
    </div>
    <div class="user-info">
      <div class="user-image">
        <img src="@/components/static/user-icon.png" alt="" width="100">
      </div>
      <div class="container">
        <div class="title">Никнейм</div>
        <div class="value">{{ user.username }}</div>
      </div>
      <div class="container">
        <div class="title">Имя</div>
        <div class="value">{{ user.first_name }}</div>
      </div>
      <div class="container">
        <div class="title">Фамилия</div>
        <div class="value">{{ user.last_name }}</div>
      </div>
      <div class="container">
        <div class="title">E-mail</div>
        <div class="value">{{ user.email }}</div>
      </div>
    </div>
    <div class="queue__buttons">
      <my-button class="button">Создать очередь</my-button>
      <my-button class="button">Присоединиться к очереди</my-button>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import {Auth} from "@/components/js/AuthModule";
import {urlBackend} from "@/components/config";

export default {
  name: "PersonalAccount",
  components: {MyButton},
  data(){
    return{
      Auth: Auth,
      user: {
        id: '',
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
      }
    }
  },
  methods: {
    async getUser() {
      const response = await this.Auth.requestToBackend(
          'get',
          `${urlBackend}/api/user/${this.Auth.JwtToken.decodeAccess().user_id}`,
          {},
      )
      for (let key in response.data) {
        this.user[key] = response.data[key]
      }
    }
  },
  mounted() {
    this.getUser()
  }
}
</script>

<style scoped>
  .user-info{
    gap: 10px;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  .user-image{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  .container{
    display: flex;
    font-family: Helvetica, sans-serif;
    border: 2px solid rgb(52, 114, 238);
  }
  .title{
    background: rgb(52, 114, 238);
    color: white;
    padding: 10px 20px;
    width: 35%;
    text-align: center;
    font-weight: 600;
  }
  .value{
    background: white;
    color: rgb(52, 114, 238);
    padding: 10px 20px;
    text-align: center;
    width: 65%;
    font-weight: 600;
  }
  .page__title{
    font-family: Helvetica, sans-serif;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
  }
  .queue__buttons{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    gap: 20px;
  }
  .button{
    font-size: 15px;
    padding: 8px 10px;
    width: 100%;
    height: 51px;
  }
</style>

