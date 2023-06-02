<template>
  <div class="wrapper" v-if="isAuth">
    <sidebar-menu class="sidebar" v-if="isDesktop"></sidebar-menu>
    <navbar-menu v-else></navbar-menu>
    <div v-if="queue" class="queue">
      <div class="queue__name">
        {{ queue.name }} [{{ queue.id }}]
      </div>
      <div class="admin__block">
        <div class="text">
          Вы являетесь администратором данной очереди. Для удаления человека из
          очереди нажмите крестик рядом с его ячейкой. Для того, чтобы сдвинуть очередь
          нажмите кнопку "Следующий"
        </div>
        <my-button class="next" @click="deleteUser(undefined,-1)">Следующий</my-button>
      </div>
      <div class=" queue__item
        " v-for="(users, index) in queue.users">
        <div class="item__number">
          {{ index + 1 }}
        </div>
        <div class="item__user">
          {{ users.user.first_name }} «{{ users.user.username }}»
          {{ users.user.last_name }}
        </div>
        <div class="item__delete">
          <my-button class="delete" @click="deleteUser(users.user.id, index)">Удалить</my-button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="auth-message">
    <div class="text">Для просмотра данной страницы вам необходимо авторизоваться</div>
    <my-button @click="$router.push('/login')">Авторизоваться</my-button>
  </div>
</template>

<script>
import UserList from "@/components/User/UserList.vue"
import UserItem from "@/components/User/UserItem.vue"
import MyButton from "@/components/UI/MyButton.vue";
import {urlBackend} from "@/components/config";
import SidebarMenu from "@/components/UI/PersonalAccount/SidebarMenu.vue";
import NavbarMenu from "@/components/UI/NavbarMenu.vue";
import {mapGetters, mapState} from "vuex";
import axios from "axios";

export default {
  components: {
    NavbarMenu, SidebarMenu,
    MyButton,
    UserList, UserItem
  },
  computed: {
    ...mapState({
      isAuth: state => state.auth.isAuth
    }),
  },
  data() {
    return {
      ...mapGetters({
        getAuthorization: "auth/getAuthorization",
      }),
      queue: {
        id: '',
        name: '',
        owner: {
          id: '',
          username: "",
          email: "",
          password: "",
          first_name: "",
          last_name: "",
        },
        users: [],
        date_creation: '',
        date_activation: '',
        is_active: ''
      },
      isDesktop: false,
    };
  },
  methods: {
    async getQueue() {
      const queueId = this.$route.params.id;
      await axios({
        method: 'get',
        url: `${urlBackend}/api/queue/${queueId}`,
        data: {},
        headers: {
          Authorization: this.getAuthorization(),
        }
      }).then(response => {
        for (let key in response.data) {
          this.queue[key] = response.data[key]
        }
      })
    },
    async deleteUser(user_id, index) {
      const queue_id = this.$route.params.id;
      if (user_id === undefined && index === -1) {
        user_id = this.queue.users[0].user.id
      }
      // api/queue/user/destroy/<int:user_id>/<int:queue_id>/
      await axios({
        method: 'delete',
        url: `${urlBackend}/api/queue/user/destroy/${user_id}/${queue_id}/`,
        data: {},
        headers: {
          Authorization: this.getAuthorization(),
        }
      }).then(response => {
        this.queue.users.splice(index, 1)
      })

    }
  },
  mounted() {
    this.getQueue();
    const mediaQuery = window.matchMedia("(min-width: 768px)")
    this.isDesktop = mediaQuery.matches;
    mediaQuery.addListener((event) => {
      this.isDesktop = event.matches;
    });
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
}

.queue {
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: Helvetica, sans-serif;
  width: 80%;
  margin: auto;
}

.queue__name {
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  margin-top: 50px;
}

.queue__item {
  display: flex;
  width: 100%;
  margin: 15px;
  background-color: white;
  border: rgb(52, 114, 238) 3px solid;
  font-size: 20px;
  overflow: hidden;
}

.item__number {
  background: rgb(52, 114, 238);
  padding: 15px;
  color: white;
  font-weight: 600;
  text-align: center;
}

.item__user {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding-left: 5px;
  font-weight: 600;
  text-align: center;
}

.auth-message {
  margin-top: 50px;
  font-size: 40px;
  font-weight: 600;
  font-family: Helvetica, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.auth-message .text {
  margin-bottom: 40px;
}

.admin__block {
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

.admin__block .next {
  background: red;
}

.admin__block .text {
  font-family: Helvetica, sans-serif;
  color: red;
  font-weight: 600;
  text-align: center;
}

.item__delete {
  padding: 10px;
}

.item__delete .delete {
  background: red;
}

@media (max-width: 768px) {
  .wrapper {
    display: block;
  }

  .queue__item {
    min-width: 80%;
    font-size: 18px;
  }

  .item__delete .delete {
    font-size: 10px;
  }
}
</style>
