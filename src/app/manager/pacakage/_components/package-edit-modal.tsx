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
import { PackageListRespDto } from '@/interface';
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

interface PackageEditModalProps {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  editData?: PackageListRespDto;
  onSave: (editData: PackageListRespDto) => Promise<void>;
}

const formSchema = z.object({
  packageName: z.string().min(2, { message: '套餐名称至少需要2个字符' }),
  packageDesc: z.string().min(2, { message: '套餐描述至少需要2个字符' }),
  salePrice: z.number().min(0, { message: '价格必须大于等于0' }),
  dataAllowance: z.number().min(0, { message: '流量限额必须大于等于0' }),
  speedLimit: z
    .number()
    .min(0, { message: '速率限制必须大于等于0' })
    .nullable(),
  deviceLimit: z
    .number()
    .min(0, { message: '设备限制必须大于等于0' })
    .nullable(),
  packageStatus: z.number().min(0, { message: '状态值无效' })
});

export function PackageEditModal({
  isOpen,
  onOpenChange,
  editData,
  onSave
}: PackageEditModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      packageName: editData?.packageName || '',
      packageDesc: editData?.packageDesc || '',
      salePrice: editData?.salePrice,
      dataAllowance: editData?.dataAllowance,
      speedLimit: editData?.speedLimit,
      deviceLimit: editData?.deviceLimit,
      packageStatus: editData?.packageStatus || 0
    }
  });

  useEffect(() => {
    form.reset({
      packageName: editData?.packageName || '',
      packageDesc: editData?.packageDesc || '',
      salePrice: editData?.salePrice,
      dataAllowance: editData?.dataAllowance,
      speedLimit: editData?.speedLimit,
      deviceLimit: editData?.deviceLimit,
      packageStatus: editData?.packageStatus || 0
    });
  }, [editData]);

  const handleSave = async () => {
    setIsLoading(true);
    await form.handleSubmit(async (values) => {
      await onSave(values as PackageListRespDto);
    })();
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>编辑套餐信息</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
            <FormField
              control={form.control}
              name="packageName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>套餐名称</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="packageDesc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>套餐描述</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>价格</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dataAllowance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>流量限额(GB)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="speedLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>速率限制(MB/s)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value?.toString() ?? ''}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deviceLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>设备限制</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value?.toString() ?? ''}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="packageStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>状态</FormLabel>

                  <FormControl>
                    <Select
                      value={field.value?.toString()}
                      onValueChange={(value) => field.onChange(parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择状态" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">启用</SelectItem>
                        <SelectItem value="0">禁用</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" loading={isLoading}>
                保存
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
