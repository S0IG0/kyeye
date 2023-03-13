<template>
  <div class="error">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "error"
}
</script>

<style scoped>
  .error{
    color: red;
    text-align: center;
  }
</style>