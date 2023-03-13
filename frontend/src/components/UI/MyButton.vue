<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button'
}
</script>

<style scoped>
.btn {
  padding: 10px 15px;
  background: rgb(52, 114, 238);
  color: white;
  border: 1px solid transparent;
  border-radius: 5px;
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  font-weight: 600;
}

</style>