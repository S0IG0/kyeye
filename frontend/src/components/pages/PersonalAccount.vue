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
      <my-button class="button" @click="showModal">Создать очередь</my-button>
      <my-button class="button">Присоединиться к очереди</my-button>
    </div>
    <modal-window v-model:show="modalVisible">
      <div class="modal__header">Создание очереди</div>
      <div class="input__container">
        <div class="modal__title">Название и время</div>
        <div class="input__block">
          <my-input id="modal-input1"
                    class="input"
                    placeholder="Например: Очередь на БД"
                    v-model="queue.name"
                    required
          ></my-input>
          <my-input id="modal-input2"
                    class="input"
                    placeholder="##:##"
                    v-model="queue.time"
                    required></my-input>
        </div>
        <div class="input__button">
          <my-button @click="createQueue" id="create">Создать очередь</my-button>
        </div>
      </div>
      <div class="link__container">
        <div class="modal__title">Скопировать</div>
        <my-button id="copy">Скопировать</my-button>
      </div>
    </modal-window>
    <my-input placeholder="Новый пароль" v-model="this.password"></my-input>
    <my-input placeholder="Повторите новый пароль"></my-input>
    <my-button>Сменить пароль</my-button>
  </div>
  <my-button @click="getQueue">GET</my-button>
  <div>
<!--    {{ queues_subscriber }}-->

    <div v-for="edge in queues_owner">
      {{edge['node']['name']}}
      {{edge['node']['owner']['email']}}
    </div>
    <br>
    <div v-for="edge in queues_subscriber">
      {{edge['node']['name']}}
      <div v-for="user in edge['node']['users']['edges']">
        {{user['node']['user']['email']}}
      </div>
    </div>

  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import {Auth} from "@/components/js/AuthModule";
import {urlBackend} from "@/components/config";
import MyInput from "@/components/UI/MyInput.vue";
import ModalWindow from "@/components/UI/ModalWindow.vue";
import gql from "graphql-tag";

export default {
  name: "PersonalAccount",
  components: {ModalWindow, MyInput, MyButton},
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
      },
      password: "",
      queue: {
        name: "",
        time: 120,
      },
      modalVisible: false,
      // Массив для хранение очередей где пользователь явлеться участником
      queues_subscriber: [],
      // Массив для хранение очередей где пользователь являеться создателейм очереди
      queues_owner: [],
      queues: [],
    }
  },

  apollo: {
    queues: {
      query: gql`query($userId: Int!, $ownerId: Int!){queues (first: 100, userId: $userId, ownerId: $ownerId) {edges {node {name, dateActivation, owner{email}, users{edges{node{id, user{email}}}}}}}}`,
      variables() {
        this.getUser()
        return {
          userId: this.user.id,
          ownerId: this.user.id
        }
      },
    },
  },

  watch: {
    queues: {
      handler(queues) {
        for (let edge of queues['edges']) {
          if (edge['node']['owner']['email'] === this.user.email) {
            this.queues_owner.push(edge)
          }
          if (edge['node']['users']['edges'].find((item) => item['node']['user']['email'] === this.user.email) !== -1) {
            this.queues_subscriber.push(edge)
          }
        }
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
    },
    // async changePassword() {
    //   const response = await this.Auth.requestToBackend(
    //     'put',
    //       `${urlBackend}/api/user/update/${this.Auth.JwtToken.decodeAccess().user_id}`,
    //       {},
    //   )
    // },
    showModal(){
      this.modalVisible = true
    },
    async createQueue() { // Добавить response.data в queue owner
      const response = await this.Auth.requestToBackend(
          'post',
          `${urlBackend}/api/queue/register/`,
          {
            "name": this.queue.name,
            "time": this.queue.time
          })
    },
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
  .modal__header{
    background: rgb(52, 114, 238);
    padding: 20px 25px;
    color: white;
    font-size: 22px;
    font-weight: 600;
    font-family: Helvetica, sans-serif;
    display: flex;
    align-items: center;
  }
  .input__container{
    padding: 20px 25px;
  }
  .modal__title{
    font-family: Helvetica, sans-serif;
    font-weight: 600;
    font-size: 22px;
    color: #333333;
  }
  .input__block{
    display: flex;
    margin-top: 20px;
    gap: 15px;
  }
  .input{
    margin-top: 0;
    color: #333333;
    border-radius: 10px;
    border: 3px solid rgb(52, 114, 238);
  }
  #modal-input1{
    width: 100%;
    font-size: 18px;
  }
  #modal-input2{
    width: 100px;
    font-size: 20px;
    letter-spacing: 5px;
    text-align: center;
    font-weight: 600;
    padding: 15px 10px;
  }
  .input__button{
    margin-top: 15px;
    margin-bottom: 10px;
  }
  #create, #copy{
    width: 100%;
    border-radius: 10px;
    height: 60px;
  }
  .link__container{
    padding: 0 25px;
  }
  #copy{
    margin: 20px 0;
    background: #333333;
  }

</style>

