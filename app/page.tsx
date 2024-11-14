'use client';

import Footer from '@/components/Footer';
import Header from '@/components/header';
import PlanCard from '@/components/planCard';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const bgSyle = {
  backgroundCcolor: '#FBDA61',
  backgroundImage: ' linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)'
};

const HomePage: React.FC = () => {
  const [period, setPeriod] = useState<'monthly' | 'quarterly' | 'annually'>(
    'monthly'
  ); // 存储当前选择的周期

  const plans = [
    {
      title: '基础套餐',
      basePrice: 10, // 月付基础价格
      features: ['功能1', '功能2', '功能3'],
      buttonText: '选择此套餐'
    },
    {
      title: '高级套餐',
      basePrice: 20,
      features: ['功能A', '功能B', '功能C'],
      buttonText: '选择此套餐',
      isPopular: true
    },
    {
      title: '专业套餐',
      basePrice: 30,
      features: ['功能X', '功能Y', '功能Z'],
      buttonText: '选择此套餐'
    }
  ];

  // 切换周期
  const handlePeriodChange = (
    newPeriod: 'monthly' | 'quarterly' | 'annually'
  ) => {
    setPeriod(newPeriod);
  };

  return (
    <div className="flex min-h-screen flex-col" style={bgSyle}>
      <Header />
      <div className="container mx-auto p-8">
        <div className="mb-6 text-center">
          <h2 className="mb-4 text-2xl font-semibold">套餐预览</h2>
          <div className="flex justify-center gap-4">
            <Button
              variant={period === 'monthly' ? 'secondary' : 'outline'}
              onClick={() => handlePeriodChange('monthly')}
            >
              月付
            </Button>
            <Button
              variant={period === 'quarterly' ? 'secondary' : 'outline'}
              onClick={() => handlePeriodChange('quarterly')}
            >
              季付
            </Button>
            <Button
              variant={period === 'annually' ? 'secondary' : 'outline'}
              onClick={() => handlePeriodChange('annually')}
            >
              年付
            </Button>
          </div>
        </div>

        <div className="flex justify-center gap-8">
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              title={plan.title}
              basePrice={plan.basePrice}
              features={plan.features}
              buttonText={plan.buttonText}
              period={period}
              isPopular={plan.isPopular}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
