import { IOption } from '@/types';
import { mockplanList } from '@/lib/mock';
import { create } from 'zustand';
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
  payment: string[];
}
export const defaultMonthOptions = [
  { label: '1个月', value: 1 },
  { label: '3个月', value: 3 },
  { label: '半年', value: 6 },
  { label: '1年', value: 12 }
];

export const defaultPayOptions = [
  { label: '支付宝', value: 'alipay' },
  { label: '微信', value: 'wxpay' }
];

/** TODO 从后台配置，可编辑 */
export const defaultPlanConfig = {
  IPConfigable: true,
  IPRange: [3, 6],
  trafficConfigable: true,
  trafficPrice: 0.5,
  payment: ['wxpay', 'alipay'],
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
  traffic: number;
}

const isClient = typeof window !== 'undefined';

export const usePlanStore = create<State & Actions>()(
  persist(
    (set) => ({
      planList: [],
      planConfig: defaultPlanConfig,
      monthOptions: defaultMonthOptions,
      payOptions: defaultPayOptions,

      reset: () => set(() => ({ planList: undefined })),

      setPlanData: (data: IPlanItem[]) =>
        set((state) => ({ planList: { ...state.planList, ...data } })),
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
            traffic: item.dataAllowance
          };
        });
        set(() => ({ planList: tempList }));
      },
      initializePlanList: (data: IPlanItem[]) => {
        if (typeof window !== 'undefined') {
          // 只在客户端更新
          set(() => ({ planList: data }));
        }
      }
    }),
    {
      name: 'plan-store',
      skipHydration: true, // 这里我们跳过了自动水合
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          // Return null if running on server
          if (!isClient) return null;
          return localStorage.getItem(name);
        },
        setItem: (name, value) => {
          if (!isClient) return;
          localStorage.setItem(name, value);
        },
        removeItem: (name) => {
          if (!isClient) return;
          localStorage.removeItem(name);
        }
      }))
    }
  )
);
