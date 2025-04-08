/* eslint-disable @typescript-eslint/no-explicit-any */

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import api from '@/services/api';

console.log('🔥 NextAuth API carregada');

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'LaravelCredentials',
      name: 'LaravelCredentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        console.log('🔥 Entrou no authorize');
      
        try {
          const response = await api.post('/login', {
            email: credentials?.email,
            password: credentials?.password,
          });
      
          console.log('📡 Resposta do Laravel recebida');
          const user = response.data;
      
          console.log('📦 Dados recebidos:', user);
      
          if (!user?.token) {
            throw new Error(user.message || 'Erro na autenticação');
          }
      
          console.log('✅ Autenticação bem-sucedida:', user, user.token);
      
          return {
            id: user.user.id,
            name: user.user.name,
            email: user.user.email,
            role: user.user.role,
            accessToken: user.token,
          } as any;
        } catch (error: any) {
          console.error('❌ Erro na autenticação:', error.response?.data || error.message);
          throw new Error(error.response?.data?.message || 'Erro na autenticação');
        }
      }
      
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl; // evita redirecionar automaticamente
    },
    async jwt({ token, user }) {
      console.log('🧠 JWT callback - user:', user);

      if (user) {
        token.id = (user as any).id;
        token.name = user.name;
        token.email = user.email;
        token.role = (user as any).role;
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('💾 Session callback - token:', token);

      session.user = {
        ...(session.user || {}),
        id: (token as any).id,
        name: token.name,
        email: token.email,
        role: (token as any).role,
      };
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/',
  },

  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
