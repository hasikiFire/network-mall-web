'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  PackageListRespDto,
  PackageListReqDto,
  PageRespDtoPackageListRespDto
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
import { useState, useEffect, useRef, Suspense } from 'react';
import { DataTable } from '@/components/ui/table/data-table';
import service from './service';
import { StatusTag } from '@/components/status-tag';
import { RefreshAndFilter } from './_components/refresh-and-filter';
import Loading from '@/components/loading';
import { ClientTableSkeleton } from '../usageRecord/_components/client-table';
import { useAlert } from '@/lib/dialog';
import { PackageEditModal } from './_components/package-edit-modal';
import { toast } from 'sonner';

export function PackageTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-12 animate-pulse rounded bg-gray-100" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-10 animate-pulse rounded bg-gray-50" />
      ))}
    </div>
  );
}

export default function PackageTable() {
  const [data, setData] = useState<PageRespDtoPackageListRespDto | undefined>();
  const [params, setParams] = useState<PackageListReqDto>({
    pageNum: 1,
    pageSize: 20
  });
  const [isLoading, setIsLoading] = useState(false);
  const [editData, setEditData] = useState<PackageListRespDto>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { confirm } = useAlert();

  useEffect(() => {
    fetchList();
  }, [params]);

  const fetchList = async () => {
    try {
      setIsLoading(true);
      const data = await service.getPacakgeGetlist(params);
      setData(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchList();
  };

  const handleFilterChange = (filterValues: any) => {
    setParams({ ...params, ...filterValues });
  };
  const handleEdit = (data: PackageListRespDto) => {
    setEditData(data);
    setIsEditModalOpen(true);
  };
  const handleSave = async (data: PackageListRespDto) => {
    await service.adminPacakgeEdit({
      ...data,
      id: editData?.id || 0
    });
    toast.success('编辑成功');
    setIsEditModalOpen(false);
    fetchList();
  };

  const handleDisable = async (id: number) => {
    // TODO
  };

  const opOpenChange = (open: boolean) => {
    setIsEditModalOpen(open);
    if (!open) {
      setEditData(undefined);
    }
  };

  if (!data || !data.list?.length) {
    return <Loading />;
  }

  const columns: ColumnDef<PackageListRespDto>[] = [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'packageName',
      header: '套餐名称'
    },
    {
      accessorKey: 'packageDesc',
      header: '套餐描述'
    },
    {
      accessorKey: 'salePrice',
      header: '价格',
      cell: ({ row }) => {
        const value = row.getValue('salePrice') || 0;
        return <span className="text-lg text-orange-600">￥{`${value}`} </span>;
      }
    },
    {
      accessorKey: 'dataAllowance',
      header: '流量限额(GB)',
      cell: ({ row }) => {
        const value = row.getValue('dataAllowance');
        return value ? `${value}` : '-';
      }
    },
    {
      accessorKey: 'speedLimit',
      header: '速率限制',
      cell: ({ row }) => {
        const value = row.getValue('speedLimit');
        return value ? `${value}MB/s` : '无限制';
      }
    },
    {
      accessorKey: 'deviceLimit',
      header: '设备限制',
      cell: ({ row }) => {
        const value = row.getValue('deviceLimit');
        return value ? `${value}` : '无限制';
      }
    },
    {
      accessorKey: 'status',
      header: '状态',
      cell: ({ row }) => (
        <StatusTag
          className={
            row.original.packageStatus === 1
              ? 'border-green-100 bg-green-50 text-green-600'
              : 'border-red-100 bg-red-50 text-red-600'
          }
          text={row.original.packageStatus === 1 ? '启用' : '禁用'}
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
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => handleEdit(row.original)}
          >
            编辑
          </Button>
          {/* {row.original.packageStatus === 1 && (
            <>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDisable(row.original.id)}
              >
                禁用
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDisable(row.original.id)}
              >
                删除
              </Button>
            </>
          )} */}
        </div>
      )
    }
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">套餐管理</h1>
      </div>
      <Suspense fallback={<ClientTableSkeleton />}>
        <DataTable
          columns={columns}
          data={data.list ?? []}
          totalItems={0}
          loading={isLoading}
        />
      </Suspense>{' '}
      <PackageEditModal
        isOpen={isEditModalOpen}
        onOpenChange={opOpenChange}
        editData={editData}
        onSave={handleSave}
      />
    </div>
  );
}
