// Request.ts
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders
} from 'axios';
import { toast } from 'sonner';
// 定义响应数据的类型（可扩展）

const instance = axios.create({
  timeout: 30 * 1000
});
const handleInvalidToken = () => {
  // 确保在客户端环境中调用
  if (typeof window !== 'undefined') {
    toast.error('登录信息过期, 请重新登录');
    sessionStorage.removeItem('token');
    // Router.push('/login'); // You should only use "next/router" on the client side of your app.
    window.location.href = '/login'; // 根据你的路由调整路径
  }
};

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('token');
      config.headers = {
        Authorization: `Bearer ${token}`,
        token: `${token}`,
        'access-token': `${token}`,

        ...config.headers
      } as unknown as AxiosRequestHeaders;
      config.url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${config.url}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
instance.interceptors.response.use(
  (res) => {
    const skipErrorHandler = (res.config as any)?.skipErrorHandler;

    if (
      res.data.code !== undefined &&
      res.data.code !== 0 &&
      res.data.code !== 200 &&
      !skipErrorHandler
    ) {
      if (
        (res.data.msg || res.data.message)?.includes('无效用户') ||
        res.data.code === 401
      ) {
        handleInvalidToken();
        return Promise.reject(res.data);
      } else {
        toast.error(res.data.msg || res.data.message);
        return Promise.reject(res.data);
      }
    }
    return Promise.resolve(res.data);
  },
  (error: AxiosError<{ code: number; message?: string }>) => {
    const skipErrorHandler = (error.config as any)?.skipErrorHandler;

    if (error.response?.status === 401 && !skipErrorHandler) {
      handleInvalidToken();
      return Promise.reject(error);
    }
    if (!skipErrorHandler) {
      toast.error(error.response?.data?.message || error.message || '请求失败');
    }
    return Promise.reject(error);
  }
);

type Request = <T = unknown>(
  config: AxiosRequestConfig & { skipErrorHandler?: boolean }
) => Promise<T>;

export const request = instance.request as Request;
