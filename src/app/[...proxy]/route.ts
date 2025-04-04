import { auth } from '@/auth';
import { NextRequest } from 'next/server';

// Review if we need this, and why
function stripContentEncoding(result: Response) {
  const responseHeaders = new Headers(result.headers);
  responseHeaders.delete('content-encoding');

  return new Response(result.body, {
    status: result.status,
    statusText: result.statusText,
    headers: responseHeaders
  });
}

async function handler(request: NextRequest) {
  const session = await auth();

  const headers = new Headers(request.headers);
  headers.set('Authorization', `Bearer ${session?.accessToken}`);

  let result = await fetch(request.nextUrl.origin, {
    headers,
    body: request.body
  });

  return stripContentEncoding(result);
}

export const dynamic = 'force-dynamic';

export { handler as GET, handler as POST };
