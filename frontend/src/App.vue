<template>
  <div class="app">
    <router-view></router-view>
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