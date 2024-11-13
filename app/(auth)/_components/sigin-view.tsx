import { Metadata } from 'next';
import UserAuthForm from './user-auth-form';
import Image from 'next/image';
export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center bg-[#f4f5fb] md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="  p-5  ">
        <div className="w-100 flex justify-center">
          <Image
            src="/bg_auth.png"
            alt="Auth Background"
            width={500}
            height={300}
          />
        </div>
      </div>

      <div className="flex h-full items-center p-4 lg:p-8 bg-white">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome to hasiki! 👋
            </h1>
            <p className="text-sm text-muted-foreground">
              请登录您的账号开始体验！
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}
