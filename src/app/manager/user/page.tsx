import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Space } from 'lucide-react';
import { DataTable } from '@/components/ui/table/data-table';
import { toast } from 'sonner';
import service from './service';
import { PageRespDtoUserListRespDto, UserListRespDto } from '@/interface';
import { GetAdminUserGetListParams } from '@/api';
import { ColumnDef } from '@tanstack/react-table';
import { StatusTag } from '@/components/status-tag';
const statusStylesConfig: Record<PurchaseStatus, string> = {
  0: 'bg-blue-50 text-blue-600 border-blue-100',
  1: 'bg-green-50 text-green-600 border-green-100',
  2: 'bg-orange-50 text-orange-600 border-orange-100',
  3: 'bg-gray-50 text-gray-600 border-gray-100',
  4: 'bg-red-50 text-red-600 border-red-100'
};
export default function Index() {
  const [data, setData] = useState<PageRespDtoUserListRespDto>();
  const [params, setParams] = useState<GetAdminUserGetListParams>({
    pageNum: 1,
    pageSize: 20
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await service.getUserList(params);
      setData(data);
    } catch (error) {
      toast.error('获取用户列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleDisable = async (userId: number) => {
    try {
      await service.adminUserUpdate({ userId, status: 0 });
      toast.success('用户已禁用');
      fetchUsers();
    } catch (error) {
      toast.error('禁用用户失败');
    }
  };

  const handleDelete = async (userId: number) => {
    try {
      await service.adminUserUpdate({ userId, status: 2 });
      toast.success('用户已删除');
      fetchUsers();
    } catch (error) {
      toast.error('删除用户失败');
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
          // @ts-ignore
          className={statusStylesConfig[row.original.status]}
          text={row.original._status}
        />
      )
    },
    {
      header: '邮箱',
      accessorKey: 'email'
    },
    {
      header: '余额',
      accessorKey: 'balance'
    },

    {
      id: 'actions',
      header: '操作',
      cell: ({ row }) => (
        <Space size="middle">
          <Button onClick={() => handleDisable(row.original?.userId!)}>
            禁用
          </Button>
          <Button onClick={() => handleDelete(row.original.userId)}>
            删除
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">使用记录</h1>
      </div>
      <DataTable
        columns={columns}
        data={data?.list ?? []}
        totalItems={0}
        loading={loading}
      />
    </div>
  );
}
