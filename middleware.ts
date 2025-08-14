import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;

  // Proteger /leads SIEMPRE
  // Proteger /api/leads SOLO cuando es GET (dejar POST libre para el formulario)
  const needsAuth =
    pathname.startsWith('/leads') ||
    (pathname.startsWith('/api/leads') && method === 'GET');

  if (!needsAuth) return NextResponse.next();

  const auth = req.headers.get('authorization') || '';
  const [scheme, encoded] = auth.split(' ');
  if (scheme !== 'Basic' || !encoded) {
    return new NextResponse('Auth required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    });
  }

  const [user, pass] = atob(encoded).split(':');
  if (user !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASS) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  return NextResponse.next();
}

export const config = { matcher: ['/leads', '/leads/:path*', '/api/leads'] };
