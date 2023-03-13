<template>
  <div class="error-list" v-show="errors.length !== 0">
      <error v-for="error in errors"
      :key="error">{{ error }}
      </error>
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
    width: 100%;
    height: auto;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    transition: 0.5s;
  }
</style>