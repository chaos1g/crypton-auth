/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API_URL = 'https://backend-ashen-seven-22.vercel.app';

// Метод регистрации
export const registerUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password,
    });

    localStorage.setItem('token', response.data.token);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.response?.data || 'Что-то пошло не так!');
  }
};

// Метод авторизации
export const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
  
      localStorage.setItem('token', response.data.token);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.response?.data || 'Что-то пошло не так!');
    }
};

// Метод получения данных о пользователе
export const getUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        throw new Error('Токен не найден');
      }
      if (token) {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
              Authorization: `${token}`,
            },
          });
      
        return response.data;
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Ошибка при получении данных пользователя');
    }
};
