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
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';

// 定义表单验证规则
const formSchema = z.object({
  plan: z.enum(['basic', 'premium', 'pro'], {
    required_error: '请选择订阅计划。'
  }),
  traffic: z.number().min(10, '流量最少为 10GB').max(500, '流量最多为 500GB'),
  onlineIPs: z
    .number()
    .min(1, '在线 IP 数不能少于 1')
    .max(10, '在线 IP 数不能超过 10'),
  duration: z.enum(['1month', '6months', '1year'], {
    required_error: '请选择购买时长。'
  }),
  payment: z.enum(['alipay', 'wechat'], {
    required_error: '请选择支付方式。'
  })
});

type FormValues = z.infer<typeof formSchema>;

export function OrderForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan: 'basic',
      traffic: 50,
      onlineIPs: 1,
      duration: '1month',
      payment: 'alipay'
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log('提交的数据: ', data);
  };

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* 订阅计划 */}
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>订阅计划</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="mt-2 flex space-x-4"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <RadioGroupItem value="basic" />
                      <span>基础版</span>
                      <RadioGroupItem value="premium" />
                      <span>高级版</span>
                      <RadioGroupItem value="pro" />
                      <span>专业版</span>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 可用流量 */}
            <FormField
              control={form.control}
              name="traffic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>可用流量 (GB)</FormLabel>
                  <FormControl>
                    <Slider
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      max={500}
                      step={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 在线 IP 数 */}
            <FormField
              control={form.control}
              name="onlineIPs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>在线 IP 数</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={10}
                      placeholder="1-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 购买时长 */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>购买时长</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="mt-2 flex space-x-4"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <RadioGroupItem value="1month" />
                      <span>1 个月</span>
                      <RadioGroupItem value="6months" />
                      <span>6 个月</span>
                      <RadioGroupItem value="1year" />
                      <span>1 年</span>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 支付方式 */}
            <FormField
              control={form.control}
              name="payment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>支付方式</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="mt-2 flex space-x-4"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <RadioGroupItem value="alipay" />
                      <span>支付宝</span>
                      <RadioGroupItem value="wechat" />
                      <span>微信支付</span>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              提交订单
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
