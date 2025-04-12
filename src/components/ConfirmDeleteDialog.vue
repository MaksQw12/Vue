<template>
  <div class="confirm-dialog">
    <div class="dialog-content">
      <p>Удалить сотрудника?</p>
      <div class="actions">
        <button @click="confirm">Да</button>
        <button @click="cancel">Нет</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['confirm', 'cancel'],
  setup(_, { emit }) {
    const confirm = () => emit('confirm');
    const cancel = () => emit('cancel');
    return { confirm, cancel };
  },
};
</script>

<style scoped>
.confirm-dialog {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.dialog-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
.actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>
