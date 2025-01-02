import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import ProductViewPage from '../_components/product-view-page';

export const metadata = {
  title: 'Dashboard : Product View'
};

type PageProps = {
  params: Promise<{ productId: string }>;
};

export default async function Page({ params }: PageProps) {
  // Await the params promise
  const resolvedParams = await params;
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <ProductViewPage productId={resolvedParams.productId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
