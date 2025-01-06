'use client';
import { Suspense } from 'react';
import PageContainer from '@/components/layout/page-container';
import { OverviewSkeleton } from '@/components/skeletons/overview-skeleton';
import { OverviewCards } from './_components/overview-cards';
import { QuickLinks } from './_components/quick-links';

export default function OverViewPage() {
  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">欢迎回来 👋</h2>
        </div>

        <OverviewCards />

        <QuickLinks />
      </div>
    </PageContainer>
  );
}
