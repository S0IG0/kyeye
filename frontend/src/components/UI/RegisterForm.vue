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
    >Sign up</my-button>
  </div>
  <error-list :errors="errors"></error-list>
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
      let x = validatePassword(this.user.password, this.user.repeat_password)
      console.log(x);
      let validators = [x];
      console.log(validators);
      validators.forEach(item => {
        this.errors += item;
        console.log(item);
          })
    },

  }
}
</script>

<style scoped>
  .sign-up{
    margin-top: 50px;
  }
</style>