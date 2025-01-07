import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import wxIcon from '@/style/image/wx.svg';
import alippayIcon from '@/style/image/alippay.svg';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import { useOrderStore } from '@/store/useOrderStore';
import { z } from 'zod';
import Decimal from 'decimal.js';
import { usePlanStore } from '@/store/usePlanStore';
import { toast } from 'sonner';
import Loading from '@/components/loaindg';

export interface ISumary {
  countFee: number;
  orderFee: number;
  disCountFee: number;
  total: number;
}
const OrderSumary = () => {
  const { formData, setOrderData } = useOrderStore();
  const { planList, planConfig, payOptions } = usePlanStore();
  // const { theme } = useTheme();

  const [summary, setSummary] = useState<ISumary>({
    countFee: 0,
    orderFee: 0,
    disCountFee: 0,
    total: 0
  });
  const [promotionData, setPromotionData] = useState({
    code: '',
    discount: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!formData) return;
    const activePlan = planList?.find((v) => String(v.id) === formData?.plan);
    if (!activePlan) {
      return;
    }

    // 使用 Decimal 来进行高精度计算
    let curTotal = new Decimal(activePlan.basePrice).mul(formData.duration);
    if (planConfig.IPConfigable && formData.onlineIPs && activePlan.ipLimit) {
      curTotal = curTotal.add(
        new Decimal(planConfig.IPPrice).mul(
          formData.onlineIPs - activePlan.ipLimit
        )
      );
    }
    if (planConfig?.trafficConfigable && formData.traffic) {
      curTotal = curTotal.add(
        new Decimal(planConfig.trafficPrice).mul(
          formData.traffic - activePlan.traffic
        )
      );
    }
    const tempfee = curTotal.toNumber();

    // 处理折扣
    let tempDisCount = 0;
    if (promotionData.code) {
      tempDisCount = curTotal
        .mul(new Decimal(1 - promotionData.discount))
        .toNumber();
    }
    curTotal = curTotal.sub(tempDisCount);

    setSummary((pre) => ({
      ...pre,
      disCountFee: tempDisCount,
      orderFee: tempfee,
      total: curTotal.toNumber()
    }));
  }, [formData, planList, promotionData]);

  const onChange = (v: string) => {
    setOrderData({ payment: v });
  };

  const handleDelete = () => {
    setPromotionData({
      code: '',
      discount: 0
    });
  };

  const onPay = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success('支付成功', {
        richColors: true,
        className: 'text-lg',
        duration: 2000
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div>
      <Card>
        <CardHeader className="text-2xl font-bold">
          <div>订单总计</div>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex justify-between">
            <span className="text-gray-600">订单金额</span>
            <span className="text-lg text-orange-600">
              ￥{summary.orderFee.toFixed(2)}
            </span>
          </div>
          {/* <div className="mb-2 flex justify-between">
            <span className="text-gray-600">账户余额</span>
            <span className="text-lg text-orange-600">
              -￥{summary.countFee.toFixed(2)}
            </span>
          </div> */}

          <div className="mb-2 flex justify-between">
            <div className="flex text-gray-600">
              <div className="mr-1">优惠金额</div>
            </div>
            <span className="text-lg text-orange-600">
              {`-￥${summary.disCountFee.toFixed(2)}`}
            </span>
          </div>
          <div className="mt-4 flex justify-between  border-t py-4 text-lg ">
            <span className="font-bold text-gray-600">总计</span>
            <span className="text-2xl font-bold text-orange-600">
              ￥{summary.total.toFixed(2)}
            </span>
          </div>

          <div className="mt-2 border-t py-4 text-2xl font-bold">支付方式</div>
          <RadioGroup
            onValueChange={(v) => onChange(v)}
            defaultValue={formData?.payment}
            value={formData?.payment}
            className="flex flex-col flex-wrap gap-y-4"
          >
            {payOptions.map((v) => (
              <div
                className={`flex  cursor-pointer  justify-between gap-y-4 space-y-0 rounded-md  border p-4 hover:bg-primary-foreground ${
                  String(formData?.payment) === String(v.value)
                    ? 'border-primary  bg-primary-foreground  text-primary   '
                    : ''
                }`}
                key={v.value}
                onClick={() => onChange(v.value)}
              >
                <div className={`flex items-center justify-center text-lg`}>
                  <RadioGroupItem value={`${v.value}`}></RadioGroupItem>
                  <div className="ml-3">{v.label}</div>
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
          <Button
            className="h-12 w-full bg-orange-600 hover:bg-orange-600 hover:shadow-lg"
            variant="default"
            onClick={onPay}
          >
            立即支付
          </Button>
        </CardFooter>
      </Card>

      <Loading loading={loading} title="正在支付..." />
      {/* 居中显示通知 */}
    </div>
  );
};

export default OrderSumary;
