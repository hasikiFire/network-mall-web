import { create } from 'zustand';

export type Actions = {
  setOrderData: (data: Partial<IOrderItem>) => void;
  reset: () => void;
};

export type State = {
  orderData: IOrderItem;
};

export interface IOrderItem {
  plan: number;
  traffic: number;
  onlineIPs?: number;
  duration: number;
  payWay: string;
  couponCode?: string;
  discount?: number;
  tempCouponCode?: string;
}

const defaultValue = {
  plan: 0,
  traffic: 0,
  onlineIPs: 0,
  duration: 1,
  payWay: 'alipay',
  couponCode: '',
  discount: undefined,
  tempCouponCode: ''
};

export const useOrderStore = create<State & Actions>((set) => ({
  orderData: { ...defaultValue },

  reset: () => set(() => ({ orderData: { ...defaultValue } })),

  setOrderData: (data: Partial<IOrderItem>) =>
    set((state) => ({ orderData: { ...state.orderData, ...data } }))
}));
