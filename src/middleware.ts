import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirecionamento opcional da root para /home
  // if (pathname === '/') {
  //   return NextResponse.redirect(new URL('/home', request.url));
  // }

  // Sempre retornar NextResponse.next para evitar loops
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
