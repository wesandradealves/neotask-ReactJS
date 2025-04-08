/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api';
import Cookies from 'js-cookie';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}

export const Login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    await api.get(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
    
    const csrfToken = Cookies.get('XSRF-TOKEN');
    if (csrfToken) {
      sessionStorage.setItem('csrf-token', decodeURIComponent(csrfToken));
    } else {
      console.warn('CSRF token não encontrado nos cookies.');
    }
    
    const response = await api.post<LoginResponse>(
      '/login',
      { email, password },
      {
        withCredentials: true,
      }
    );

    sessionStorage.setItem('token', response.data.token);

    return response.data;
  } catch (error: unknown) {
    console.error('Login Error:', error);

    const message =
      (error as any)?.response?.data?.message || 'Erro ao fazer login.';
    throw new Error(message);
  }
};

export const Logout = async (): Promise<void> => {
  try {
    const token = sessionStorage.getItem('token');

    if (!token) {
      console.warn('⚠️ Sem token, pulando chamada ao backend.');
    } else {
      await api.post('/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    console.log('✅ Logout feito');
  } catch (error) {
    console.error('❌ Erro ao fazer logout:', error);
  } finally {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('csrf-token');
  }
};
