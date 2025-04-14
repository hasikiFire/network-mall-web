// components/GlobalErrorBoundary.tsx
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GlobalErrorHandler() {
  const router = useRouter();

  useEffect(() => {
    const handleUnhandledError = (event: ErrorEvent) => {
      if (event.error.message.includes('Authentication required')) {
        event.preventDefault();
        localStorage.removeItem('token');
        router.push('/login');
      }
    };

    window.addEventListener('error', handleUnhandledError);
    return () => window.removeEventListener('error', handleUnhandledError);
  }, [router]);

  return null;
}