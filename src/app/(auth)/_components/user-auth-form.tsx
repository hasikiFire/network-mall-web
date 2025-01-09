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
import { useAuthStore } from '@/store/useAuthStore';
import Service from './service';

const formSchema = z.object({
  email: z.string().email({ message: '邮箱格式不对' }),
  password: z.string().min(6, { message: '密码至少6位' }),
  isRemind: z.boolean().optional()
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const login = useAuthStore((state) => state.login);
  const service = new Service();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, startTransition] = useTransition();
  const defaultValues = {
    email: searchParams.get('email') || '',
    password: ''
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    startTransition(async () => {
      try {
        const res = await service.login({
          email: data.email,
          password: data.password
        });
        login({
          email: data.email,
          token: res.token,
          userId: res.uid
        });
        toast.success('登录成功!');

        signIn('credentials', {
          email: data.email,
          callbackUrl: callbackUrl ?? '/dashboard'
        });
      } catch (e) {
        console.error(e);
      }
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isRemind"
            render={({ field }) => (
              <FormItem className="  !mb-6 !mt-4 flex items-center  space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="ml-3 mt-0   ">记住我</FormLabel>
              </FormItem>
            )}
          />
          <Button disabled={loading} className="mt-16  w-full" type="submit">
            登录
          </Button>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              还没有账号?{' '}
              <Link href="/register">
                <Button
                  variant="link"
                  className="text-blue-500 hover:underline"
                >
                  点击注册
                </Button>
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </>
  );
}
