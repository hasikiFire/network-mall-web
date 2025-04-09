'use client';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useEffect, useState } from 'react';

interface RefreshAndFilterProps {
  onRefresh: () => void;
  onFilterChange: (filterValues: any) => void;
}

export const RefreshAndFilter = ({
  onRefresh,
  onFilterChange
}: RefreshAndFilterProps) => {
  const [refreshInterval, setRefreshInterval] = useState<number | null>(null);

  useEffect(() => {
    if (refreshInterval && onRefresh) {
      const interval = setInterval(() => {
        onRefresh();
      }, refreshInterval * 1000);

      return () => clearInterval(interval);
    }
  }, [refreshInterval, onRefresh]);

  const handleFilterChange = (filterValues: any) => {
    onFilterChange(filterValues);
  };

  return (
    <div className="flex justify-end">
      <Button variant="outline" onClick={onRefresh}>
        刷新
      </Button>
      <Select
        value={refreshInterval ? `${refreshInterval}` : '0'}
        onValueChange={(value) => setRefreshInterval(Number(value))}
      >
        <SelectTrigger className="ml-2 h-8 w-[100px]">
          <SelectValue placeholder="自动刷新" />
        </SelectTrigger>
        <SelectContent side="top">
          <SelectItem value="0">关闭</SelectItem>
          <SelectItem value="5">5s</SelectItem>
          <SelectItem value="10">10s</SelectItem>
          <SelectItem value="30">30s</SelectItem>
          <SelectItem value="60">60s</SelectItem>
        </SelectContent>
      </Select>
      {/* 这里可以添加更多的筛选条件 */}
    </div>
  );
};
