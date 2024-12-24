import request from '@/lib/request';
import { type RestRespString, type DeepRequired } from '../../interface';
import { type AxiosRequestConfig } from 'axios';

/**
 * 禁用/删除用户
 * /admin/user/changeStatus
 */
export function postAdminUserChangeStatus(
  params: PostAdminUserChangeStatusParams,
  config?: AxiosRequestConfig
) {
  const paramsInput = {
    status: params.status
  };
  return request.post<DeepRequired<RestRespString>>(
    `/admin/user/changeStatus`,
    {
      params: paramsInput,
      ...config
    }
  );
}

export interface PostAdminUserChangeStatusParams {
  status: string;
}
