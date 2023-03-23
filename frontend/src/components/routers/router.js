import Register from "@/components/pages/Register.vue";
import {createRouter, createWebHistory} from "vue-router";
import Queue from "@/components/pages/Queue.vue";
import Main from "@/components/pages/Main.vue";
import Login from "@/components/pages/Login.vue";
import PersonalAccount from "@/components/pages/PersonalAccount.vue";

const routes = [
    {
        path: '/register',
        component: Register
    },
    {
        path: '/queue',
        component: Queue
    },
    {
        path: '/',
        component: Main
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/account',
        component: PersonalAccount
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;