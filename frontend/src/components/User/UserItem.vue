<template>
    <div class="user">
        {{ user.first_name }} {{ user.last_name }}
    </div>
</template>

<script>
    export default { 
        props: {
            user: {
                type:Object,
                required:true,
            }
        },
        name: 'user-item'
    }
</script>

<style scoped>
    .user{
        padding: 15px;
        border: 2px solid gold;
        margin-top: 15px;
    }
</style>