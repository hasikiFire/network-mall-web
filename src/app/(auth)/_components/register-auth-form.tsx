'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import Link from 'next/link';
import Service from './service';
import useCountdown from '@/hooks/useCountdown';
import { EyeOff, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  // name: z.string().min(1, { message: '请输入昵称' }),
  email: z.string().email({ message: '邮箱格式不对' }),
  password: z.string().min(6, { message: '密码至少6位' }),
  code: z.string().min(1, { message: '请输入验证码' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const service = new Service();
  const { countdown, isCounting, startCountdown, stopCountdown } =
    useCountdown(60);
  const [loading, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // name: '',
      email: '',
      password: '',
      code: ''
    }
  });

  const onSubmit = async (data: UserFormValue) => {
    console.log('onSubmit data: ', data);

    startTransition(async () => {
      try {
        await service.register({
          // name: data.name,
          email: data.email,
          password: data.password,
          velCode: data.code
        });
        toast.success('注册成功!!!');
        setTimeout(() => {
          router.push(`/login?email=${data.email}`);
        });
      } catch (e) {
        console.error(e);
      }
    });
  };

  const handleSendCode = async () => {
    // 使用 zod 的 safeParse 方法同步验证邮箱格式
    const email = form.getValues('email');
    const result = formSchema.pick({ email: true }).safeParse({ email });

    if (!result.success) {
      // 如果验证失败，获取并显示错误信息
      const emailError = result.error.errors.find((e) => e.path[0] === 'email');
      if (emailError) {
        toast.error(emailError.message); // 显示错误消息
      }
      return;
    }

    startCountdown();
    startTransition(async () => {
      try {
        await service.getEmailCode({
          email: form.getValues('email'),
          type: 'REGISTER'
        });
        toast.success('发送成功');
      } catch (e) {
        stopCountdown();
      }
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3"
        >
          {/* <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>昵称</FormLabel>
                <FormControl>
                  <Input
                    type="name"
                    placeholder="请输入您的昵称"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>邮箱</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="输入邮箱"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>验证码</FormLabel>
                <FormControl>
                  <div className="flex">
                    <Input
                      placeholder="输入验证码"
                      disabled={loading}
                      {...field}
                      className="flex-1"
                    />
                    <Button
                      type="button" // 明确指定按钮类型为普通按钮
                      className="ml-2 text-sm "
                      onClick={handleSendCode}
                      disabled={isCounting || loading}
                    >
                      {isCounting ? `重新发送(${countdown}s)` : '发送验证码'}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>密码</FormLabel>
                <FormControl>
                  <div className="flex">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="输入密码"
                      disabled={loading}
                      {...field}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="   flex items-center px-3  "
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
                <div className="mb-2 text-xs text-gray-400">
                  密码由6位以上字符组成
                </div>
              </FormItem>
            )}
          />

          <Button disabled={loading} className="w-full" type="submit">
            注册
          </Button>
          <div className="mt-4 text-center">
            <div className="text-gray-600">
              已有账户?
              <Link href="/login" className="text-blue-600 hover:underline">
                点击登录
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
