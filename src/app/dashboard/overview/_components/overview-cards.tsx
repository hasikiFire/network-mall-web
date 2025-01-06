'use client';

import { cache, use, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer, Network, Laptop2, Wallet } from 'lucide-react';
import Service from './service';
import { UsageRecord } from '@/interface';
import { formatTraffic } from '@/lib/format';
import service from './service';

const CARDS_CONFIG: {
  title: string;
  icon: any;
  getValue: (data?: UsageRecord) => string;
  getSubValue?: (data?: UsageRecord) => string;
}[] = [
  {
    title: '剩余时长',
    icon: Timer,
    getValue: (data?: UsageRecord) => data?._endTime ?? '-'
  },
  {
    title: '剩余流量',
    icon: Network,
    getValue: (data?: UsageRecord) =>
      formatTraffic(data?.consumedDataTransfer ?? 0)
    // getSubValue: (data?: UsageRecord) =>
    //   `今日已用${formatTraffic(data?.consumedDataTransfer ?? 0)}`
  },
  {
    title: '在线设备数',
    icon: Laptop2,
    getValue: (data?: UsageRecord) => {
      return !data?.deviceLimit
        ? '无限制'
        : `${data?.deviceNum ?? 0} / ${data?.deviceLimit ?? 0}`;
    }
  }
  // {
  //   title: '钱包余额',
  //   icon: Wallet,
  //   getValue: (data?: UsageRecord) => `¥ ${data?.balance ?? 0}`
  // }
];

export function OverviewCards() {
  
  // const recordDetail = use(service.getRecordDetail()); 莫名其妙引发服务端渲染各种问题
  const [recordDetail, setRecordDetail] = useState<UsageRecord>();

  useEffect(() => {
    service.getRecordDetail().then((data) => {
      setRecordDetail(data);
    });
  }, []);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {CARDS_CONFIG.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {card.getValue(recordDetail)}
            </div>
            {card?.getSubValue && (
              <p className="text-xs text-muted-foreground">
                {card?.getSubValue(recordDetail)}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
