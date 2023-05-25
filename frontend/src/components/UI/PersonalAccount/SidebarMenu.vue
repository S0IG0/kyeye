<template>
    <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
        <div class="logo">
            <img src="@/components/static/user-icon.png" alt="">
        </div>
        <div class="menu-button__container">
            <button class="menu-button" @click="ToggleMenu">
                <span class="material-icons">keyboard_double_arrow_right</span>
            </button>
        </div>
        <div class="menu">
            <ul>
                <li>
                    <button class="btn" @click="$router.push(`/account`); setPage(Pages.Account)">
                        <span class="material-icons">home</span>
                        <span class="text">Главная</span></button>
                </li>
                <li>
                    <button  class="btn" @click="$router.push(`/account`); setPage(Pages.Queue)">
                        <span class="material-icons">description</span>
                        <span class="text">Список очередей</span></button>
                </li>
                <li>
                    <button class="btn" @click="$router.push(`/account`); setPage(Pages.Settings)">
                        <span class="material-icons">settings</span>
                        <span class="text">Настройки</span>
                    </button>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script>

import {mapMutations, mapState} from 'vuex'
import { Pages } from '@/components/UI/PersonalAccount/config.js'

export default {
    methods: {
        ...mapMutations([
            'setPage'
        ]),
        Pages
    }
}
</script>

<script setup>
import {ref} from "vue";

const is_expanded = ref(false)

const ToggleMenu = () => {
    is_expanded.value = !is_expanded.value
}
</script>

<style scoped>
aside{
    background: rgb(52, 114, 238);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 16px;
    min-height: 100vh;
    width: calc(2rem + 32px);
    z-index: 99;
    transition: 0.3s;
}

.material-icons{
    font-size: 32px;
    margin-right: 16px;
}
.menu{
    margin: 0 -1rem;
}
li{
    list-style: none;
}
.logo{
    margin-bottom: 16px;
}
.logo img{
    width: 32px;
}

button{
    background: transparent;
    border: none;
    color: white;
    display: flex;
    align-items: center;
    width: 100%;
    cursor: pointer;
}
.btn{
    padding: 8px 16px;
    transition: 0.3s ease-in;
}
.btn:hover{
    background: rgba(255, 255, 255, 0.2);
}
.btn .text {
    opacity: 0;
    font-weight: 600;
    transition: 0.3s ease-in-out;
    min-width: 120px;
    text-align: left;
}

.menu-button,
.menu-button .material-icons{
    transition: 0.3s ease-out;
}
.menu-button:hover .material-icons{
    transform: translateX(5px);
}
.menu-button__container{
    position: relative;
    display: flex;
    justify-content: flex-end;
    top: 0;
    transition: 0.3s ease-out;
}
.is-expanded{
    width: 300px
}
.is-expanded .text{
    opacity: 1;
}
.is-expanded .menu-button__container{
    top: -3rem;
}
.is-expanded .menu-button {
    transform: rotate(-180deg);
}

@media (max-width: 768px) {
    aside {
        position: absolute;
    }
    .is-expanded{
        width: 100%;
    }
}
</style>