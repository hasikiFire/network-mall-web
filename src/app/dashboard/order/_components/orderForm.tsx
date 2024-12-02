'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { NumberInput } from '@/components/NumberInput';
import { useOrderStore } from '@/store/useOrderStore';
import { useEffect, useState } from 'react';
import { usePlanStore } from '@/store/usePlanStore';

// 定义表单验证规则
const formSchema = z.object({
  plan: z.string({
    required_error: '请选择订阅计划。'
  }),
  traffic: z.number().min(10, '流量最少为 10GB').max(600, '流量最多为 600GB'),
  onlineIPs: z
    .number()
    .min(1, '在线 IP 数不能少于 1')
    .max(10, '在线 IP 数不能超过 10'),
  duration: z.number({
    required_error: '请选择购买时长。'
  })
});

type FormValues = z.infer<typeof formSchema>;

export function OrderForm() {
  const { formData, setOrderData } = useOrderStore();
  const { planList, monthOptions } = usePlanStore();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formData
  });
  const [_, forceRender] = useState(0);

  const plan = form.watch('plan');

  // 使用 useEffect 监听表单变化
  useEffect(() => {
    const subscription = form.watch((values) => {
      setOrderData(values);
    });
    return () => subscription.unsubscribe(); // 组件卸载时清理订阅
  }, [form.watch]);

  useEffect(() => {
    const planDetail = planList?.find((v) => String(v.id) === plan);
    if (!planDetail?.traffic) return;
    form.setValue('traffic', planDetail?.traffic); 
  }, [plan]);

  // const onPlanChange = (v) => {};
  return (
    <Card>
      <CardHeader className="text-2xl font-bold">选择订阅计划</CardHeader>
      <CardContent>
        <Form {...form}>
          <form className=" space-y-8">
            {/* 订阅计划 */}
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem className="flex space-y-0">
                  <FormLabel className="  w-28 text-gray-600">
                    订阅计划
                  </FormLabel>
                  <FormControl className="flex-1">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex  flex-wrap gap-4"
                    >
                      {planList?.map((v) => (
                        <FormItem
                          className="flex cursor-pointer items-center  space-y-0"
                          key={v.id}
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={`${v.id}`}
                              className="  hidden"
                            ></RadioGroupItem>
                          </FormControl>
                          <FormLabel className=" ">
                            <div
                              className={`flex w-52 cursor-pointer  flex-col flex-wrap items-center rounded-md border p-4 shadow-md hover:bg-primary-foreground ${
                                field.value === String(v.id)
                                  ? 'border-primary  bg-primary-foreground  text-primary   '
                                  : ''
                              }`}
                            >
                              <div
                                className={`mb-2  rounded-2xl  border-white   px-4  py-2  ${
                                  field.value === String(v.id) ? '   ' : ''
                                }`}
                              >
                                {v.title}
                              </div>
                              <div>
                                <span className="mr-2 inline-block text-4xl font-bold text-amber-500">
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

            {/* 购买时长 */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem className="flex space-y-0">
                  <FormLabel className="  w-28 text-gray-600">
                    购买时长
                  </FormLabel>
                  <FormControl className="flex-1">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
                      className="flex flex-wrap gap-4"
                    >
                      {monthOptions.map((v) => (
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
                              className={`flex w-52 cursor-pointer  flex-col flex-wrap  items-center rounded-md border p-4 shadow-md hover:bg-primary-foreground   ${
                                String(field.value) === String(v.value)
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
            {/* 可用流量 */}
            <FormField
              control={form.control}
              name="traffic"
              render={({ field }) => (
                <FormItem className="flex space-y-0">
                  <FormLabel className="  w-28 text-gray-600">
                    可用流量 (GB)
                  </FormLabel>
                  <FormControl>
                    <NumberInput
                      min={formData?.traffic}
                      max={2000}
                      step={10}
                      {...field}
                      className="w-52"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 在线 IP   */}
            <FormField
              control={form.control}
              name="onlineIPs"
              render={({ field }) => (
                <FormItem className="flex space-y-0">
                  <FormLabel className="  w-28 text-gray-600">
                    在线 IP 数(个)
                  </FormLabel>
                  <FormControl>
                    <NumberInput min={3} max={10} {...field} className="w-52" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* 支付方式 */}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
