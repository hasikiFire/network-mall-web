import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Actions = {
  setOrderData: (data: Partial<IOrderItem>) => void;
  reset: () => void;
};
export type State = {
  formData?: IOrderItem;
};

export interface IOrderItem {
  plan: string;
  traffic: number;
  onlineIPs?: number;
  duration: number;
  payment: string;
}
const mockDefaultValue = {
  plan: '1',
  traffic: 50,
  onlineIPs: 3,
  duration: 1,
  payment: 'alipay'
};
export const useOrderStore = create<State & Actions>()(
  persist(
    (set) => ({
      formData: { ...mockDefaultValue },

      reset: () => set(() => ({ formData: undefined })),

      setOrderData: (data: Partial<IOrderItem>) =>
        set((state) => ({ formData: { ...state.formData, ...data } }))
    }),
    { name: 'order-store' }
  )
);
