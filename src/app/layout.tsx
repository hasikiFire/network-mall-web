import { auth } from '@/auth';
import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app'; 
import './globals.css';
import '@/style/base.css';
import { DialogProvider } from '@/components/dialog/dialog-provider';
import { ReactNode } from 'react';
export const metadata: Metadata = {
  title: 'Next Shadcn',
  description: 'Basic dashboard with Next.js and Shadcn'
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html
      lang="en"
      className={`${lato.className}`}
      suppressHydrationWarning={true}
    >
      <body>
        <NuqsAdapter>
          <UIProviders>
            <Providers session={session}>{children} </Providers>
          </UIProviders>
        </NuqsAdapter>
      </body>
    </html>
  );
}

const UIProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <NuqsAdapter>
      <NextTopLoader showSpinner={false} />
      <Toaster />
      <DialogProvider>{children}</DialogProvider>
    </NuqsAdapter>
  );
};
