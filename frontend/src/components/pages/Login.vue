<template>
    <navigation-bar v-if="isDesktop"></navigation-bar>
    <navbar-menu v-else></navbar-menu>
    <div class="wrapper">
        <div class="authentication" v-if="true">
            <div class="title">Авторизация</div>
            <form @submit.prevent>
                <my-input placeholder="E-mail"
                          v-model="this.email"
                          required
                ></my-input>
                <my-input placeholder="Пароль"
                          v-model="this.password"
                          required
                          type="password"
                ></my-input>
                <div class="forgot__password">
                    <a>Забыли пароль?</a>
                </div>
                <my-button @click="logIn">
                    <div v-if="isLoading">
                        Загрузка...
                        <div class="spinner-border ms-2" style="width: 1.3rem; height: 1.3rem;" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div v-else>
                        Войти
                    </div>
                </my-button>
            </form>
            <div class="text">
                У вас нет аккаунта? <span class="link" @click="$router.push('/register')">Зарегистрироваться</span>
            </div>
        </div>
        <my-button v-else @click="">Выйти</my-button>
        <error-list :errors="errors" class="error-list"></error-list>
    </div>
</template>

<script>

import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import ErrorList from "@/components/UX/ErrorList.vue";
import {validateEmail, validateName} from "@/components/validators/validators";
import {mapActions, mapState} from "vuex";
import router from "@/components/routers/router";
import NavigationBar from "@/components/UI/navigationBar.vue";
import NavbarMenu from "@/components/UI/NavbarMenu.vue";

export default {
    name: "login-form",
    components: {NavbarMenu, NavigationBar, ErrorList, MyButton, MyInput},
    computed: mapState({
        error: state => state.auth.error,
        isAuth: state => state.auth.isAuth,
        isLoading: state => state.auth.isLoading,
    }),
    data() {
        return {
            email: "",
            password: "",
            errors: [],
            isDesktop: false
        }
    },
    methods: {
        ...mapActions({
            login: "auth/login",
        }),
        validateData() {
            [
                validateEmail(
                    this.email,
                ),
                validateName(
                    'e-mail',
                    this.email,
                ),
                validateName(
                    'пароль',
                    this.password,
                ),
            ].forEach(errors => {
                this.errors.push(...errors);
            })
        },
        async logIn() {
            this.errors = [];
            this.validateData();
            if (this.errors.length === 0) {
                await this.login({email: this.email, password: this.password})
            }
            if (this.isAuth) {
                router.push('/account').then()
            }
            if (this.error) {
                this.errors.push(this.error)
            }
        }
    },
    mounted() {
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
    margin: 100px 500px;
}

.link {
    color: rgb(52, 114, 238);
    cursor: pointer;
    text-decoration: none;
}

.text {
    margin-top: 15px;
    text-align: center;
    font-family: Helvetica, sans-serif;
    font-size: 15px;
    line-height: 20px;
}

.forgot__password {
    text-align: right;
    margin: 15px 0;
    color: gray;
    font-family: Helvetica, sans-serif;
    font-size: 13px;
}

.title {
    font-family: Helvetica, sans-serif;
    font-size: 30px;
    font-weight: 600;
}

@media (max-width: 1024px) {
    .wrapper {
        margin: 100px 200px;
    }
}

@media (max-width: 768px) {
    .wrapper {
        margin: 30px 60px;
    }
}
</style>