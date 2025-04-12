import axios from 'axios';

const API_BASE_URL = 'https://dummy.restapiexample.com/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getEmployees = async () => {
  const response = await api.get('/employees');
  return response.data.data;
};

export const createEmployee = async (data) => {
  await api.post('/create', data);
};

export const getEmployeebyId = async (id) => {
  const response = await api.get(`/employee/${id}`);
  return response.data.data;
};

export const updateEmployee = async (id, data) => {
  await api.put(`/update/${id}`, data);
};

export const deleteEmployee = async (id) => {
  await api.delete(`/delete/${id}`);
};
export default api;
