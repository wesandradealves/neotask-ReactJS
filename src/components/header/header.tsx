"use client";

import Link from 'next/link';
import { Container } from './styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Title, Subtitle } from './styles';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { signIn, useSession, signOut, getCsrfToken } from 'next-auth/react';
import { Logout } from '@/services/userService';

const Header = () => {
  const { status } = useSession();
  const hasAttempted = useRef(false);
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      await Logout();
    } catch (err) {
      console.warn('Não foi possível deslogar do Laravel:', err);
    } finally {
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('csrf-token');
      await signOut({ redirect: true, callbackUrl: '/login' }); 
    }
  };

  useEffect(() => {
    if(session?.accessToken) {
      console.log('🔑 Salvando accessToken no sessionStorage:', session.accessToken);
      sessionStorage.setItem('accessToken', session.accessToken);
    }
  }, [session]);

  const shouldAttemptLogin = useMemo(() => {
    return (
      process.env.NODE_ENV === 'development' &&
      status === 'unauthenticated' &&
      !hasAttempted.current
    );
  }, [status]);

  const attemptLogin = useCallback(async () => {
    console.log('🔑 Tentando login com NextAuth...');
  
    try {
      const csrf = await getCsrfToken();
      console.log('🛡️ CSRF Token:', csrf);

      if (csrf) {
        sessionStorage.setItem('csrf-token', csrf);
      }
  
      const result = await signIn('LaravelCredentials', {
        redirect: false,
        email: 'test@example.com',
        password: 'Wes@03122530',
      });
  
      if (result?.ok) {
        console.log('✅ Login feito');
      } else {
        console.error('❌ Erro no login:', result);
      }
    } catch (err) {
      console.error('Erro no login com CSRF:', err);
    }
  }, []);
  
  useEffect(() => {
    if (shouldAttemptLogin) {
      hasAttempted.current = true;
      attemptLogin();
    }
  }, [shouldAttemptLogin, attemptLogin]);

  return (
    <Container className="py-8 px-4 relative overflow-hidden bg-fixed bg-auto repeat bg-bottom" style={{ backgroundImage: 'url(/img/background.jpg)' }}>
      <div className='container m-auto z-10 relative flex flex-col justify-center items-center gap-1'>
        <Link href="/">
          <LazyLoadImage
            src="/img/tiao-carreiro-pardinho.png"
            alt="avatar"
            className="relative mb-4 border-2 border-white border-solid inline-block h-[110px] w-[110px] lg:h-[140px] lg:w-[140px] !rounded-full object-cover object-center"
          />
        </Link>
        <Title className='capitalize text-white text-lg lg:text-xl font-bold'>Top 5 Músicas mais tocadas</Title>
        <Subtitle className='capitalize text-white text-sm lg:text-md font-bold'>Tião Carreiro & Pardinho</Subtitle>
        {status === 'authenticated' && (
          <button
            onClick={handleLogout}
            className="mt-4 text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#8b4513] to-[#d2691e] opacity-90 z-1" />
    </Container>
  );
};

export default Header;
