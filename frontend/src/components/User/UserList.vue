<template>
    <div v-show="users.length > 0">
        <h3>Список</h3>
        <user-item 
        v-for="user in users"
        :user="user"/>
    </div>
    <h2 v-show="users.length === 0">
        Список пользователей пуст
    </h2>
</template>

<script>
    import UserItem from '@/components/User/UserItem.vue'
    export default {
        components: {
            UserItem,
        },
        props: {
            users: {
                type: Array,
                required: true 
            }
        }
    }
</script>

<style scoped>
</style>