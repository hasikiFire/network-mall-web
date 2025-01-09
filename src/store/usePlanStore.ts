import { IOption } from '@/types';
import { create, createStore } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getPackageGetList } from '@/api';

export type Actions = {
  setPlanData: (data: IPlanItem[]) => void;
  reset: () => void;
  getPlanData: () => void;
  initializePlanList: (data: IPlanItem[]) => void;
};

export type State = {
  planList?: IPlanItem[];
  planConfig: IPlanConfig;
  monthOptions: IOption<number>[];
  payOptions: IOption<string>[];
};

export interface IPlanConfig {
  /**
   * 是否启用在线IP数量
  
   */
  IPConfigable: boolean;
  IPRange: number[];
  /** 每 IP 多少钱 */
  IPPrice: number;
  /**
   * 是否启用流量
   */
  trafficConfigable: boolean;
  /** 每 10GB 多少钱 */
  trafficPrice: number;
  payWay: string[];
}
export const defaultMonthOptions = [
  { label: '1个月', value: 1 },
  { label: '3个月', value: 3 },
  // { label: '半年', value: 6 },
  { label: '1年', value: 12 }
];

export const periodOptions = [
  {
    value: '1',
    label: '月付'
  },
  {
    value: '3',
    label: '季付'
  },
  {
    value: '12',
    label: '年付'
  }
];

export const defaultPayOptions = [
  { label: '支付宝', value: 'alipay' }
  // { label: '微信', value: 'wxpay' }
];

/** TODO 从后台配置，可编辑 */
export const defaultPlanConfig = {
  IPConfigable: false,
  IPRange: [3, 6],
  trafficConfigable: false,
  trafficPrice: 0.5,
  payWay: ['wxpay', 'alipay'],
  IPPrice: 10,
  ipLimit: 3
};

export interface IPlanItem {
  id: number;
  title: string;
  basePrice: number; // 这里是月付基础价格
  features: string[];
  isPopular?: boolean;
  ipLimit?: number;
  traffic: number; // 以GB为单位
  speedLimit: number;
}

// 持久化要用 createStore https://zustand.docs.pmnd.rs/middlewares/persist ,比较恶心，还要避免水合，手动水合
export const usePlanStore = create<State & Actions>()((set) => ({
  planList: [],
  planConfig: defaultPlanConfig,
  monthOptions: defaultMonthOptions,
  payOptions: defaultPayOptions,

  reset: () => set(() => ({ planList: undefined })),

  setPlanData: (data: IPlanItem[]) => set(() => ({ planList: data })),
  setPlanConfig: (data: IPlanConfig) =>
    set((state) => ({ planConfig: { ...state.planConfig, ...data } })),
  getPlanData: async () => {
    const res = await getPackageGetList({ fetchAll: true });
    const tempList = res.data.list.map((item) => {
      return {
        id: item.id,
        title: item.packageName,
        basePrice: item.salePrice,
        features: [item.packageDesc],
        ipLimit: item.deviceLimit,
        traffic: item.dataAllowance,
        speedLimit: item.speedLimit
      };
    });
    set(() => ({ planList: tempList }));
  },
  initializePlanList: (data: IPlanItem[]) => {
    // 只在客户端更新
    set(() => ({ planList: data }));
  }
}));
