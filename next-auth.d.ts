import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
    };
  }

  interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: number;
    name: string;
    email: string;
    role: string;
    accessToken: string;
  }
}