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
        sessionStorage.setItem('token', userData.token ?? ''); // 使用 sessionStorage
        set(() => ({ user: userData, isLogin: true }));
      },
      logout: () => {
        sessionStorage.removeItem('token'); // 使用 sessionStorage
        set(() => ({ user: undefined, isLogin: false }));
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
