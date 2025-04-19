// components/user-table.tsx (客户端组件)
'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/table/data-table';
import { toast } from 'sonner';
import service from '../service';
import {
  PageRespDtoUserListRespDto,
  UserEditDto,
  UserListRespDto
} from '@/interface';
import { GetAdminUserGetListParams } from '@/api';
import { ColumnDef } from '@tanstack/react-table';
import { StatusTag } from '@/components/status-tag';
import { UserEditModal } from './user-edit-modal';
import { useDialog } from '@/components/dialog/dialog-provider';
import { useAlert } from '@/lib/dialog';

const statusMap: Record<number, string> = {
  0: '已禁用',
  1: '正常',
  2: '已删除'
};

const statusStylesConfig: Record<number, string> = {
  0: 'bg-red-50 text-red-600 border-red-100',
  1: 'bg-green-50 text-green-600 border-green-100',
  2: 'bg-gray-50 text-gray-600 border-gray-100'
};

interface UserTableProps {
  initialData?: PageRespDtoUserListRespDto;
}

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
export function ClientTable({ initialData }: UserTableProps) {
  // 客户端状态管理
  // 使用 ref 标记是否首次加载
  const initialLoad = useRef(true);
  const [data, setData] = useState(initialData);
  const [params, setParams] = useState<GetAdminUserGetListParams>({
    pageNum: 1,
    pageSize: 20
  });
  const [loading, setLoading] = useState(false);
  const [editUserData, setEditUserData] = useState<UserEditDto | undefined>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { confirm } = useAlert();
  // 客户端数据更新
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const newData = await service.getUserList(params);
      setData(newData);
    } catch (error) {
      toast.error('获取用户列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 分页参数变化时自动刷新
  useEffect(() => {
    if (initialLoad.current) return;
    fetchUsers();
    initialLoad.current = false;
  }, [params.pageNum, params.pageSize]);

  const handleDisable = async (userId: number) => {
    confirm({ title: '确认禁用该用户？' }).then(async (isConfirm) => {
      if (!isConfirm) return;
      try {
        await service.adminUserUpdate({ userId, status: 0 });
        toast.success('用户已禁用');
        fetchUsers();
      } catch (error) {
        toast.error('禁用用户失败');
      }
    });
  };

  const handleDelete = async (userId: number) => {
    confirm({ title: '确认禁用该用户？' }).then(async (isConfirm) => {
      if (!isConfirm) return;
      try {
        await service.adminUserUpdate({ userId, status: 2 });
        toast.success('用户已删除');
        fetchUsers();
      } catch (error) {
        toast.error('删除用户失败');
      }
    });
  };

  const handleSave = async (userData: UserEditDto) => {
    await service.adminUserUpdate({
      ...userData,
      userId: editUserData?.userId
    });
    toast.success('用户信息已更新');
    setIsEditModalOpen(false);
    fetchUsers();
  };

  // 分页控制
  const handlePaginationChange = (page: number, pageSize: number) => {
    setParams((prev) => ({
      ...prev,
      pageNum: page,
      pageSize
    }));
  };

  const handleEdit = (userData: UserListRespDto) => {
    setEditUserData(userData);
    setIsEditModalOpen(true);
  };

  const opOpenChange = (open: boolean) => {
    setIsEditModalOpen(open);
    if (!open) {
      setEditUserData(undefined);
    }
  };

  const columns: ColumnDef<UserListRespDto>[] = [
    {
      header: 'ID',
      accessorKey: 'userId'
    },
    {
      header: '名称',
      accessorKey: 'name'
    },
    {
      header: '状态',
      accessorKey: 'status',
      cell: ({ row }) => (
        <StatusTag
          className={statusStylesConfig[row.original.status]}
          text={statusMap[row.original.status]}
        />
      )
    },
    {
      header: '邮箱',
      accessorKey: 'email'
    },
    {
      header: '余额',
      accessorKey: 'balance',
      cell: ({ row }) =>
        row.original?.balance ? `¥${row.original?.balance.toFixed(2)}` : '¥0'
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
          {row.original.status === 1 && (
            <>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDisable(row.original.userId)}
              >
                禁用
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(row.original.userId)}
              >
                删除
              </Button>
            </>
          )}
        </div>
      )
    }
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={data?.list || []}
        totalItems={data?.total || 0}
        loading={loading}
      />
      <UserEditModal
        isOpen={isEditModalOpen}
        onOpenChange={opOpenChange}
        userData={editUserData}
        onSave={handleSave}
      />
    </>
  );
}
