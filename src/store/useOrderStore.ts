import { create } from 'zustand';

export type Actions = {
  setOrderData: (data: Partial<IOrderItem>) => void;
  reset: () => void;
};

export type State = {
  formData: IOrderItem;
};

export interface IOrderItem {
  plan: string;
  traffic: number;
  onlineIPs?: number;
  duration: number;
  payment: string;
  couponCode?: string;
  discount?: number;
}

const defaultValue = {
  plan: '',
  traffic: 0,
  onlineIPs: 0,
  duration: 1,
  payment: 'alipay',
  couponCode: '',
  discount: 100
};

export const useOrderStore = create<State & Actions>((set) => ({
  formData: { ...defaultValue },

  reset: () => set(() => ({ formData: { ...defaultValue } })),

  setOrderData: (data: Partial<IOrderItem>) =>
    set((state) => ({ formData: { ...state.formData, ...data } }))
}));
