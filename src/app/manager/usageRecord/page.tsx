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
import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/table/data-table';
import service from './service';
import { StatusTag } from '@/components/status-tag';

export const statusStylesConfig: Record<PurchaseStatus, string> = {
  0: 'bg-blue-50 text-blue-600 border-blue-100',
  1: 'bg-green-50 text-green-600 border-green-100',
  2: 'bg-orange-50 text-orange-600 border-orange-100',
  3: 'bg-gray-50 text-gray-600 border-gray-100',
  4: 'bg-red-50 text-red-600 border-red-100'
};
export const columns: ColumnDef<UsageRecordListRespDto>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'orderCode',
    header: '订单号'
  },
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
export default function UsageRecordsPage() {
  const [data, setData] = useState<PageRespDtoUsageRecordListRespDto>();

  const [params, setParams] = useState<UsageRecordListReqDto>({
    pageNum: 1,
    pageSize: 10
  });

  useEffect(() => {
    getUsageRecord();
  }, [params]);
  const getUsageRecord = async () => {
    const data = await service.getAllUsageRecordList(params);
    setData(data);
  };

  // const handleSubmit = async (values: UsageRecordEditReqDto) => {
  //   try {
  //     setParams({ ...params, ...values });
  //     router.push('/usage-records');
  //   } catch (error) {
  //     console.error('Failed to update record:', error);
  //   }
  // };

  if (!data || !data.list?.length) return <div>Loading...</div>;
  return (
    <div className="container mx-auto py-10">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">使用记录</h1>
      </div>
      <DataTable columns={columns} data={data.list ?? []} totalItems={0} />
    </div>
  );
}
