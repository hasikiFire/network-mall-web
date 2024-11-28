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
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { mockplanList, mockMonthOptions, payOptions } from '@/utils/mock';

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
      onlineIPs: 3,
      duration: '1month',
      payment: 'alipay'
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log('提交的数据: ', data);
  };

  return (
    <Card>
      <CardHeader className="text-2xl font-bold">选择订阅计划</CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8">
            {/* 订阅计划 */}
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem className="flex  space-y-0">
                  <FormLabel className="mr-6 w-28">订阅计划</FormLabel>
                  <FormControl className="mt-0  ">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex  gap-4 flex-wrap"
                    >
                      {mockplanList.map((v) => (
                        <FormItem
                          className="flex items-center  space-y-0"
                          key={v.id}
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={`${v.id}`}
                              className="  hidden"
                            ></RadioGroupItem>
                          </FormControl>
                          <FormLabel className="!  font-normal">
                            <div
                              className={`flex w-52 flex-col flex-wrap items-center rounded-md border p-4 ${
                                field.value === String(v.id)
                                  ? 'border-primary  bg-primary-foreground  text-primary   '
                                  : ''
                              }`}
                            >
                              <div
                                className={`  mb-4  rounded-2xl  border-white   px-4  py-2  ${
                                  field.value === String(v.id)
                                    ? ' bg-primary text-white '
                                    : ' '
                                }`}
                              >
                                {v.title}
                              </div>
                              <div>
                                <span className="mr-2  inline-block text-4xl font-bold text-amber-500">
                                  {v.basePrice}
                                </span>
                                <span className="text-base">元/月</span>
                              </div>
                            </div>
                          </FormLabel>
                        </FormItem>
                      ))}
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
                <FormItem className="flex space-y-0">
                  <FormLabel className="mr-6 w-28">可用流量 (GB)</FormLabel>
                  <FormControl className="mt-0">
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
                <FormItem className="flex space-y-0">
                  <FormLabel className="mr-6 w-28">在线 IP 数</FormLabel>
                  <FormControl className="mt-0 w-28">
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
                <FormItem className="flex space-y-0">
                  <FormLabel className="mr-6 w-28">购买时长</FormLabel>
                  <FormControl className="mt-0 ">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4 flex-wrap"
                    >
                      {mockMonthOptions.map((v) => (
                        <FormItem
                          className="flex flex-wrap  items-center space-y-0"
                          key={v.value}
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={`${v.value}`}
                              className="hidden"
                            ></RadioGroupItem>
                          </FormControl>
                          <FormLabel className="font-normal">
                            <div
                              className={`flex w-52 flex-col flex-wrap items-center rounded-md border p-4 ${
                                field.value === String(v.value)
                                  ? 'border-primary  bg-primary-foreground  text-primary   '
                                  : ''
                              }`}
                            >
                              {v.label}
                            </div>
                          </FormLabel>
                        </FormItem>
                      ))}
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
                <FormItem className="flex space-y-0">
                  <FormLabel className="mr-6 w-28">支付方式</FormLabel>
                  <FormControl className="mt-0">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4 flex-wrap"
                    >
                      {payOptions.map((v) => (
                        <FormItem
                          className="flex items-center  gap-4 space-y-0 "
                          key={v.value}
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={`${v.value}`}
                              className="hidden"
                            ></RadioGroupItem>
                          </FormControl>
                          <FormLabel className="font-normal">
                            <div
                              className={`flex w-52 flex-col items-center rounded-md border p-4 ${
                                field.value === String(v.value)
                                  ? 'border-primary  bg-primary-foreground  text-primary   '
                                  : ''
                              }`}
                            >
                              {v.label}
                            </div>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <Button type="submit" className="w-full">
              提交订单
            </Button> */}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
