import { cn } from '@/lib/utils';

interface StatusTagProps {
  status: string;
}

export function StatusTag({ status }: StatusTagProps) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case '待支付':
        return 'bg-orange-50 text-orange-600 border-orange-100';
      case '已支付':
        return 'bg-green-50 text-green-600 border-green-100';
      case '退款中':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case '已退款':
        return 'bg-gray-50 text-gray-600 border-gray-100';
      case '订单关闭':
        return 'bg-red-50 text-red-600 border-red-100';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <span
      className={cn(
        'rounded-full border px-2.5 py-0.5 text-xs font-medium',
        getStatusStyle(status)
      )}
    >
      {status}
    </span>
  );
}
