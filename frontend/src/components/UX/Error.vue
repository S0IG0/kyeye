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
    background: white;
    border: 2px solid red;
    border-radius: 5px;
    width: 100%;
    padding: 12px 0;
    font-weight: 600;
    font-family: Helvetica, sans-serif;
    transition: 0.5s;
  }
</style>