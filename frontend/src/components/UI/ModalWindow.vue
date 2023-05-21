<template>
    <div class="modal" v-if="show" @click="hideModalWindow">
        <div class="modal__content" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModalWindow",
    props: {
        show: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        hideModalWindow() {
            this.$emit('update:show', false);
        }
    }
}
</script>

<style scoped>
.modal {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
    z-index: 100;
}

.modal__content {
    position: fixed;
    bottom: 0;
    right: 32px;
    left: 32px;
    margin: auto;
    background: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    height: 60%;
    min-width: 300px;
    overflow: hidden;
}


</style>