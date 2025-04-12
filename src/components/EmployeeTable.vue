<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Зарплата</th>
          <th>Возраст</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id" @dblclick="editEmployee(employee)">
          <td>{{ employee.id }}</td>
          <td>{{ employee.employee_name }}</td>
          <td>{{ employee.employee_salary }}</td>
          <td>{{ employee.employee_age }}</td>
          <td>
            <button @click="deleteEmployee(employee.id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    employees: {
      type: Array,
      required: true,
    },
  },
  methods: {
    editEmployee(employee) {
      this.$emit('edit', employee);
    },

    deleteEmployee(employeeId) {
      this.$emit('delete', employeeId);
    },
  },
};
</script>

<style scoped>
.table-container {
  max-width: 100%;
  overflow-x: auto;
  margin-top: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-family: sans-serif;
  font-size: 14px;
}

th,
td {
  padding: 8px 12px;
  border: 1px solid #ddd;
  text-align: left;
}

thead {
  background-color: #f3f3f3;
}

tr:hover {
  background-color: #f9f9f9;
}

button {
  padding: 4px 8px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #d32f2f;
}
</style>
