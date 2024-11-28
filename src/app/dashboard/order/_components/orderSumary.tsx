import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import React from 'react';

export interface ISumaryProps {
  // Add props here,账户余额，
}
const OrderSumary: React.FC = (props: ISumaryProps) => {
  const summary = {
    subtotal: 80.96,
    discount: 16.19,
    deliveryFee: 0.0,
    tax: 14.0,
    total: 78.76
  };

  return (
    <Card>
      <CardHeader>订单总计</CardHeader>
      <CardContent>
        <div className="mb-2 flex justify-between">
          <span>账户余额</span>
          <span>${summary.subtotal.toFixed(2)}</span>
        </div>

        <div className="mb-2 flex justify-between">
          <span>订单金额</span>
          <span>${summary.deliveryFee.toFixed(2)}</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span>折扣</span>
          <span>-${summary.discount.toFixed(2)}</span>
        </div>
        <div className="mt-4 flex justify-between text-lg font-bold">
          <span>总计</span>
          <span>${summary.total.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button>立即支付 </Button>{' '}
      </CardFooter>
    </Card>
  );
};

export default OrderSumary;
