<template>
  <div class="reg">
    Регистрация
    <my-input placeholder="Email"
              v-model="user.email"></my-input>
    <my-input placeholder="Username"
              v-model="user.username"></my-input>
    <my-input placeholder="First name"
              v-model="user.first_name"></my-input>
    <my-input placeholder="Last name"
              v-model="user.last_name"></my-input>
    <my-input placeholder="Password"
              v-model="user.password"></my-input>
    <my-input placeholder="Password(repeat)"
              v-model="user.repeat_password"></my-input>
    <my-button class="sign-up"
               @click="validateData"
    >Sign up
    </my-button>
  </div>
  <error-list :errors="errors"></error-list>
</template>

<script>
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import ErrorList from "@/components/UX/ErrorList.vue";
import {validateEmail, validateName, validatePassword} from "@/components/validators/validators";
import axios from "axios";


export default {
  name: "RegisterForm",
  components: {ErrorList, MyButton, MyInput},
  props: {
    user: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      errors: [],
      user_: {},
    }
  },
  methods: {
    validateData() {
      this.errors = [];
      [
        validatePassword(
            this.user.password,
            this.user.repeat_password,
        ),
        validateEmail(
            this.user.email,
        ),
        validateName(
          'First',
            this.user.first_name,
        ),
        validateName(
            'Last',
            this.user.last_name,
        ),

      ].forEach(errors => {
        this.errors.push(...errors);
      })
      if (this.errors.length === 0) {
        const x = this.postRequestToBackend();
        x.then(response => {
          if (response) {
            console.log(response.data)
            // Пользователь зарегестрирован
          }
        })
      }
    },

    async postRequestToBackend() {
      let value = null;
      try {
       await axios({
         method: 'post',
         url: 'http://localhost:8000/api/user/register/',
         data: {
           "username": this.user.username,
           "first_name": this.user.first_name,
           "last_name": this.user.last_name,
           "email": this.user.email,
           "password": this.user.password,
         }
       }).then(response => {
         value = response;
       })
     } catch (error) {
       for (const key in error.response.data) {
         this.errors.push(...error.response.data[key])
       }
     }
     return value;
    }
  }
}
</script>

<style scoped>
.sign-up {
  margin-top: 50px;
}
</style>