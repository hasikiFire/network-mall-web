'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  UsageRecordListRespDto,
  UsageRecordListReqDto,
  PageRespDtoUsageRecordListRespDto,
  PurchaseStatus
} from '@/interface';
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
import service from '../service';
import { StatusTag } from '@/components/status-tag';
import { RefreshAndFilter } from './refresh-and-filter'; // 新增组件
import Loading from '@/components/loading';

const statusStylesConfig: Record<PurchaseStatus, string> = {
  0: 'bg-blue-50 text-blue-600 border-blue-100',
  1: 'bg-green-50 text-green-600 border-green-100',
  2: 'bg-orange-50 text-orange-600 border-orange-100',
  3: 'bg-gray-50 text-gray-600 border-gray-100',
  4: 'bg-red-50 text-red-600 border-red-100'
};

const columns: ColumnDef<UsageRecordListRespDto>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  // {
  //   accessorKey: 'orderCode',
  //   header: '订单号'
  // },
  {
    accessorKey: 'userName',
    header: '用户名称'
  },
  {
    accessorKey: '_purchaseStatus',
    header: '套餐状态',
    cell: ({ row }) => (
      <StatusTag
        className={
          statusStylesConfig[row.original.purchaseStatus as PurchaseStatus]
        }
        text={row.original._purchaseStatus}
      />
    )
  },
  {
    accessorKey: 'purchaseStartTime',
    header: '开始日期'
  },
  {
    accessorKey: 'purchaseEndTime',
    header: '结束日期'
  },
  {
    accessorKey: 'nextResetDate',
    header: '流量重置日期'
  },
  {
    accessorKey: 'consumedDataTransfer',
    header: '已用流量(GB)',
    cell: ({ row }) => {
      const value = row.getValue('consumedDataTransfer');
      return value ? `${value}` : '-';
    }
  },
  {
    accessorKey: 'dataAllowance',
    header: '流量限额(GB) ',
    cell: ({ row }) => {
      const value = row.getValue('dataAllowance');
      return value ? `${value}` : '-';
    }
  },
  {
    accessorKey: 'updatedAt',
    header: '最后更新时间 '
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
            <Link href={`/usage-records/${record.id}`}>
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
export function ClientTable({
  initialData
}: {
  initialData?: PageRespDtoUsageRecordListRespDto;
}) {
  const initialLoad = useRef(true);
  const [data, setData] = useState<
    PageRespDtoUsageRecordListRespDto | undefined
  >(initialData);
  const [params, setParams] = useState<UsageRecordListReqDto>({
    pageNum: 1,
    pageSize: 20
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialLoad.current) return;
    getUsageRecord();
    initialLoad.current = false;
  }, [params]);

  const getUsageRecord = async () => {
    try {
      setIsLoading(true);
      const data = await service.getAllUsageRecordList(params);
      setData(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    getUsageRecord();
  };

  const handleFilterChange = (filterValues: any) => {
    setParams({ ...params, ...filterValues });
  };

  if (!data || !data.list?.length) {
    return <Loading />;
  }

  return (
    <>
      <RefreshAndFilter
        onRefresh={handleRefresh}
        onFilterChange={handleFilterChange}
      />
      <DataTable
        columns={columns}
        data={data.list ?? []}
        totalItems={0}
        loading={isLoading}
      />
    </>
  );
}
