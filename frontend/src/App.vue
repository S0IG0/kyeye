<template>
    <div class="app">
        <!-- <post-form
        @create="createPost"/>
        <post-list :posts="posts"
        @remove="removePost"
        /> -->
        <!-- <my-button style="margin-top: 15px" @click="getAPIRequest"> Get </my-button> -->
        <user-item v-for="user in users" :user="user"></user-item>
    </div>
</template>

<script>
import axios from 'axios'
import UserList from "@/components/User/UserList.vue"
import UserItem from "@/components/User/UserItem.vue"

export default {
    components: {
        UserList, UserItem
    }, 
    data() {
        return {
            posts: [
                {id: 1, title: "JavaScript", body: "Описание"},
                {id: 2, title: "JavaScript 2", body: "Описание 2"},
                {id: 3, title: "JavaScript 3", body: "Описание 3"},
                {id: 4, title: "JavaScript 4", body: "Описание 4"},
            ],
            users: [],
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
        },
        removePost(post){
            this.posts = this.posts.filter(p => p.id !== post.id);
        },
        async getAPIRequest () {
            var x = await axios({
                method: "get",
                url: "http://localhost:8000/api/queue/",
            })
            // console.log(x.data[0].owner);
            x.data[0].users.forEach(element => {
                console.log(element.user);
                this.users.push(element.user);
            });
        },
    },
    mounted(){
        this.getAPIRequest();
    },
}
</script>

<style>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    form{
        display: flex;
        flex-direction: column;
    }
    .app{
        padding: 30px;
    }
</style>