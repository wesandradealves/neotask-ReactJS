'use client';
import {
  _colors,
  _breakpoints,
} from '@/assets/scss/variables';
const theme = {
  _colors,
  _breakpoints,
};
import { App, GlobalStyle } from '@/app/style';
import '@/assets/scss/globals.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AnimatePresence, motion } from 'motion/react';
import { ThemeProvider } from 'styled-components';
import StyledJsxRegistry from './registry';
import { Suspense, useEffect } from 'react';
import classNames from 'classnames';
import { AuthProvider } from '@/context/auth';
import { LoaderProvider, useLoader } from '@/context/spinner';
import { setupInterceptors } from '@/services/api';
import Spinner from '@/components/spinner/spinner';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        suppressHydrationWarning={true}
        className={classNames(
          `antialiased 
          overflow-x-hidden
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-track]:ms-7
          [&::-webkit-scrollbar-track]:me-7
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-yellow-500
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:cursor-move
          `
        )}
      >
        <ThemeProvider theme={theme}>
          <LoaderProvider>
            <LoaderSetup />
            <SessionProvider>
              <AuthProvider>
                <Suspense fallback={<div>Loading...</div>}>
                  <StyledJsxRegistry>
                    <AnimatePresence
                      mode="wait"
                      initial={true}
                      onExitComplete={() => window.scrollTo(0, 0)}
                    >
                      <App id="primary">
                        <motion.div
                          className="min-h-screen flex flex-start flex-col"
                          initial={{ x: 0, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: 0, opacity: 0 }}
                        >
                          {children}
                        </motion.div>
                        <Spinner />
                      </App>
                    </AnimatePresence>
                  </StyledJsxRegistry>
                </Suspense>
              </AuthProvider>
            </SessionProvider>
          </LoaderProvider>
          <GlobalStyle />
        </ThemeProvider>
      </body>
    </html>
  );
}

function LoaderSetup() {
  const { setLoading } = useLoader();

  useEffect(() => {
    setupInterceptors(setLoading);
  }, [setLoading]);

  return null;
}