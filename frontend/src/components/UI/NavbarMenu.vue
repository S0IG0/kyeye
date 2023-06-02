<template>
    <header :class="`${show ? 'show' : ''}`">
        <div class="content">
            <div class="logo">
                <img src="../static/user-icon.png" alt="">
            </div>
            <ul class="menu-list">
                <div class="icon cancel-btn">
                    <span class="material-icons" @click="ToggleMenu">menu</span>
                </div>
                <li>
                    <router-link class="btn" to="/">Главная</router-link>
                </li>
                <li v-if="isAuth">
                    <button class="btn" @click="$router.push(`/account`); setPage(Pages.Account); ToggleMenu()">
                        <span class="text">Личный кабинет</span>
                    </button>
                </li>
                <li v-if="isAuth">
                    <button  class="btn" @click="$router.push(`/account`); setPage(Pages.Queue); ToggleMenu()">
                        <span class="text">Список очередей</span></button>
                </li>
                <li v-if="isAuth">
                    <button class="btn" @click="$router.push(`/account`); setPage(Pages.Settings); ToggleMenu()">
                        <span class="text">Настройки</span>
                    </button>
                </li>
                <li v-if="!isAuth">
                    <router-link
                        class="btn"
                        to="/login">Войти
                    </router-link>
                </li>
                <li v-if="!isAuth">
                    <router-link
                        class="btn"
                        to="/register">Регистрация
                    </router-link>
                </li>
            </ul>
            <div class="icon menu-btn">
                <span class="material-icons" @click="ToggleMenu">menu</span>
            </div>
        </div>
    </header>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import { Pages } from '@/components/store/config.js'
export default {
    name: "NavbarMenu",
    computed: mapState({
        isAuth: state => state.auth.isAuth,
    }),
    methods: {
        ...mapMutations({
          setPage: "pages/setPage"
        }),
        Pages,
    }
}
</script>
<script setup>
import {ref} from "vue";

const show = ref(false)

const ToggleMenu = () => {
    show.value = !show.value
}
</script>
<style scoped>
header{
    background: rgb(52, 114, 238);
    padding: 1em;
}
.content{
    display: flex;
    justify-content: space-between;
}
.text, a{
    color: rgb(52, 114, 238);
    font-family: Helvetica, sans-serif;
    font-weight: 600;
}
a{
    text-decoration: none;
}
header .menu-list{
    position: fixed;
    height: 100vh;
    width: 100%;
    left: -100%;
    top: 0;
    display: block;
    padding: 40px 0;
    text-align: center;
    background: white;
    transition: all 0.3s ease;
}
header.show .menu-list{
    left: 0;
}
header .menu-list li{
    margin-top: 45px;
}
header .menu-list li button,
header .menu-list li a{
    font-size: 23px;
    margin-left: -100%;
    transition: 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
header.show .menu-list li button,
header .menu-list li a{
    margin-left: 0;
}
.logo img{
    width: 50px;
}
.menu-btn, .cancel-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.btn{
    border: none;
    background: transparent;
}
.cancel-btn{
    position: absolute;
    right: 30px;
    top: 20px;
}
.material-icons{
    font-size: 35px;
}
</style>