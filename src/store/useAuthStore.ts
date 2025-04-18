import { UserInfoRespDto } from '@/interface';
import { delCookie, setCookie } from '@/lib/cookie';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Actions = {
  login: (token: string) => void;
  logout: () => void;
  setUser: (userData: IUser) => void;
};
export type State = {
  user?: IUser;
  isLogin: boolean;
};

export interface IUser extends UserInfoRespDto {
  token?: string;
}

export const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      user: undefined,
      isLogin: false,
      login: async (token: string) => {
        const expires = new Date();
        expires.setMonth(expires.getMonth() + 1); // 当前时间 + 1 个月
        setCookie('token', token, expires.toUTCString());
        localStorage.setItem('token', token ?? ''); // 使用 localStorage
        set(() => ({ isLogin: true }));
      },
      logout: async () => {
        delCookie('token');
        localStorage.removeItem('token'); // 使用 localStorage
        set(() => ({ user: undefined, isLogin: false }));
      },
      setUser: (userData: IUser) => {
        set(() => ({ user: userData }));
      }
    }),
    {
      name: 'auth-store', // 存储的名称
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name); // 使用 localStorage
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value)); // 使用 localStorage
        },
        removeItem: (name) => {
          localStorage.removeItem(name); // 使用 localStorage
        }
      }
    }
  )
);
