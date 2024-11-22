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
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

const formSchema = z
  .object({
    name: z.string().min(1, { message: '请输入昵称' }),
    email: z.string().email({ message: '邮箱格式不对' }),
    password: z.string().min(6, { message: '密码至少6位' }),
    passwordConfirm: z.string().min(6, { message: '两次输入的密码不一致' })

    // isRemind: z.boolean().optional()
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '两次输入的密码不一致',
    path: ['passwordConfirm'] // 指定错误信息出现在 passwordConfirm 字段
  });

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, startTransition] = useTransition();
  const defaultValues = {
    email: '123@qq.com'
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    startTransition(() => {
      // TODO
      // signIn('credentials', {
      //   email: data.email,
      //   callbackUrl: callbackUrl ?? '/dashboard'
      // });
      // toast.success('Signed In Successfully!');
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>昵称</FormLabel>
                <FormControl>
                  <Input
                    type="name"
                    placeholder="请输入您的昵称"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>{' '}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>邮箱</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="输入邮箱"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>{' '}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>密码</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="输入密码"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>{' '}
                <FormMessage />
                <div className="mb-2 text-xs text-gray-400">
                  密码由6位以上字符组成
                </div>
              </FormItem>
            )}
          />{' '}
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>确认密码</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="输入密码"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>{' '}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="mt-16  w-full" type="submit">
            注册
          </Button>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              已有账户?{' '}
              <Link href="/login">
                <Button variant="link" className="  hover:underline">
                  点击登录
                </Button>
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </>
  );
}
