'use client';
import PageContainer from '@/components/layout/page-container';
import { OverviewCards } from './_components/overview-cards';

export default function OverViewPage() {
  return (
    <PageContainer scrollable>
      <div className="space-y-8">
        <div className="flex items-center justify-between space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">欢迎回来👋 </h2>
        </div>

        <OverviewCards />

        {/* <QuickLinks /> */}
      </div>
    </PageContainer>
  );
}
