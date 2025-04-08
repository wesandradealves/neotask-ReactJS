import api from './api';

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
