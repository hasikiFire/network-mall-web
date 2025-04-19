import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { UserEditDto } from '@/interface';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useEffect, useState } from 'react';

interface UserEditModalProps {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  userData?: UserEditDto;
  onSave: (userData: UserEditDto) => Promise<void>;
}

const formSchema = z.object({
  name: z.string().min(2, { message: '名称至少需要2个字符' }),
  email: z.string().email({ message: '请输入有效的邮箱地址' }),
  status: z.number().min(0, { message: '状态值无效' })
});

export function UserEditModal({
  isOpen,
  onOpenChange,
  userData,
  onSave
}: UserEditModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData?.name || '',
      email: userData?.email || '',
      status: userData?.status || 1
    }
  });

  useEffect(() => {
    form.reset({
      name: userData?.name || '',
      email: userData?.email || '',
      status: userData?.status
    });
  }, [userData]);

  const handleSave = async () => {
    await form.handleSubmit(async (values) => {
      await onSave(values as UserEditDto);
    })();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>编辑用户信息</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名称</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>状态</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value.toString()}
                      onValueChange={(value) => field.onChange(parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择状态" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">正常</SelectItem>
                        <SelectItem value="0">无效</SelectItem>
                        <SelectItem value="2">已禁用</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">保存</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
