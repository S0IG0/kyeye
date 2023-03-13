import Register from "@/components/pages/Register.vue";
import {createRouter, createWebHistory} from "vue-router";
import Queue from "@/components/pages/Queue.vue";
import Main from "@/components/pages/Main.vue";


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
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;