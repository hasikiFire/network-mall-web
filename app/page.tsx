import { auth } from '@/auth';
import Footer from '@/components/Footer';
import Header from '@/components/header';
import PlanCard from '@/components/planCard';
import { redirect } from 'next/navigation';
const HomePage: React.FC = async () => {
  // const session = await auth();
  // if (session?.user) {
  //   return redirect('/dashboard/overview');
  // }

  return (
    <div className="home-bg-primary flex min-h-screen flex-col">
      <Header />

      <PlanCard></PlanCard>
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
