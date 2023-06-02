<template>
    <navigation-bar v-if="isDesktop"></navigation-bar>
    <navbar-menu v-else></navbar-menu>
    <div class="wrapper">
        <div class="registration">
            <div class="title">Регистрация</div>
            <my-input placeholder="E-mail"
                      v-model="user.email"
                      required></my-input>
            <my-input placeholder="Имя пользователя"
                      v-model="user.username"
                      required></my-input>
            <my-input placeholder="Имя"
                      v-model="user.first_name"
                      required></my-input>
            <my-input placeholder="Фамилия"
                      v-model="user.last_name"
                      required></my-input>
            <my-input placeholder="Пароль"
                      v-model="user.password"
                      type="password"
                      required></my-input>
            <my-input placeholder="Пароль (повторить)"
                      v-model="user.repeat_password"
                      type="password"
                      required></my-input>
            <div class="button__container">
                <my-button class="sign-up"
                           @click="validateData"
                >
                    <div v-if="isLoading || isLoadingRequest">
                        Загрузка...
                        <div class="spinner-border ms-2" style="width: 1.3rem; height: 1.3rem;" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div v-else>
                        Зарегистрироваться
                    </div>
                </my-button>
            </div>
        </div>
        <error-list :errors="errors" class="error-list"></error-list>
    </div>
</template>

<script>
import MyInput from "@/components/UI/MyInput.vue";
import ErrorList from "@/components/UX/ErrorList.vue";
import MyButton from "@/components/UI/MyButton.vue";
import {validateEmail, validateName, validatePassword} from "@/components/validators/validators";
import axios from "axios";
import router from "@/components/routers/router";
import {urlBackend} from "@/components/config";
import {mapActions, mapState} from "vuex";
import NavigationBar from "@/components/UI/navigationBar.vue";
import NavbarMenu from "@/components/UI/NavbarMenu.vue";


export default {
    name: "Register",
    components: {NavbarMenu, NavigationBar, ErrorList, MyInput, MyButton},
    computed: mapState({
        error: state => state.auth.error,
        isAuth: state => state.auth.isAuth,
        isLoading: state => state.auth.isLoading,
    }),
    props: {
        user: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            user: {
                email: "",
                first_name: "",
                last_name: "",
                username: "",
                password: "",
                repeat_password: "",
            },
            errors: [],
            isLoadingRequest: false,
            isDesktop: false
        }
    },
    methods: {
        ...mapActions({
            login: "auth/login",
        }),
        async validateData() {
            this.errors = [];
            [
                validatePassword(
                    this.user.password,
                    this.user.repeat_password,
                ),
                validateEmail(
                    this.user.email,
                ),
                validateName(
                    'имя',
                    this.user.first_name,
                ),
                validateName(
                    'фамилию',
                    this.user.last_name,
                ),
            ].forEach(errors => {
                this.errors.push(...errors);
            })
            if (this.errors.length === 0) {
                await this.postRequestToBackend().then(async response => {
                    if (response) {
                        // Пользователь зарегестрирован
                        await this.login({email: this.user.email, password: this.user.password})
                        router.push('/account').then()
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        async postRequestToBackend() {
            let value = null;
            try {
                this.isLoadingRequest = true;
                await axios({
                    method: 'post',
                    url: `${urlBackend}/api/user/register/`,
                    data: {
                        "username": this.user.username,
                        "first_name": this.user.first_name,
                        "last_name": this.user.last_name,
                        "email": this.user.email,
                        "password": this.user.password,
                    }
                }).then(response => {
                    value = response;
                }).finally(() => {
                    this.isLoadingRequest = false;
                })
            } catch (error) {
                for (const key in error.response.data) {
                    this.errors.push(...error.response.data[key])
                }
            } finally {
                this.isLoadingRequest = false;
            }
            return value;
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
.sign-up {
    margin-top: 15px;
}

.wrapper {
    margin: 100px 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.button__container {
    display: flex;
    flex-direction: column;
}

.registration .title {
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
