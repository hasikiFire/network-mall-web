// app/page.tsx (服务端组件)
import service from './service';
import { ClientTable, ClientTableSkeleton } from './_components/client-table';
import { Suspense } from 'react';
export default function Page() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">使用记录管理</h1>
      </div>

      <Suspense fallback={<ClientTableSkeleton />}>
        <AsyncClientTable />
      </Suspense>
    </div>
  );
}

// 异步数据加载组件
async function AsyncClientTable() {
  const initialData = await service.getAllUsageRecordList({
    pageNum: 1,
    pageSize: 20
  });

  return <ClientTable initialData={initialData} />;
}
