'use client';
import { useState } from 'react';
import { Button } from './ui/button';

interface PlanCardProps {
  title: string;
  basePrice: number; // 这里是月付基础价格
  features: string[];
  buttonText: string;
  period: string; // 用来显示当前选择的周期
  isPopular?: boolean;
  isLast: boolean;
}
const planCard: React.FC = () => {
  const list = [
    {
      title: '基础套餐',
      basePrice: 10, // 月付基础价格
      features: ['功能1', '功能2', '功能3'],
      buttonText: '购买'
    },
    {
      title: '高级套餐',
      basePrice: 20,
      features: ['功能A', '功能B', '功能C'],
      buttonText: '购买',
      isPopular: true
    },
    {
      title: '专业套餐',
      basePrice: 30,
      features: ['功能X', '功能Y', '功能Z'],
      buttonText: '购买'
    }
  ];

  const [period, setPeriod] = useState<'monthly' | 'quarterly' | 'annually'>(
    'monthly'
  ); // 存储当前选择的周期

  // 切换周期
  const handlePeriodChange = (
    newPeriod: 'monthly' | 'quarterly' | 'annually'
  ) => {
    setPeriod(newPeriod);
  };

  return (
    <div className={`container mx-auto pt-24 `}>
      <div className="mb-6 text-center">
        <h2 className="mb-4 text-4xl text-red-900 ">套餐预览</h2>
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
        {list.map((plan, index) => (
          <PlanCardItem
            key={index}
            title={plan.title}
            basePrice={plan.basePrice}
            features={plan.features}
            buttonText={plan.buttonText}
            period={period}
            isPopular={plan.isPopular}
            isLast={index === list.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
const PlanCardItem: React.FC<PlanCardProps> = ({
  title,
  basePrice,
  features,
  buttonText,
  period,
  isPopular = false,
  isLast
}) => {
  console.log('isLast: ', isLast);
  // 计算根据周期调整的价格
  const adjustedPrice =
    period === 'annually'
      ? basePrice * 12
      : period === 'quarterly'
      ? basePrice * 3
      : basePrice;

  return (
    <div
      className={`relative flex  w-full min-w-60  max-w-xs flex-col rounded-xl bg-white p-6 pb-20   shadow-lg transition-shadow duration-300 hover:shadow-xl ${
        isLast ? 'btn-primary text-white' : 'text-red-900'
      }`}
    >
      {isPopular && (
        <span className="mb-2 block text-sm font-semibold  ">🌟 推荐</span>
      )}
      <h3 className="mb-4 text-lg font-semibold  ">{title}</h3>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold  ">${adjustedPrice}</span>
        <span className="ml-1 text-sm  ">
          /
          {period === 'annually'
            ? '年付'
            : period === 'quarterly'
            ? '季付'
            : '月付'}
        </span>
      </div>
      <ul className="my-4 space-y-2 text-sm  ">
        {features.map((feature, index) => (
          <li key={index} className={`flex items-center space-x-2  `}>
            <svg
              className="h-4 w-4"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4261"
              width="200"
              height="200"
            >
              <path
                d="M512 1024C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512 512-229.248 512-512 512z m-114.176-310.954667a53.333333 53.333333 0 0 0 75.434667 0l323.328-323.328a53.333333 53.333333 0 1 0-75.434667-75.434666l-287.914667 283.306666-128.853333-128.853333a53.333333 53.333333 0 1 0-75.434667 75.434667l168.874667 168.874666z"
                fill="#DD5A86"
                p-id="4262"
                data-spm-anchor-id="a313x.search_index.0.i0.79613a81OakjEJ"
              ></path>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div
        className="absolute bottom-6    flex-grow  justify-center     "
        style={{ width: 'calc(100% - 48px)' }}
      >
        <Button
          variant="outline"
          className={` w-full  rounded-3xl   text-xl font-bold  text-white ${
            isLast ? 'bg-white text-[#F67F82] ' : 'btn-primary'
          } `}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default planCard;
