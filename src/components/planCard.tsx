'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

interface PlanCardItemProps {
  plan: IPlanItem;
  isLast: boolean;
  home?: boolean;
  period: string;
}
export interface IPlanItem {
  id: number;
  title: string;
  basePrice: number; // 这里是月付基础价格
  features: string[];
  isPopular?: boolean;
}
const planCard: React.FC = ({ home = false }: { home?: boolean }) => {
  const periodOptions = [
    {
      value: 'monthly',
      label: '月付'
    },
    {
      value: 'quarterly',
      label: '季付'
    },
    {
      value: 'annually',
      label: '年付'
    }
  ];
  const list: IPlanItem[] = [
    {
      id: 1,
      title: '基础套餐',
      basePrice: 10, // 月付基础价格
      features: [
        '可用流量：200 G/月',
        '套餐时长：90 天',
        '在线IP：3 个',
        '在线连接数：300',
        '峰值带宽：200 Mbps',
        '可用节点：15 个',
        '网络稳定指数：⭐️',
        '有限售后技术支持',
        '支持流媒体解锁，但不承诺高可用性',
        '仅限账户本人使用，不支持团队使用'
      ]
    },
    {
      id: 2,
      title: '高级套餐',
      basePrice: 20,
      features: [
        '可用流量：200 G/月',
        '套餐时长：90 天',
        '在线IP：3 个',
        '在线连接数：300',
        '峰值带宽：200 Mbps',
        '可用节点：15 个',
        '网络稳定指数：⭐️',
        '有限售后技术支持',
        '支持流媒体解锁，但不承诺高可用性',
        '仅限账户本人使用，不支持团队使用'
      ],

      isPopular: true
    },
    {
      id: 3,
      title: '专业套餐',
      basePrice: 30,
      features: [
        '可用流量：200 G/月',
        '套餐时长：90 天',
        '在线IP：3 个',
        '在线连接数：300',
        '峰值带宽：200 Mbps',
        '可用节点：15 个',
        '网络稳定指数：⭐️',
        '有限售后技术支持',
        '支持流媒体解锁，但不承诺高可用性',
        '仅限账户本人使用，不支持团队使用'
      ]
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
        {list.map((plan, index) => (
          <PlanCardItem
            key={index}
            period={period}
            plan={plan}
            isLast={index === list.length - 1}
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
  const { title, basePrice, features } = plan;
  // 计算根据周期调整的价格
  const adjustedPrice =
    period === 'annually'
      ? basePrice * 12
      : period === 'quarterly'
      ? basePrice * 3
      : basePrice;

  const router = useRouter();

  const isLogin = useAuthStore((state) => state.isLogin);
  const onBuy = () => {
    if (!isLogin) {
      router.push('/login');
      return;
    }
    router.push(`/dashboard/order?id=${plan.id}`);
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
      <span className="mb-2 ">
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
      <h3 className="mb-4 text-lg font-semibold  ">{title}</h3>
      <div className="flex items-baseline border-b pb-4">
        <span className="text-6xl font-bold  ">￥{adjustedPrice}</span>
        <span className="ml-1 text-sm  ">
          /{period === 'annually' ? '年' : period === 'quarterly' ? '季' : '月'}
        </span>
      </div>
      {/* #f35d97 */}
      <ul className="my-4 space-y-4 text-sm  ">
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
                fill={isLast ? '#fff' : '#DD5A86'}
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

export default planCard;
