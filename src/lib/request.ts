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
  toast.error('登录信息过期, 请重新登录');
  localStorage.removeItem('access_token');
  // TODO
  // gotoLogin();
};

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    config.headers = {
      Authorization: `Bearer ${token}`,
      token: `${token}`,
      'access-token': `${token}`,

      ...config.headers
    } as unknown as AxiosRequestHeaders;
    config.url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${config.url}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
instance.interceptors.response.use(
  (res) => {
    if (
      res.data.code !== undefined &&
      res.data.code !== 0 &&
      res.data.code !== 200 &&
      !(res.config as AxiosRequestConfig & { skipErrorHandler?: boolean })
        .skipErrorHandler
    ) {
      if ((res.data.msg || res.data.message).includes('无效用户')) {
        handleInvalidToken();
        return Promise.reject(res.data);
      } else {
        toast.error(res.data.msg || res.data.message);
        return Promise.reject(res.data);
      }
    }
    return Promise.resolve(res.data);
  },
  (error: AxiosError<{ code: number; message?: string; msg?: string }>) => {
    const skipErrorHandler = (
      error.config as AxiosRequestConfig & { skipErrorHandler?: boolean }
    ).skipErrorHandler;
    if (error.response?.status === 401 && !skipErrorHandler) {
      handleInvalidToken();
      return;
    }
    if (!skipErrorHandler) {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.msg ||
          error.message
      );
    }
    return Promise.reject(error);
  }
);

type Request = <T = unknown>(
  config: AxiosRequestConfig & { skipErrorHandler?: boolean }
) => Promise<T>;

export const request = instance.request as Request;
