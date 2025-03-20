import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import React, { useEffect, useRef, useState } from 'react';
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
import Tag from '@/components/ui/tag';
import service from './service';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { GBToB } from '@/lib/format';
import QRCode from 'qrcode';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { PackageRespDto } from '@/interface';
import { getUsageRecordDetail } from '@/api';
export interface ISumary {
  countFee: number;
  orderFee: number;
  disCountFee: number;
  total: number;
}
const OrderSumary = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const { orderData, setOrderData } = useOrderStore();
  const { planList, planConfig, payOptions } = usePlanStore();
  // const { theme } = useTheme();

  const [summary, setSummary] = useState<ISumary>({
    countFee: 0,
    orderFee: 0,
    disCountFee: 0,
    total: 0
  });

  const [loading, setLoading] = useState(false);
  const [loadingTitle, setloadingTitle] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [payRes, setPayRes] = useState<PackageRespDto>();
  const pollOrderInterVal = useRef<any>();
  const usageInterVal = useRef<any>();

  useEffect(() => {
    if (!orderData) return;
    const activePlan = planList?.find(
      (v) => String(v.id) === String(orderData?.plan)
    );
    if (!activePlan) {
      return;
    }

    // 使用 Decimal 来进行高精度计算
    let curTotal = new Decimal(activePlan.basePrice).mul(orderData.duration);
    if (planConfig.IPConfigable && orderData.onlineIPs && activePlan.ipLimit) {
      curTotal = curTotal.add(
        new Decimal(planConfig.IPPrice).mul(
          orderData.onlineIPs - activePlan.ipLimit
        )
      );
    }
    if (planConfig?.trafficConfigable && orderData.traffic) {
      curTotal = curTotal.add(
        new Decimal(planConfig.trafficPrice).mul(
          orderData.traffic - activePlan.traffic
        )
      );
    }
    const tempfee = curTotal.toNumber();

    // 处理折扣
    let tempDisCount = 0;
    if (orderData?.couponCode) {
      tempDisCount = curTotal
        .mul(new Decimal(1 - (orderData.discount ?? 0)))
        .toNumber();
    }
    curTotal = curTotal.sub(tempDisCount);

    setSummary((pre) => ({
      ...pre,
      disCountFee: tempDisCount,
      orderFee: tempfee,
      total: curTotal.toNumber()
    }));
  }, [orderData, planList, orderData]);

  useEffect(() => {
    if (payRes) {
      setTimeout(() => {
        pollOrderstatus();
      }, 5000);
    }
  }, [payRes]);

  const onChange = (v: string) => {
    setOrderData({ payWay: v });
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
    }
  };

  const pollOrderstatus = (isClick = false) => {
    service.pollOrder({ orderCode: payRes?.orderNo ?? '' }).then((data) => {
      if (data?.status === '1') {
        toast.success('支付成功', {
          richColors: true,
          className: 'text-lg',
          duration: 1000
        });
        setIsOpen(false);
        setLoading(true);
        setloadingTitle('正在创建套餐...');
        setTimeout(() => {
          checkUsageRecordStatus();
        }, 1000);
        clearTimeout(pollOrderInterVal.current);
      } else {
        if (isClick) {
          toast.error('未查询到支付记录，请确认是否支付', {
            richColors: true,
            className: 'text-lg',
            duration: 3000
          });
        } else {
          pollOrderInterVal.current = setTimeout(() => {
            pollOrderstatus();
          }, 1000);
        }
      }
    });
  };

  const checkUsageRecordStatus = async () => {
    const res = await getUsageRecordDetail();

    if (res.data) {
      clearTimeout(usageInterVal.current);
      toast.success('套餐创建成功', {
        richColors: true,
        className: 'text-lg',
        duration: 1000
      });
      router.push('/dashboard');
    } else {
      usageInterVal.current = setTimeout(checkUsageRecordStatus, 1000);
    }
  };

  const onPay = async () => {
    try {
      setLoading(true);
      const data = await service.buyPackageItem({
        packageId: Number(orderData.plan),
        userId: authStore.user?.userId || 0,
        // 如果超过最大安全整数会出现精度丢失问题，最好转换成string
        dataAllowance: GBToB(orderData.traffic),
        deviceLimit: orderData.onlineIPs,
        month: orderData.duration,
        payWay: orderData.payWay,
        couponCode: orderData.couponCode
      });
      if (!data) {
        toast.error('下单失败', {
          richColors: true,
          className: 'text-lg',
          duration: 2000
        });
        setLoading(false);
        return;
      }
      setloadingTitle('正在下单，请稍等...');
      setLoading(false);
      setIsOpen(true);
      setPayRes(data);

      QRCode.toDataURL(
        data.payUrl,
        { width: 200, margin: 2 },
        (err: any, url: React.SetStateAction<string>) => {
          if (err) {
            console.error('Failed to generate QR code:', err);
            return;
          }
          setQrCodeUrl(url);
        }
      );
      // router.push('/dashboard');
    } catch (error) {
      toast.error('下单失败', {
        richColors: true,
        className: 'text-lg',
        duration: 2000
      });
      setLoading(false);
    }
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
              {orderData.couponCode && (
                <Tag label={`${orderData?.discount}折`} />
              )}
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
            defaultValue={orderData?.payWay}
            value={orderData?.payWay}
            className="flex flex-col flex-wrap gap-y-4"
          >
            {payOptions.map((v) => (
              <div
                className={`flex  cursor-pointer  justify-between gap-y-4 space-y-0 rounded-md  border p-4 hover:bg-primary-foreground ${
                  String(orderData?.payWay) === String(v.value)
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
            立即下单
          </Button>
        </CardFooter>

        <Dialog open={isOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader className="flex justify-between">
              <DialogTitle>支付订单</DialogTitle>

              <div className="text-gray-600">
                请用支付宝扫码支付：
                <span className=" text-orange-600">
                  {summary.total.toFixed(2)}元
                </span>
              </div>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center">
              {qrCodeUrl && (
                <Image
                  src={qrCodeUrl}
                  alt=""
                  className="mb-4 h-48 w-48 rounded-lg"
                  width={200}
                  height={200}
                ></Image>
              )}
            </div>
            <DialogFooter>
              <div className="w-full ">
                <Button
                  className="mb-4  h-12 w-full  "
                  variant="default"
                  onClick={() => {
                    pollOrderstatus(true);
                  }}
                >
                  我已支付
                </Button>
                <Button
                  className="h-12  w-full  "
                  variant="secondary"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  关闭
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>

      <Loading loading={loading} title={loadingTitle} />
      {/* 居中显示通知 */}
    </div>
  );
};

export default OrderSumary;
