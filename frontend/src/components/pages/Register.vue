<template>
  <register-form v-bind:user="user"></register-form>
</template>

<script>
import MyInput from "@/components/UI/MyInput.vue";
import RegisterForm from "@/components/UI/RegisterForm.vue";
import ErrorList from "@/components/UX/ErrorList.vue";

export default {
  name: "Register",
  components: {ErrorList, RegisterForm, MyInput},
  data(){
    return{
      user: {
        email: "",
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        repeat_password: "",
      }
    }
  }
}
</script>

<style scoped>

</style>