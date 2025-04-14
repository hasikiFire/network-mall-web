// lib/request.ts
import axios, {
  AxiosRequestConfig,
  AxiosError,
  AxiosRequestHeaders
} from 'axios';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
const isServer = typeof window === 'undefined';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
// 创建统一实例
const instance = axios.create({
  timeout: 30 * 1000
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // withCredentials: !isServer // 客户端自动携带cookie
});

// 服务端请求处理器
const getServerToken = async () => {
  if (!isServer) return;

  try {
    const { cookies } = await import('next/headers');
    // 读取的是当前请求的 Cookie 头信息
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    return token;
  } catch (error) {
    return;
  }
};
const handleInvalidToken = async () => {
  toast.error('登录信息过期，请重新登录');
  localStorage.removeItem('token');
  window.location.href = '/login';
};

// 请求拦截器
instance.interceptors.request.use(async (config) => {
  const serverToken = await getServerToken();

  const token = isServer ? serverToken : localStorage.getItem('token');
  config.headers = {
    ...config.headers,

    Authorization: `Bearer ${token}`,
    token: `${token}`,
    'access-token': `${token}`
  } as unknown as AxiosRequestHeaders;

  config.url = `${baseUrl}${config.url}`;
  return config;
});

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const skipError = (response.config as any)?.skipErrorHandler;
    const data = response.data as any;

    // 成功状态码处理
    if ([0, 200].includes(data?.code) || skipError) {
      return data;
    }

    // 业务错误处理
    const errorMessage = data?.msg || data?.message || '请求失败';

    // 只在客户端显示提示
    if (!isServer) {
      if (data.code === 401) {
        handleInvalidToken();
      } else {
        toast.error(errorMessage);
      }
      return;
    }

    return Promise.reject(data);
  },
  (error: AxiosError) => {
    const skipError = (error.config as any)?.skipErrorHandler;

    // 网络错误处理
    if (!isServer && !skipError) {
      const message = (error.response?.data as any)?.message || error.message;
      toast.error(message || '网络请求异常');
    }

    return Promise.reject(error);
  }
);

// 类型增强
type RequestMethod = <T = any>(
  config: AxiosRequestConfig & {
    skipErrorHandler?: boolean;
  }
) => Promise<T>;

const _request = instance.request as RequestMethod;
export const request = <T>(config: any): Promise<T> => {
  return _request<T>(config).catch((error) => {
    if (isServer) {
      if (error.code === 401) {
        redirect('/login');
      }
    }
    // 其他错误继续抛出（可选）
    return Promise.reject(error);
  });
};
