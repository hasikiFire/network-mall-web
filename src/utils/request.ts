// Request.ts
import { getToken } from 'next-auth/jwt';
import { getCookie } from './cookie';

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
    options: RequestOptions = {}
  ): Promise<RequestOptions> {
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
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const requestOptions = await this.getRequestOptions(options);

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
      }

      const data = (await response.json()) as T;
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
    body: Record<string, any>,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options
    });
  }

  // PUT 请求
  public put<T>(
    endpoint: string,
    body: Record<string, any>,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options
    });
  }

  // DELETE 请求
  public delete<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', ...options });
  }
}

// 创建全局实例
const request = new Request();

export default request;
