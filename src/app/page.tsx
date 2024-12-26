import { getPackageGetList } from '@/api';
import Header from '@/components/header';
import PlanCard from '@/components/planCard';
import { IPlanItem } from '@/store/usePlanStore';

// 在页面组件中使用 getServerSideProps 获取数据并初始化 Zustand store
export async function getServerSideProps() {
  const res = await getPackageGetList({ fetchAll: true });
  const planList = res.data.list.map((item) => ({
    id: item.id,
    title: item.packageName,
    basePrice: item.salePrice,
    features: [item.packageDesc],
    ipLimit: item.deviceLimit,
    traffic: item.dataAllowance
  }));

  return {
    props: {
      planList: planList
    }
  };
}

const HomePage = ({ planList }: { planList: IPlanItem[] }) => {
  return (
    <div className="home-bg-primary flex min-h-screen flex-col">
      <Header />

      <PlanCard planList={planList}></PlanCard>
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
