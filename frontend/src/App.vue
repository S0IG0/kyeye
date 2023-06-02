<template>
  <div class="app">
    <navigation-bar></navigation-bar>
    <router-view>
    </router-view>
  </div>
</template>

<script>
import UserList from "@/components/User/UserList.vue"
import UserItem from "@/components/User/UserItem.vue"
import MyButton from "@/components/UI/MyButton.vue";
import {mapActions} from "vuex";
import NavigationBar from "@/components/UI/navigationBar.vue";

export default {
  components: {
    NavigationBar,
    MyButton,
    UserList, UserItem
  },
  methods: {
    ...mapActions({
      load: "auth/loadToLocalStorage",
      loadForPages: "pages/loadToLocalStorage",
    }),
  },
  mounted() {
    this.load()
    this.loadForPages()
  }
}
</script>

<style>
/** {*/
/*  margin: 0;*/
/*  padding: 0;*/
/*  box-sizing: border-box;*/
/*}*/

/*form {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*}*/


</style>