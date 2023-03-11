<template>
  <div class="queue">
    <user-item v-for="user in users" :user="user"></user-item>
  </div>
</template>

<script>
import axios from 'axios'
import UserList from "@/components/User/UserList.vue"
import UserItem from "@/components/User/UserItem.vue"
import MyButton from "@/components/UI/MyButton.vue";

export default {
  components: {
    MyButton,
    UserList, UserItem
  },
  data() {
    return {
      users: [],
    }
  },
  methods: {
    async getAPIRequest() {
      const x = await axios({
        method: "get",
        url: "http://localhost:8000/api/queue/",
      });
      // console.log(x.data[0].owner);
      x.data[0].users.forEach(element => {
        console.log(element.user);
        this.users.push(element.user);
      });
    },
  },
  mounted() {
    this.getAPIRequest();
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>