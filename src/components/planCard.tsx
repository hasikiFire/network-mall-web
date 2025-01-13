'use client';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { IPlanItem, periodOptions, usePlanStore } from '@/store/usePlanStore';
import Decimal from 'decimal.js';
import { fetchPlanList } from '@/api/server';

interface PlanCardItemProps {
  plan: IPlanItem;
  isLast?: boolean;
  home?: boolean;
  period: string;
}

interface PlanCardProps {
  planList?: IPlanItem[];
  home?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({
  planList: initialPlanList,
  home = false
}) => {
  const { planList } = usePlanStore();
  // 如果持久化统一要这种 usePlanStore.getState().planList;

  useEffect(() => {
    init();
  }, [initialPlanList]);

  const init = async () => {
    if (initialPlanList?.length) {
      usePlanStore.getState().initializePlanList(initialPlanList);
    } else if (planList?.length === 0) {
      const planList = await fetchPlanList();
      usePlanStore.getState().initializePlanList(planList);
    }
  };

  const [period, setPeriod] = useState<'1' | '3' | '12'>('1'); // 存储当前选择的周期

  // 切换周期
  const handlePeriodChange = (newPeriod: '1' | '3' | '12') => {
    setPeriod(newPeriod);
  };

  return (
    <div className={`container mx-auto pt-16 `}>
      <div className="mb-6 text-center">
        <h2 className="mb-6 text-5xl tracking-widest  text-[#461A29]">
          套餐预览
        </h2>
        <div className="flex justify-center gap-4">
          <ToggleGroup
            className="header-bg rounded-3xl"
            size={'lg'}
            type="single"
            onValueChange={handlePeriodChange}
            value={period}
          >
            {periodOptions.map((v) => (
              <ToggleGroupItem
                key={v.value}
                value={v.value}
                className={`rounded-3xl  px-8 font-bold ${
                  period === v.value
                    ? 'btn-bg-primary  !text-white '
                    : 'text-gray-400'
                }`}
              >
                {v.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
      <div className="flex justify-center gap-8">
        {planList?.map((plan, index) => (
          <PlanCardItem
            key={index}
            period={period}
            plan={plan}
            // isLast={index === initialPlanList.length - 1}
            home={home}
          />
        ))}
      </div>
    </div>
  );
};
const PlanCardItem: React.FC<PlanCardItemProps> = ({
  plan,
  isLast,
  period
}) => {
  const { title, basePrice, features, ipLimit, traffic, speedLimit } = plan;
  const adjustedPrice = new Decimal(basePrice)
    .times(period === '12' ? 12 : period === '3' ? 3 : 1)
    .toNumber();
  const adjustedDate = period === '12' ? 365 : period === '3' ? 90 : 30;
  const router = useRouter();

  const isLogin = useAuthStore((state) => state.isLogin);
  const onBuy = () => {
    if (!isLogin) {
      router.push('/login');
      return;
    }
    router.push(`/dashboard/order?id=${plan.id}&period=${period}`);
  };

  return (
    <div
      className={`relative flex  min-h-96 w-full min-w-60  max-w-xs flex-col rounded-3xl 
        bg-white p-6 pb-20   shadow-md transition-shadow duration-300 hover:shadow-xl  ${
          isLast ? 'btn-bg-primary text-white' : 'text-[#461A29]'
        }`}
    >
      {/* {isPopular && (
        <span className="mb-2 block text-sm font-black  ">🌟 推荐</span>
      )} */}
      <div className="mb-4 flex items-center  ">
        <span className="  mr-2 ">
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="13731"
            className={`h-8 w-8 rounded-md   rounded-md px-2 py-2 ${
              isLast ? 'bg-white' : 'bg-[#DD5A86]'
            }`}
          >
            {isLast ? (
              <path
                d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3-12.3 12.7-12.1 32.9 0.6 45.3l183.7 179.1-43.4 252.9c-1.2 6.9-0.1 14.1 3.2 20.3 8.2 15.6 27.6 21.7 43.2 13.4L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"
                p-id="13732"
                fill="#DD5A86"
              ></path>
            ) : (
              <path
                d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3-12.3 12.7-12.1 32.9 0.6 45.3l183.7 179.1-43.4 252.9c-1.2 6.9-0.1 14.1 3.2 20.3 8.2 15.6 27.6 21.7 43.2 13.4L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"
                p-id="13732"
                fill="#ffffff"
              ></path>
            )}
          </svg>
        </span>
        <h3 className=" text-lg font-semibold  ">{title}</h3>{' '}
      </div>
      <div className="flex items-baseline border-b pb-4">
        <span className="text-xl font-bold">￥</span>
        <span className="text-6xl font-bold">{adjustedPrice}</span>
        <span className="ml-1 ">
          /{period === '12' ? '年' : period === '3' ? '季' : '月'}
        </span>
      </div>
      {/* #f35d97 */}
      <ul className="my-4 space-y-4 text-sm  ">
        <li className="flex items-center space-x-2">
          <CheckIcon isLast={isLast} />
          <span>{`可用流量：${traffic} GB`}</span>
        </li>
        <li className="flex items-center space-x-2">
          <CheckIcon isLast={isLast} />
          <span>{`套餐时长：${adjustedDate} 天`}</span>
        </li>
        <li className="flex items-center space-x-2">
          <CheckIcon isLast={isLast} />
          <span>{`速率限制：${
            speedLimit ? `${speedLimit} MB/s` : '无限制'
          }`}</span>
        </li>
        <li className="flex items-center space-x-2">
          <CheckIcon isLast={isLast} />
          <span>{`在线IP：${ipLimit ? `${ipLimit}个` : '无限制'}`}</span>
        </li>
        <li className="flex items-center space-x-2">
          <CheckIcon isLast={isLast} />
          <span>{`可用节点：${ipLimit ? `${ipLimit}个` : '1 个'}`}</span>
        </li>
        {features.map((feature, index) => (
          <li key={index} className={`flex items-center space-x-2  `}>
            <CheckIcon isLast={isLast} />
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
          className={` w-full  rounded-3xl  py-6 text-lg font-bold  text-white hover:text-white ${
            isLast ? 'bg-white text-[#F67F82] ' : 'btn-bg-primary'
          } `}
          onClick={onBuy}
        >
          购买
        </Button>
      </div>
    </div>
  );
};

const CheckIcon = ({ isLast }: { isLast?: boolean }) => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M512 1024C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512 512-229.248 512-512 512z m-114.176-310.954667a53.333333 53.333333 0 0 0 75.434667 0l323.328-323.328a53.333333 53.333333 0 1 0-75.434667-75.434666l-287.914667 283.306666-128.853333-128.853333a53.333333 53.333333 0 1 0-75.434667 75.434667l168.874667 168.874666z"
      fill={isLast ? '#fff' : '#DD5A86'}
    />
  </svg>
);

export default PlanCard;
