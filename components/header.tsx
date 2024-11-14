// components/Header.tsx
import Link from 'next/link'; 
import '@/style/base.css'
const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between   p-4 text-white  ">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">Hasiki</h1>
        <Link
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/github-logo.png" alt="GitHub Logo" className="h-6 w-6" />
        </Link>
      </div>
      <div className='flex gap-4'>
        <button className="btn-grad ">
          登录
        </button>
        <button className=" btn-grad">
          注册
        </button>
      </div>
    </header>
  );
};

export default Header;
