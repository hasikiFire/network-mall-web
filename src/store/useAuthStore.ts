import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Actions = {
  login: (data: IUser) => void;
  logout: () => void;
};
export type State = {
  user?: IUser;
  isLogin: boolean;
};

export interface IUser {
  email: string;
  role?: string;
  name?: string;
  image?: string;
  token: string;
  userId: number;
}

export const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      user: undefined,
      isLogin: false,
      login: (userData: IUser) => {
        localStorage.setItem('token', userData.token ?? '');
        set(() => ({ user: userData, isLogin: true })); // 登录函数
      },
      logout: () => {
        localStorage.removeItem('token');
        set(() => ({ user: undefined, isLogin: false })); // 登录函数
      }
    }),
    { name: 'auth-store' }
  )
);
