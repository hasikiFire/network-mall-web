'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { UsageRecordEditReqDto } from '@/interface';

const formSchema = z.object({
  id: z.number(),
  orderCode: z.string(),
  userId: z.number(),
  purchaseStatus: z.number().optional(),
  purchaseStartTime: z.string().optional(),
  purchaseEndTime: z.string().optional(),
  deviceNum: z.number().optional(),
  dataAllowance: z.number().optional(),
  consumedDataTransfer: z.number().optional(),
  speedLimit: z.number().optional()
});

interface UsageRecordFormProps {
  initialData?: UsageRecordEditReqDto;
  onSubmit: (values: UsageRecordEditReqDto) => void;
}

export function UsageRecordForm({
  initialData,
  onSubmit
}: UsageRecordFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      id: 0,
      orderCode: '',
      userId: 0,
      purchaseStatus: 0,
      deviceNum: 0,
      dataAllowance: 0,
      consumedDataTransfer: 0,
      speedLimit: 0
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="orderCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order Code</FormLabel>
              <FormControl>
                <Input placeholder="Order code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User ID</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="User ID"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purchaseStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">Not Started</SelectItem>
                  <SelectItem value="1">Active</SelectItem>
                  <SelectItem value="2">Data Exhausted</SelectItem>
                  <SelectItem value="3">Expired</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purchaseStartTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                {/* <Calendar
                  initialFocus
                  defaultMonth={field.value}
                  mode="range"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date: any) => field.onChange(date?.toISOString())}
                  numberOfMonths={2}
                /> */}
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
              <FormLabel>Data Allowance (B)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Data allowance"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
