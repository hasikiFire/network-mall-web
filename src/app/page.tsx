import Header from '@/components/header';
import PlanCard from '@/components/planCard';
const HomePage: React.FC = async () => {
  return (
    <div className="home-bg-primary flex min-h-screen flex-col">
      <Header />

      <PlanCard></PlanCard>
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
