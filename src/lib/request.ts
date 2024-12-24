// Request.ts
import { getToken } from 'next-auth/jwt';
import { getCookie } from './cookie';
import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';
// 定义请求选项的类型
interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

// 定义响应数据的类型（可扩展）
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

class Request {
  private baseURL: string;
  private token: string | null;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || process.env.API_BASE_URL || ''; // 从环境变量中获取域名
    this.token = null;
  }

  // 生成请求选项
  private async getRequestOptions(
    options: AxiosRequestConfig = {}
  ): Promise<AxiosRequestConfig> {
    const token = await getCookie('accessToken');

    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers // 合并自定义 headers
      },
      ...options
    };
  }

  // 通用请求方法
  public async request<T>(
    endpoint: string,
    options: AxiosRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const requestOptions = await this.getRequestOptions(options);

    try {
      const response = await axios(url, requestOptions);

      if (response.status !== 200) {
        const errorData = await response.data();
        throw new Error(errorData.message || 'Request failed');
      }

      const data = (await response.data()) as T;
      return {
        data,
        status: response.status
      };
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  // GET 请求
  public get<T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : '';
    return this.request<T>(`${endpoint}${queryString}`, { method: 'GET' });
  }

  // POST 请求
  public post<T>(
    endpoint: string,
    body?: Record<string, any>,
    options?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',

      data: JSON.stringify(body),
      ...options
    });
  }
}

// 创建全局实例
const request = new Request();

export default request;
