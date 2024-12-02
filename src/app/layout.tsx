import { auth } from '@/auth';
import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import './globals.css';
import '@/style/base.css';
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
      <body className={'overflow-hidden'}>
        <NuqsAdapter>
          <NextTopLoader showSpinner={false} />
          <Providers session={session}>
            <Toaster
              toastOptions={{
                style: {
                  position: 'fixed', // 确保它是固定的
                  top: '50%', // 距离顶部 50%
                  left: '50%', // 距离左侧 50%
                  transform: 'translate(-50%, -50%)', // 精确居中
                  zIndex: 9999, // 确保它在其他内容之上
                  height: 'fit-content'
                }
              }}
            />
            {children}
          </Providers>
        </NuqsAdapter>
      </body>
    </html>
  );
}
