// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}
export const config = { matcher: ['/dashboard/:path*'] };
