'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  PayOrder,
  OrderStatus,
  PayWay,
  PayScene,
  PayStatus,
  RefundStatus,
  DeletedStatus,
  OrderStatusChinese,
  PayStatusChinese,
  RefundStatusChinese
} from '@/interface/apiTypes/PayOrder';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem
} from '@radix-ui/react-dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { DataTable } from '@/components/ui/table/data-table';
import service from './service';
import { StatusTag } from '@/components/status-tag';
// import { RefreshAndFilter } from './refresh-and-filter';
import Loading from '@/components/loading';
import { PageRespDtoPayOrder } from '@/interface';

const statusStylesConfig: Record<
  OrderStatus | PayStatus | RefundStatus | DeletedStatus,
  string
> = {
  [OrderStatus.WaitPay]: 'bg-blue-50 text-blue-600 border-blue-100',
  [OrderStatus.Paid]: 'bg-green-50 text-green-600 border-green-100',
  [OrderStatus.Refunding]: 'bg-orange-50 text-orange-600 border-orange-100',
  [OrderStatus.Refunded]: 'bg-gray-50 text-gray-600 border-gray-100',
  [OrderStatus.Closed]: 'bg-red-50 text-red-600 border-red-100',
  [OrderStatus.Canceled]: 'bg-gray-50 text-gray-600 border-gray-100',
  [OrderStatus.COMPLETE]: 'bg-green-50 text-green-600 border-green-100',
  [PayStatus.Waiting]: 'bg-blue-50 text-blue-600 border-blue-100',
  [PayStatus.Success]: 'bg-green-50 text-green-600 border-green-100',
  [PayStatus.Failed]: 'bg-red-50 text-red-600 border-red-100',
  [RefundStatus.Refunding]: 'bg-orange-50 text-orange-600 border-orange-100',
  [RefundStatus.PartRefunded]: 'bg-gray-50 text-gray-600 border-gray-100',
  [RefundStatus.AllRefunded]: 'bg-green-50 text-green-600 border-green-100',
  [RefundStatus.Rejected]: 'bg-red-50 text-red-600 border-red-100',
  [DeletedStatus.NotDeleted]: 'bg-green-50 text-green-600 border-green-100',
  [DeletedStatus.Deleted]: 'bg-red-50 text-red-600 border-red-100'
};

const columns: ColumnDef<PayOrder>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'orderCode',
    header: '订单号'
  },
  {
    accessorKey: 'userId',
    header: '用户ID'
  },
  {
    accessorKey: 'orderAmount',
    header: '订单金额'
  },
  {
    accessorKey: 'payAmount',
    header: '支付金额'
  },
  {
    accessorKey: 'orderStatus',
    header: '订单状态',
    cell: ({ row }) => (
      <StatusTag
        className={statusStylesConfig[row.original.orderStatus]}
        text={OrderStatusChinese[row.original.orderStatus]}
      />
    )
  },
  {
    accessorKey: 'payStatus',
    header: '支付状态',
    cell: ({ row }) => (
      <StatusTag
        className={statusStylesConfig[row.original.payStatus]}
        text={PayStatusChinese[row.original.payStatus]}
      />
    )
  },
  {
    accessorKey: 'refundStatus',
    header: '退款状态',
    cell: ({ row }) => (
      <StatusTag
        className={statusStylesConfig[row.original.refundStatus]}
        text={RefundStatusChinese[row.original.refundStatus]}
      />
    )
  },
  {
    accessorKey: 'createdAt',
    header: '创建时间'
  },
  {
    id: 'actions',
    header: '操作',
    cell: ({ row }) => {
      const record = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">打开菜单</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>操作</DropdownMenuLabel>
            <Link href={`/orders/${record.id}`}>
              <DropdownMenuItem>编辑</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>删除</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export function ClientTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-12 animate-pulse rounded bg-gray-100" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-10 animate-pulse rounded bg-gray-50" />
      ))}
    </div>
  );
}

export default function ClientTable() {
  const [data, setData] = useState<PageRespDtoPayOrder | undefined>();
  const [params, setParams] = useState<any>({
    pageNum: 1,
    pageSize: 20
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getOrders();
  }, [params]);

  const getOrders = async () => {
    try {
      setIsLoading(true);
      const data = await service.getAllOrders(params);
      setData(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    getOrders();
  };

  const handleFilterChange = (filterValues: any) => {
    setParams({ ...params, ...filterValues });
  };

  if (!data || !data.list?.length) {
    return <Loading />;
  }

  return (
    <>
      {/* <RefreshAndFilter
        onRefresh={handleRefresh}
        onFilterChange={handleFilterChange}
      /> */}
      <DataTable
        columns={columns}
        data={data.list ?? []}
        totalItems={0}
        loading={isLoading}
      />
    </>
  );
}
