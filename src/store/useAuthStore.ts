import { UserInfoRespDto } from '@/interface';
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
      login: (token: string) => {
        sessionStorage.setItem('token', token ?? ''); // 使用 sessionStorage
        set(() => ({ isLogin: true }));
      },
      logout: () => {
        sessionStorage.removeItem('token'); // 使用 sessionStorage
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
          const value = sessionStorage.getItem(name); // 使用 sessionStorage
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value)); // 使用 sessionStorage
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name); // 使用 sessionStorage
        }
      }
    }
  )
);
