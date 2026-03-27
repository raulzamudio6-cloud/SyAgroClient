// users.service.js
import axios from '../auth/axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getUsers = async () => {
  const res = await axios.get(`${API_URL}/users`);
  return res.data;
};

export const getUserById = async (id) => {
  const res = await axios.get(`${API_URL}/users/${id}`);
  return res.data;
};

export const createUser = async (data) => {
  const res = await axios.post(`${API_URL}/users`, data);
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await axios.put(`${API_URL}/users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`${API_URL}/users/${id}`);
  return res.data;
};
