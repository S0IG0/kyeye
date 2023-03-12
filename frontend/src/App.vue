<template>
  <div class="app">
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
      // backend_ip: '192.168.1.64', // localhost
      backend_ip: 'localhost', // localhost
    }
  },
  methods: {
    async getAPIRequest() {
      const x = await axios({
        method: "get",
        url: `http://${this.backend_ip}:8000/api/queue/`,
      });
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

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

form {
  display: flex;
  flex-direction: column;
}

.app {
  padding: 30px;
}
</style>