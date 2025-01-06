import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import service from './service';
import { toast } from 'sonner';

export function QuickLinks() {
  const onClashSubscribe = () => {
    service.getSubscribeLink().then((link) => {
      navigator.clipboard.writeText(link);
      toast.success('已复制订阅链接');
    });
  };

  return (
    <div className="mt-4 grid gap-2">
      <Card>
        <CardHeader className="mb-4 flex flex-row items-center justify-between space-y-0 border-b pb-2">
          <CardTitle className="text-sm font-bold">快捷导入订阅</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {/* <Button className="flex items-center gap-2" onClick={onClashSubscribe}>
              <Copy className="h-4" />
              通用订阅
            </Button> */}
            <Button
              className="flex items-center gap-2"
              onClick={onClashSubscribe}
            >
              <Copy className="h-4" />
              Clash订阅
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
