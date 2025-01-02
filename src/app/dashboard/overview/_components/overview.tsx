// import { BarGraph } from './bar-graph';
import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Timer, Network, Laptop2, Wallet } from 'lucide-react';

export default function OverViewPage() {
  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">欢迎回来 👋</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">剩余时长</CardTitle>
              <Timer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">30天</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">剩余流量</CardTitle>
              <Network className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15.5GB</div>
              <p className="text-xs text-muted-foreground">今日已用2GB</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">在线设备数</CardTitle>
              <Laptop2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 / 10</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">钱包余额</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">¥ 0</div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-4 grid gap-2  ">
          <Card>
            <CardHeader className="mb-4 flex flex-row items-center justify-between space-y-0  border-b  pb-2">
              <CardTitle className="text-sm font-bold">快捷导入订阅</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Button className="flex items-center gap-2">
                  <Copy className="h-4  " />
                  通用订阅
                </Button>
                <Button className="flex items-center gap-2">
                  <Copy className="h-4  " />
                  Clash订阅
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* <BarGraph /> */}
      </div>
    </PageContainer>
  );
}
