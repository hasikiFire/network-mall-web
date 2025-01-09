'use client';

import { useEffect, useState } from 'react';
import { PayOrderItem } from '@/interface/apiTypes/PayOrderItem';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { OrderStatus, PayOrder } from '@/interface/apiTypes/PayOrder';
import { DataTable } from '@/components/ui/table/data-table';
import service from './service';
import { cn } from '@/lib/utils';
import { StatusTag } from '@/components/status-tag';
import { toast } from 'sonner';

export default function OrdersPage() {
  const [orders, setOrders] = useState<PayOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<PayOrderItem | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    service.getOrderList().then((data) => {
      setOrders(data || []);
    });
  };

  const handleViewDetail = async (order: PayOrder) => {
    const detail = await service.getOrderDetail(order.orderCode);
    if (detail) {
      setSelectedOrder(detail);
      setOpen(true);
    }
  };

  const cancelOrder = async (order: PayOrder) => {
    const res = await service.cancelOrder(order.orderCode);
    if (res) {
      init();
      toast.success('取消订单成功');
    }
  };

  const payOrder = async (order: PayOrder) => {
    toast.info('支付订单功能暂未开放');
    // const res = await service.payOrder(order.orderCode);
    // if (res) {
    //   toast.success('支付订单成功');
    // }
  };

  const columns: ColumnDef<PayOrder>[] = [
    {
      accessorKey: 'orderCode',
      header: '订单号'
    },
    {
      accessorKey: '_packageUnit',
      header: '时长'
    },
    {
      accessorKey: 'orderAmount',
      header: '订单金额',
      cell: ({ row }) => <div className='text-orange-600 text-base font-bold'>{`￥${row.original.payAmount}`}</div> 
    },
    {
      accessorKey: '_orderStatus',
      header: '订单状态',
      cell: ({ row }) => <StatusTag status={row.original._orderStatus || ''} />
    },
    {
      accessorKey: 'createdAt',
      header: '创建时间'
    },
    {
      id: 'actions',
      header: '操作',
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="space-x-2">
            <Button size="sm" onClick={() => handleViewDetail(order)}>
              查看详情
            </Button>
            {order.orderStatus === OrderStatus.WaitPay && (
              <>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => payOrder(order)}
                >
                  支付订单
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => cancelOrder(order)}
                >
                  取消订单
                </Button>
              </>
            )}
          </div>
        );
      }
    }
  ];

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={orders}
        totalItems={orders.length}
        showPagination={false}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>订单详情</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium text-gray-600">订单号:</span>
                <span className="col-span-3">{selectedOrder.orderCode}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium text-gray-600">套餐名称:</span>
                <span className="col-span-3">{selectedOrder.packageName}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium text-gray-600">套餐描述:</span>
                <span className="col-span-3">{selectedOrder.packageDesc}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium text-gray-600">周期:</span>
                <span className="col-span-3">{selectedOrder._packageUnit}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium text-gray-600">总流量:</span>
                <span className="col-span-3">
                  {selectedOrder._dataAllowance || '无限制'}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium text-gray-600">设备限制:</span>
                <span className="col-span-3">
                  {selectedOrder.deviceLimit
                    ? `${selectedOrder.deviceLimit}个`
                    : '无限制'}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium text-gray-600">速度限制:</span>
                <span className="col-span-3">
                  {`${selectedOrder.speedLimit}MB/s` || '无限制'}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
