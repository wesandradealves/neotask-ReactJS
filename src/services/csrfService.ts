import Cookies from 'js-cookie';
import api from './api';

export const getCsrfToken = async () => {
  try {
    await api.get('/sanctum/csrf-cookie');

    const csrfToken = Cookies.get('XSRF-TOKEN');

    if (csrfToken) {
      localStorage.setItem('csrf-token', csrfToken);
    }

    return csrfToken;
  } catch (error) {
    console.error('Erro ao obter CSRF token:', error);
    throw error;
  }
};
