// components/Header.tsx
'use client';
import '@/style/base.css';
import { useRouter } from 'next/navigation';
const Header: React.FC = () => {
  const router = useRouter();

  return (
    <header className="header-bg flex items-center   justify-between p-4 px-20  text-white ">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-[#461A29]">Hasaki</h1>
        {/* <Link
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/github-logo.png" alt="GitHub Logo" className="h-6 w-6" />
        </Link> */}
      </div>
      <div className="flex gap-4">
        <div
          className="bg btn-bg-primary  rounded-2xl px-12 py-5"
          onClick={() => router.push('/login')}
        >
          登录
        </div>
        <div
          className="rounded-2xl bg-white px-12 py-5 text-[#461A29]"
          onClick={() => router.push('/register')}
        >
          注册
        </div>
      </div>
    </header>
  );
};

export default Header;
