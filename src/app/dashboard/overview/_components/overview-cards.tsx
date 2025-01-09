'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Timer,
  Network,
  Laptop2,
  Wallet,
  AlertTriangle,
  Copy
} from 'lucide-react';
import { UsageRecord } from '@/interface';
import { formatTraffic } from '@/lib/format';
import service from './service';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { OverviewSkeleton } from '@/components/skeletons/overview-skeleton';

const CARDS_CONFIG: {
  title: string;
  icon: any;
  getValue: (data?: UsageRecord | null) => string;
  getSubValue?: (data?: UsageRecord | null) => string;
}[] = [
  {
    title: '剩余时长',
    icon: Timer,
    getValue: (data?: UsageRecord | null) =>
      data ? data._endTime ?? '-' : '无'
  },
  {
    title: '剩余流量/总流量',
    icon: Network,
    getValue: (data?: UsageRecord | null) =>
      data
        ? `${formatTraffic(data._remainingTraffic ?? 0)} / ${formatTraffic(
            data.dataAllowance ?? 0
          )}`
        : '无'
  },
  {
    title: '在线设备数',
    icon: Laptop2,
    getValue: (data?: UsageRecord | null) =>
      data
        ? !data.deviceLimit
          ? '无限制'
          : `${data.deviceNum ?? 0} / ${data.deviceLimit ?? 0}`
        : '无'
  }
  // {
  //   title: '订阅状态',
  //   icon: AlertTriangle,
  //   getValue: (data?: UsageRecord | null) => (data ? '已订阅' : '未订阅'),
  //   getSubValue: (data?: UsageRecord | null) =>
  //     data ? '' : '点击下方按钮订阅服务，解锁更多功能'
  // }
];

export function OverviewCards() {
  const [recordDetail, setRecordDetail] = useState<UsageRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [clashLink, setClashLink] = useState('');

  useEffect(() => {
    service.getRecordDetail().then((data) => {
      setRecordDetail(data);
      setLoading(false);
      service.getSubscribeLink().then((link) => {
        setClashLink(link);
      });
    });
  }, []);
  const onClashSubscribe = () => {
    navigator.clipboard.writeText(clashLink);
    toast.success('已复制订阅链接');
  };

  if (loading) {
    return <OverviewSkeleton />;
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {CARDS_CONFIG.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {card.getValue(recordDetail)}
              </div>
              {card?.getSubValue && (
                <p className="text-xs text-muted-foreground">
                  {card.getSubValue(recordDetail)}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 grid gap-2">
        <Card>
          <CardHeader className="mb-4 flex flex-row items-center justify-between space-y-0 border-b ">
            <CardTitle className="text-sm ">快捷导入订阅</CardTitle>
          </CardHeader>
          <CardContent>
            {recordDetail ? (
              <div className="flex items-center gap-2">
                {/* <Button className="flex items-center gap-2" onClick={onClashSubscribe}>
              <Copy className="h-4" />
              通用订阅
            </Button> */}
                <Button
                  className="flex items-center gap-2"
                  onClick={onClashSubscribe}
                >
                  <Copy className="h-4" />
                  Clash订阅
                </Button>
              </div>
            ) : (
              <div className="flex">
                {' '}
                您还没有任何订阅，
                <Link
                  href="/dashboard/store"
                  className="flex items-center gap-2 text-primary"
                >
                  快购买一个试试吧！
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
