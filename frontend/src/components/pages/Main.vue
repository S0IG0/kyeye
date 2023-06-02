<template>
    <navigation-bar v-if="isDesktop"></navigation-bar>
    <navbar-menu v-else></navbar-menu>
    <div class="wrapper">
        <div class="logo">
            <img src="@/components/static/logo.png" alt="">
        </div>
        <div class="text">
            КУЕУЕ - это удобный способ для организаций и учреждений управлять потоком посетителей
            и предоставлять им эффективное обслуживание. Вместо того, чтобы тратить время в очередях,
            пользователи могут заранее записаться в очередь через наше приложение.
        </div>
    </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import {urlBackend} from "../config";
import {mapActions, mapState} from 'vuex'
import NavigationBar from "@/components/UI/navigationBar.vue";
import NavbarMenu from "@/components/UI/NavbarMenu.vue";

export default {
    name: "Main",
    data() {
        return {
            result: undefined,
            isDesktop: false
        }
    },

    computed: mapState({
        isAuth: state => state.auth.isAuth,
        isLoading: state => state.auth.isLoading,
        error: state => state.auth.error,
        Token: state => state.auth.token
    }),
    methods: {
        urlBackend() {
            return urlBackend
        },
        ...mapActions({
            login: "auth/login",
            check: 'auth/checkIsActiveToken',
            logout: 'auth/logout',
        }),
        test() {
            this.check({token: this.Token.refresh}).then(result => (this.result = result))
        }
    },
    components: {NavbarMenu, NavigationBar, MyButton},
    mounted() {
        console.log('process.env', process.env)
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
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.logo img {
    width: 400px;
}
.text{
    width: 60%;
    font-family: Helvetica, sans-serif;
    font-weight: 600;
    font-size: 20px;
    text-align: center;

}
my-button {
    margin-top: 15px;
    width: 100px;
}
@media(max-width: 768px){
    .logo img{
        width: 100%;
    }
}
</style>