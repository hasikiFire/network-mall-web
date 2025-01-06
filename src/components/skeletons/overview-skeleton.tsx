import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Timer, Network, Laptop2, Wallet } from 'lucide-react';

export function OverviewSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[
        { title: '剩余时长', icon: Timer },
        { title: '剩余流量', icon: Network },
        { title: '在线设备数', icon: Laptop2 },
        { title: '钱包余额', icon: Wallet }
      ].map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
            {index === 1 && (
              <div className="mt-2 h-4 w-16 animate-pulse rounded-md bg-muted" />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
