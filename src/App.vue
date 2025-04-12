<template>
  <h1>Учет Сотрудников</h1>

  <button @click="openAddDialog">Добавить</button>
  <EmployeeTable :employees="employees" @edit="openEditDialog" @delete="openConfirmDeleteDialog" />

  <AddEditEmployeeDialog
    v-if="showAddEditDialog"
    :editingEmployee="editingEmployee"
    @save="saveEmployee"
    @close="closeAddEditDialog" />

  <ConfirmDeleteDialog
    v-if="showConfirmDeleteDialog"
    @confirm="confirmDelete"
    @cancel="cancelDelete" />
</template>

<script>
import { ref, onMounted } from 'vue';
import EmployeeTable from './components/EmployeeTable.vue';
import AddEditEmployeeDialog from './components/AddEditEmployeeDialog.vue';
import ConfirmDeleteDialog from './components/ConfirmDeleteDialog.vue';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from './services/api';

export default {
  components: {
    EmployeeTable,
    AddEditEmployeeDialog,
    ConfirmDeleteDialog,
  },
  setup() {
    const showAddEditDialog = ref(false);
    const showConfirmDeleteDialog = ref(false);
    const editingEmployee = ref(null);
    const deletingEmployeeId = ref(null);

    const employees = ref([]);

    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        employees.value = data;
      } catch (error) {
        console.error('Ошибка при получении сотрудников с сервера:', error);
      }
    };

    onMounted(() => {
      fetchEmployees();
    });

    const openAddDialog = () => {
      editingEmployee.value = null;
      showAddEditDialog.value = true;
    };

    const openEditDialog = (employee) => {
      editingEmployee.value = employee;
      showAddEditDialog.value = true;
    };

    const closeAddEditDialog = () => {
      showAddEditDialog.value = false;
      editingEmployee.value = null;
    };

    const saveEmployee = async (form) => {
      try {
        if (editingEmployee.value) {
          const updatedEmployee = { ...editingEmployee.value, ...form };
          const index = employees.value.findIndex((emp) => emp.id === editingEmployee.value.id);
          if (index !== -1) {
            employees.value[index] = updatedEmployee;
          }
          await updateEmployee(updatedEmployee.id, updatedEmployee);
        } else {
          const newEmployee = { id: Date.now(), ...form };
          employees.value.push(newEmployee);
          await createEmployee(newEmployee);
        }
        fetchEmployees();
        closeAddEditDialog();
      } catch (error) {
        console.log(error);
      }
    };

    const openConfirmDeleteDialog = (id) => {
      deletingEmployeeId.value = id;
      showConfirmDeleteDialog.value = true;
    };

    const confirmDelete = async () => {
      showConfirmDeleteDialog.value = false;
      const idToDelete = deletingEmployeeId.value;
      deletingEmployeeId.value = null;

      try {
        employees.value = employees.value.filter((emp) => emp.id !== idToDelete);

        await deleteEmployee(idToDelete);
        await fetchEmployees();
      } catch (error) {
        console.error('Ошибка при удалении:', error);
      }
    };

    const cancelDelete = () => {
      showConfirmDeleteDialog.value = false;
      deletingEmployeeId.value = null;
    };

    return {
      employees,
      showAddEditDialog,
      showConfirmDeleteDialog,
      editingEmployee,
      openAddDialog,
      openEditDialog,
      closeAddEditDialog,
      saveEmployee,
      openConfirmDeleteDialog,
      confirmDelete,
      cancelDelete,
    };
  },
};
</script>
