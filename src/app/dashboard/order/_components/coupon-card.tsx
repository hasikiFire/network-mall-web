'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import { useOrderStore } from '@/store/useOrderStore';

export function CouponCard() {
  const [couponCode, setCouponCode] = useState('');
  const setOrderData = useOrderStore((state) => state.setOrderData);

  const handleApplyCoupon = () => {
    if (!couponCode) return;
    if (couponCode === 'Hasaki') {
      // TODO check code
      setOrderData({ couponCode, discount: 0 });
    } else {
      toast.error('优惠码无效', {
        richColors: true,
        duration: 2000
      });
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-medium">输入优惠码</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mt-4">
          <Input
            className="flex-1 "
            placeholder="请输入优惠码"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <Button
            variant="default"
            className="w-20"
            onClick={handleApplyCoupon}
          >
            验证
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
