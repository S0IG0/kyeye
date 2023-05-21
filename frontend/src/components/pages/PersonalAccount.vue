<template>
    <div class="wrapper">
        <sidebar-menu class="sidebar"></sidebar-menu>
        <div class="pages">
            <div class="page" v-if="currentPage === Pages.Account" >
                <div class="page__title">
                    Личный кабинет
                </div>
                <div class="user-info">
                    <div class="user-image">
                        <img src="@/components/static/user-icon.png" alt="" width="100">
                    </div>
                    <div class="container">
                        <div class="title">Никнейм</div>
                        <div class="value">{{ user.username }}</div>
                    </div>
                    <div class="container">
                        <div class="title">Имя</div>
                        <div class="value">{{ user.first_name }}</div>
                    </div>
                    <div class="container">
                        <div class="title">Фамилия</div>
                        <div class="value">{{ user.last_name }}</div>
                    </div>
                    <div class="container">
                        <div class="title">E-mail</div>
                        <div class="value">{{ user.email }}</div>
                    </div>
                </div>
            </div>
            <div class="page" v-if="currentPage === Pages.Queue" >
                <modal-window v-model:show="modalVisible">
                    <div class="modal__header">Создание очереди</div>
                    <div class="input__container">
                        <div class="modal__title">Название и время</div>
                        <div class="input__block">
                            <my-input id="modal-input1"
                                      class="input"
                                      placeholder="Например: Очередь на БД"
                                      v-model="queue.name"
                                      required
                            ></my-input>
                            <my-input id="modal-input2"
                                      class="input"
                                      placeholder="##:##"
                                      v-model="queue.time"
                                      required>
                            </my-input>
                        </div>
                        <div class="input__button">
                            <my-button @click="createQueue" id="create">Создать очередь</my-button>
                        </div>
                    </div>
                    <div class="link__container">
                        <div class="modal__title">Скопировать</div>
                        <my-button id="copy">Скопировать</my-button>
                    </div>
                </modal-window>
                <div class="queues">
                    <div class="queues-own">
                        <div class="queues__title">
                            <h2>Созданные вами очереди</h2>
                        </div>
                        <div class="queues__list">
                            <queue-item v-for="edge in queues_owner">
                                <template v-slot:name>
                                    {{ edge['node']['name'] }}
                                </template>
                                <template v-slot:text>
                                    Количество участников:
                                </template>
                                <template v-slot:data>
                                    {{ edge['node']['users']['edges'].length }}
                                </template>
                            </queue-item>
                        </div>
                    </div>
                    <!--    {{ queues_subscriber }}-->
                    <div class="queues-subscriber">
                        <div class="queues__title">
                            <h2>Очереди, в которых вы состоите</h2>
                        </div>
                        <div class="queues__list">
                            <queue-item v-for="edge in queues_subscriber">
                                <template v-slot:name>
                                    {{ edge['node']['name'] }}
                                </template>
                                <template v-slot:text>
                                    Номер в очереди:
                                </template>
                                <template v-slot:data>
                                    {{ findUserPosition(edge['node']['users']['edges']) }}
                                </template>
                            </queue-item>
                        </div>
                    </div>
                </div>
                <div class="queue__buttons">
                    <my-button class="button" @click="showModal">Создать очередь</my-button>
                    <my-button class="button">Присоединиться к очереди</my-button>
                </div>
            </div>
            <div class="page" v-if="currentPage === Pages.Settings">
                <my-input placeholder="Новый пароль" v-model="this.password"></my-input>
                <my-input placeholder="Повторите новый пароль"></my-input>
                <my-button>Сменить пароль</my-button>
            </div>
        </div>
    </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import {Auth} from "@/components/js/AuthModule";
import {urlBackend} from "@/components/config";
import MyInput from "@/components/UI/MyInput.vue";
import ModalWindow from "@/components/UI/ModalWindow.vue";
import gql from "graphql-tag";
import SidebarMenu from "@/components/UI/PersonalAccount/SidebarMenu.vue";
import {Pages} from "@/components/UI/PersonalAccount/config";
import {mapState} from "vuex";
import Queue from "@/components/pages/Queue.vue";
import QueueItem from "@/components/UI/PersonalAccount/QueueItem.vue";

export default {
    name: "PersonalAccount",
    computed: {
        Pages() {
            return Pages
        },
        ...mapState({
            currentPage: state => state.currentPage
        }),
    },
    components: {Queue, SidebarMenu, ModalWindow, MyInput, MyButton, QueueItem},
    data() {
        return {
            Auth: Auth,
            user: {
                id: '',
                username: "",
                email: "",
                password: "",
                first_name: "",
                last_name: "",
            },
            password: "",
            queue: {
                name: "",
                time: new Date().getHours().toString().padStart(2, '0') + ":" +
                    new Date().getMinutes().toString().padStart(2, '0'),
            },
            modalVisible: false,
            // Массив для хранение очередей где пользователь явлется участником
            queues_subscriber: [],
            // Массив для хранение очередей где пользователь является создателейм очереди
            queues_owner: [],
            queues: [],
            state: Pages.Queue
        }
    },

    apollo: {
        queues: {
            query: gql`query($userId: Int!, $ownerId: Int!){queues (first: 100, userId: $userId, ownerId: $ownerId) {edges {node {name, dateActivation, owner{username}, users{edges{node{id, user{username}}}}}}}}`,
            variables() {
                this.getUser()
                return {
                    userId: this.user.id,
                    ownerId: this.user.id
                }
            },
        },
    },

    watch: {
        queues: {
            handler(queues) {
                for (let edge of queues['edges']) {
                    if (edge['node']['owner']['username'] === this.user.username) {
                        this.queues_owner.push(edge)
                    }
                    if (edge['node']['users']['edges'].find((item) => item['node']['user']['username'] === this.user.username) !== undefined) {
                        this.queues_subscriber.push(edge)
                    }
                }
            }
        }
    },

    methods: {
        async getUser() {
            const response = await this.Auth.requestToBackend(
                'get',
                `${urlBackend}/api/user/${this.Auth.JwtToken.decodeAccess().user_id}`,
                {},
            )
            for (let key in response.data) {
                this.user[key] = response.data[key]
            }
        },
        // async changePassword() {
        //   const response = await this.Auth.requestToBackend(
        //     'put',
        //       `${urlBackend}/api/user/update/${this.Auth.JwtToken.decodeAccess().user_id}`,
        //       {},
        //   )
        // },
        showModal() {
            this.modalVisible = true
        },
        async createQueue() { // Добавить response.data в queue owner
            let dateCreation = new Date();
            let dateActivation;
            let [hours, minutes] = this.queue.time.split(':');
            dateActivation = new Date();
            dateActivation.setHours(hours);
            dateActivation.setMinutes(minutes);

            const response = await this.Auth.requestToBackend(
                'post',
                `${urlBackend}/api/queue/register/`,
                {
                    "owner": this.user,
                    "name": this.queue.name,
                    "date_creation": dateCreation.toISOString(),
                    "date_activation": dateActivation.toISOString(),
                })
        },
        findUserPosition(array){
            for (let index in array){
                if (array[index]['node']['user']['username'] === this.user.username)
                    return Number(index) + 1;
            }
        }
    },
    mounted() {
        this.getUser()
    }
}
</script>

<style scoped>
.wrapper{
    display: flex;
}
.pages{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.page{
    margin-top: 20px;
    width: 75%;
}
.user-info {
    gap: 10px;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}

.user-image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.container {
    display: flex;
    font-family: Helvetica, sans-serif;
    border: 2px solid rgb(52, 114, 238);
}

.title {
    background: rgb(52, 114, 238);
    color: white;
    padding: 10px 20px;
    width: 35%;
    text-align: center;
    font-weight: 600;
}

.value {
    background: white;
    color: rgb(52, 114, 238);
    padding: 10px 20px;
    text-align: center;
    width: 65%;
    font-weight: 600;
}

.page__title {
    font-family: Helvetica, sans-serif;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
}

.queue__buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    gap: 20px;
}

.button {
    font-size: 15px;
    padding: 8px 10px;
    width: 100%;
    height: 51px;
}

.modal__header {
    background: rgb(52, 114, 238);
    padding: 20px 25px;
    color: white;
    font-size: 22px;
    font-weight: 600;
    font-family: Helvetica, sans-serif;
    display: flex;
    align-items: center;
}

.input__container {
    padding: 20px 25px;
}

.modal__title {
    font-family: Helvetica, sans-serif;
    font-weight: 600;
    font-size: 22px;
    color: #333333;
}

.input__block {
    display: flex;
    margin-top: 20px;
    gap: 15px;
}

.input {
    margin-top: 0;
    color: #333333;
    border-radius: 10px;
    border: 3px solid rgb(52, 114, 238);
}

#modal-input1 {
    width: 100%;
    font-size: 18px;
}

#modal-input2 {
    width: 100px;
    font-size: 20px;
    letter-spacing: 5px;
    text-align: center;
    font-weight: 600;
    padding: 15px 10px;
}

.input__button {
    margin-top: 15px;
    margin-bottom: 10px;
}

#create, #copy {
    width: 100%;
    border-radius: 10px;
    height: 60px;
}

.link__container {
    padding: 0 25px;
}

#copy {
    margin: 20px 0;
    background: #333333;
}

.queues{
    display: flex;
    justify-content: space-between;
    gap: 30px;
    font-family: Helvetica, sans-serif;
    min-height: 500px;
}
.queues-own, .queues-subscriber{
    width: 100%;
}
.queues__list{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.queues__title{
    text-align: center;
    margin-bottom: 20px;
    font-family: Helvetica, sans-serif;
    font-size: 120%;
}

@media (max-width: 1024px) {
    .page {
        margin-top: 50px;

    }
    .pages{
        width: 100%;
    }
}

</style>

