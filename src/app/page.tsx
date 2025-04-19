import { Suspense } from 'react';
import Header from '@/components/header';
import PlanCard from '@/components/planCard';
import Loading from '@/components/loading';
import { fetchPlanList } from '@/api/server';

export default async function HomePage() {
  const planList = await fetchPlanList();

  return (
    <div className="home-bg-primary flex min-h-screen flex-col">
      <Header />
      <Suspense fallback={<Loading />}>
        <PlanCard planList={planList} home />
      </Suspense>
    </div>
  );
}
