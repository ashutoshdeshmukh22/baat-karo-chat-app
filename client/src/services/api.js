import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const register = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    name,
    email,
    password,
  });
  return response.data;
};

export const getContacts = async (token) => {
  const response = await axios.get(`${API_URL}/contacts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getChatHistory = async (token, contactId) => {
  const response = await axios.get(`${API_URL}/chats/${contactId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUser = async (token) => {
  const response = await axios.get(`${API_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(response.data);
  return response.data;
};

export const addContact = async (token, email) => {
  console.log(email);
  const response = await axios.post(
    `${API_URL}/contacts`,
    { email },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  console.log(response.data);
  return response.data;
};
