import PlanCard from '@/components/planCard';
import PlanQuestion from '@/components/planQuestion';

export default async function Index() {
  return (
    <div className="home-bg-primary flex  h-[calc(100vh-64px)] flex-col overflow-auto">
      <PlanCard></PlanCard>
      <PlanQuestion></PlanQuestion>
      {/* <Footer /> */}
    </div>
  );
}
