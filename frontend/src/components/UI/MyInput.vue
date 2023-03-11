<template>
    <input :value="modelValue" @input="" class="input" type="text">
</template>

<script>
    export default { 
        name: 'my-input',
        props: {
            modelValue: [String, Number]
        },
        updateInput(event){
            this.$emit('update:modelValue', event.target.value)
        }
    }
</script>

<style scoped>
    .input{
        width: 100%;
        border: 1px solid gold;
        padding: 10px 15px;
        margin-top: 15px;
    }

</style>