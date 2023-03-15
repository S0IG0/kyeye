<template>
  <input :value="modelValue" @input="updateInput" class="input" type="text">
</template>

<script>
export default {
  name: 'my-input',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  border: 2px solid rgb(52, 114, 238);
  padding: 15px 15px;
  margin-top: 15px;
  font-size: 15px;
  font-weight: 600;
  color: black;
  border-radius: 5px;
}

</style>