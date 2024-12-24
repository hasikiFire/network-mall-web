import request from '@/lib/request';
import { type RestRespVoid, type DeepRequired } from '../../interface';
import { type AxiosRequestConfig } from 'axios';

/**
 * /admin/foreignServer/delete/{id}
 */
export function deleteAdminForeignServerDeleteById(
  params: DeleteAdminForeignServerDeleteByIdParams
) {
  return request.post<DeepRequired<RestRespVoid>>(
    `/admin/foreignServer/delete/${params.id}`
  );
}

export interface DeleteAdminForeignServerDeleteByIdParams {
  id: number;
}
