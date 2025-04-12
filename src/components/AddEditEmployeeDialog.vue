<template>
  <dialog ref="dialog">
    <form @submit.prevent="saveEmployee">
      <h2>{{ editingEmployee ? 'Редактировать' : 'Добавить' }} Сотрудника</h2>
      <label>Имя:</label>
      <input type="text" v-model="form.employee_name" required /><br />
      <label>Зарплата:</label>
      <input type="number" v-model="form.employee_salary" required /><br />
      <label>Возраст:</label>
      <input type="number" v-model="form.employee_age" required /><br />
      <button type="submit">Сохранить</button>
      <button type="button" @click="closeDialog">Отмена</button>
    </form>
  </dialog>
</template>

<script>
import { reactive, ref, nextTick, watch } from 'vue';

export default {
  props: {
    editingEmployee: {
      type: Object,
      default: null,
    },
  },
  emits: ['save', 'close'],
  setup(props, { emit }) {
    const form = reactive({
      employee_name: '',
      employee_salary: null,
      employee_age: null,
    });
    const dialog = ref(null);

    const openDialog = async () => {
      form.employee_name = props.editingEmployee?.employee_name || '';
      form.employee_salary = props.editingEmployee?.employee_salary || null;
      form.employee_age = props.editingEmployee?.employee_age || null;

      await nextTick();
      dialog.value?.showModal();
    };

    const closeDialog = () => {
      dialog.value?.close();
      emit('close');
    };

    const saveEmployee = () => {
      emit('save', { ...form });
      closeDialog();
    };

    watch(
      () => props.editingEmployee,
      () => {
        openDialog();
      },
      { immediate: true },
    );

    return {
      dialog,
      form,
      saveEmployee,
      closeDialog,
    };
  },
};
</script>

<style scoped>
.dialog {
  padding: 0;
  border: none;
  border-radius: 6px;
  width: 300px;
}

.form {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.title {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}

input {
  width: 100%;
  padding: 6px 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

button {
  padding: 6px 12px;
  border: none;
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background-color: #555;
}
</style>
