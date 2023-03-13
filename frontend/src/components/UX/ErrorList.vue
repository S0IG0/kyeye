<template>
  <div class="error-list"
  v-for="error in errors"
  :key="error">
    <error>{{ error }}</error>
  </div>
</template>

<script>
import Error from "@/components/UX/Error.vue";

export default {
  name: "error-list",
  components: {Error},
  props:{
    errors: {
      type: Array,
    }
  },

}
</script>

<style scoped>
  .error-list{
    width: 500px;
    height: 200px;
    border: 2px solid red;
    margin-top: 15px;
  }

</style>