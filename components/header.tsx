// components/Header.tsx
import Link from 'next/link';
import '@/style/base.css';
import { Button } from './ui/button';
const Header: React.FC = () => {
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
        <Button className="btn-primary  rounded-2xl px-10 py-4">登录</Button>
        <Button className=" bg-white text-[#461A29] rounded-2xl px-10 py-4">注册</Button>
      </div>
    </header>
  );
};

export default Header;
