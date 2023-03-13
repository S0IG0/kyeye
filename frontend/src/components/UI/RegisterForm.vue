<template>
  <div class="wrapper">
    <div class="registration">
      <div class="title">Регистрация</div>
      <my-input placeholder="Email"
      v-model="user.email"
      required
      ></my-input>
      <my-input placeholder="Имя пользователя"
      v-model="user.username"
      required></my-input>
      <my-input placeholder="Имя"
      v-model="user.first_name"
      required></my-input>
      <my-input placeholder="Фамилия"
      v-model="user.last_name"
      required></my-input>
      <my-input placeholder="Пароль"
      v-model="user.password"
      type="password"
      required></my-input>
      <my-input placeholder="Пароль (повторить)"
      v-model="user.repeat_password"
      type="password"
      required></my-input>
      <div class="button__container">
        <my-button class="sign-up"
                   @click="validateData"
        >Зарегистрироваться</my-button>
      </div>
    </div>
    <error-list :errors="errors" class="error-list"></error-list>
  </div>
</template>

<script>
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import ErrorList from "@/components/UX/ErrorList.vue";
import validatePassword from "@/components/validators/validators";


export default {
  name: "RegisterForm",
  components: {ErrorList, MyButton, MyInput},
  props: {
    user: {
      type: Object,
      required: true,
    }
  },
  data(){
    return {
      errors: []
    }
  },
  methods: {
    validateData(){
      [
          validatePassword(
              this.user.password,
              this.user.repeat_password,
          ),

      ].forEach(errors => {
        this.errors.push(...errors);
      })
    },

  }
}
</script>

<style scoped>
  .sign-up{
    margin-top: 15px;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .button__container{
    display: flex;
    flex-direction: column;
  }
  .registration .title{
    font-family: Helvetica, sans-serif;
    font-size: 30px;
    font-weight: 600;
  }
</style>