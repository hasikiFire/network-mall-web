'use client';

import Footer from '@/components/Footer';
import Header from '@/components/header';
import PlanCard from '@/components/planCard';
const HomePage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-primary">
      <Header />

      <PlanCard></PlanCard>
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
