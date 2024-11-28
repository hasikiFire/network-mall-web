export interface IPlanItem {
  id: number;
  title: string;
  basePrice: number; // 这里是月付基础价格
  features: string[];
  isPopular?: boolean;
}

export const mockplanList = [
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
      '可用节点：15 个'
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
      '可用节点：15 个'
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
      '可用节点：15 个'
    ]
  }
];

export const mockMonthOptions = [
  { label: '1个月', value: 1 },
  { label: '3个月', value: 3 },
  { label: '半年', value: 6 },
  { label: '1年', value: 12 }
];

export const payOptions = [
  { label: '支付宝', value: 'al' },
  { label: '微信', value: 'wx' }
];
