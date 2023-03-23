<template>
  <div class="queue">
<!--    <user-item v-for="user in users" :user="user"></user-item>-->
    <div v-if="queues">
      <div v-for="item in queues['edges']">
        <div class="queue_item">
          name: {{ item['node']['name'] }} |
          dateActivation: {{ item['node']['dateActivation'] }} |
          dateCreation: {{ item['node']['dateCreation'] }}
          <div class="users">
            <div class="user_item" v-for="user_node in item['node']['users']['edges']">
              email: {{ user_node['node']['user']['email'] }} |
              username: {{ user_node['node']['user']['username'] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserList from "@/components/User/UserList.vue"
import UserItem from "@/components/User/UserItem.vue"
import MyButton from "@/components/UI/MyButton.vue";
import gql from "graphql-tag";

export default {
  components: {
    MyButton,
    UserList, UserItem
  },
  data() {
    return {
      queues: null,
    };
  },
  apollo: {
    queues: {
      query: gql`query{queues (first: 10, ) {edges {node {id, name, dateActivation, dateCreation, users{edges{node{id, user{email, username}}}}}}}}`,
    },
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.queue_item {
  margin: 15px;
  padding: 15px;
  background-color: whitesmoke;
  border: black 2px solid;
  border-radius: 15px;
  font-size: 20px;
}

.users {
  margin: 20px;
  border: black 2px solid;
  border-radius: 15px;
}

.user_item {
  margin: 15px;
  padding: 15px;
  background-color: dodgerblue;
  border-radius: 15px;
  color: white;
  font-size: 20px;
}
</style>