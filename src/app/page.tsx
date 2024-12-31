import Header from '@/components/header';
import PlanCard from '@/components/planCard';
import { IPlanItem, usePlanStore } from '@/store/usePlanStore';
import { serverFetch } from '@/lib/serverFetch';

async function fetchPlanList(): Promise<IPlanItem[]> {
  try {
    const data = await serverFetch<any>('/package/getList?fetchAll=true');

    if (!data?.data?.list || !Array.isArray(data.data.list)) {
      console.error('no plan list found');
      return [];
    }

    return data.data.list.map((item: any) => ({
      id: item.id,
      title: item.packageName,
      basePrice: item.salePrice,
      features: [item.packageDesc],
      ipLimit: item.deviceLimit,
      traffic: item.dataAllowance
    }));
  } catch (error) {
    console.error('Error fetching plan list:', error);
    return [];
  }
}

export default async function HomePage() {
  const planList = await fetchPlanList();

  return (
    <div className="home-bg-primary flex min-h-screen flex-col">
      <Header />
      <PlanCard planList={planList} />
    </div>
  );
}
