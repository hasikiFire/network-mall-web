import { Metadata } from 'next';
import Image from 'next/image';
import ResetPasswordForm from '../_components/reset-password-form';
export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function Page() {
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

      <div className="flex h-full items-center bg-white p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">忘记密码?</h1>
            <p className="text-sm text-muted-foreground">
              输入注册邮箱,我们会给您发送验证码帮助您重置密码
            </p>
          </div>
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}
