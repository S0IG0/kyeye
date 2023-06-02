<template>
  <div class="queue-item">
    <div class="queue__name">
      Название:
      <slot name="name"></slot>
    </div>
    <div class="queue__info">
      <slot name="text">
      </slot>
      <slot name="data">
      </slot>
    </div>
    <div class="queue__info ms-2">
      <slot name="is_active">
      </slot>
    </div>
  </div>

</template>

<script>
export default {
  name: "QueueItem",
}
</script>

<style scoped>
.queue-item {
  background: rgb(52, 114, 238);
  padding: 20px 40px;
  color: white;
  font-weight: 600;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

@media (max-width: 768px) {
  .queue__name, .queue__info {
    width: 50%;
  }

  .queue-item {
    padding: 15px 25px;
  }
}
</style>