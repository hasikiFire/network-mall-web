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
    traffic: 50,
    ipLimit: 3,
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
    traffic: 200,
    ipLimit: 3,
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
    traffic: 300,
    ipLimit: 3,
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
