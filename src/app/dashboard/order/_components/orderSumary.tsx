import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import React from 'react';
import wxIcon from '@/style/image/wx.svg';
import alippayIcon from '@/style/image/alippay.svg';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { payOptions } from '@/utils/mock';
import Image from 'next/image';
import { useOrderStore } from '@/store/useOrderStore';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';

// export interface ISumaryProps {
//   field: any;
// }
const OrderSumary = () => {
  const { formData, setData } = useOrderStore();
  const summary = {
    subtotal: 80.96,
    discount: 16.19,
    deliveryFee: 0.0,
    tax: 14.0,
    total: 78.76
  };

  const onChange = (v: string) => {
    console.log('onChange v: ', v);
    setData({ payment: v });
  };

  return (
    <Card>
      <CardHeader className="text-2xl font-bold">订单总计</CardHeader>
      <CardContent>
        <div className="mb-2 flex justify-between">
          <span>账户余额</span>
          <span className="text-amber-500">
            ￥{summary.subtotal.toFixed(2)}
          </span>
        </div>

        <div className="mb-2 flex justify-between">
          <span>订单金额</span>
          <span className="text-amber-500">
            ￥{summary.deliveryFee.toFixed(2)}
          </span>
        </div>
        <div className="mb-2 flex justify-between">
          <span>折扣</span>
          <span className="text-amber-500">
            -￥{summary.discount.toFixed(2)}
          </span>
        </div>

        <div className="mt-4 flex justify-between  border-t py-4 text-lg ">
          <span>总计</span>
          <span className="text-amber-500">￥{summary.total.toFixed(2)}</span>
        </div>

        <div className="mt-4 border-t py-4 text-3xl font-bold">支付方式</div>
        <RadioGroup
          onValueChange={(v) => onChange(v)}
          defaultValue={formData?.payment}
          value={formData?.payment}
          className="flex flex-col flex-wrap gap-y-4"
        >
          {payOptions.map((v) => (
            <div
              className={`flex justify-between gap-y-4 space-y-0  rounded-md border p-4 ${
                String(formData?.payment) === String(v.value)
                  ? 'border-primary  bg-primary-foreground  text-primary   '
                  : ''
              }`}
              key={v.value}
              onClick={() => onChange(v.value)}
            >
              <div className={`flex items-center justify-center text-xl`}>
                <RadioGroupItem value={`${v.value}`}></RadioGroupItem>
                <div className='ml-3'>{v.label}</div>
              </div>
              <Image
                src={v.value === 'wxpay' ? wxIcon : alippayIcon}
                alt=""
                className="mr-2 h-6 w-6"
              ></Image>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button className="h-12 w-full bg-orange-500 hover:bg-orange-400" variant="default">
          立即支付
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderSumary;
