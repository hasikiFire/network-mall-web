import { RestRespVoid, RestRespPageRespDtoForeignServerListRespDto, RestRespForeignServer, ForeignEditReqDto, ForeignServerListReqDto } from '@/interface';
import { request } from '@/lib/request';
import { DeepRequired } from 'react-hook-form';
/**
 * 删除外部服务器
 * /admin/foreignServer/delete/{id}
 */
export function deleteAdminForeignServerDeleteById(
  params: DeleteAdminForeignServerDeleteByIdParams
) {
  return request<DeepRequired<RestRespVoid>>({
    url: `/admin/foreignServer/delete/${params.id}`,
    method: 'POST'
  });
}

/**
 * 获取外部服务器列表
 * /admin/foreignServer/list
 */
export function getAdminForeignServerList(
  params: GetAdminForeignServerListParams
) {
  return request<DeepRequired<RestRespPageRespDtoForeignServerListRespDto>>({
    url: `/admin/foreignServer/list`,
    method: 'GET',
    params: {
      ...params.params
    }
  });
}

/**
 * 获取外部服务器详情
 * /admin/foreignServer/{id}
 */
export function getAdminForeignServerById(
  params: GetAdminForeignServerByIdParams
) {
  return request<DeepRequired<RestRespForeignServer>>({
    url: `/admin/foreignServer/${params.id}`,
    method: 'GET'
  });
}

/**
 * 编辑外部服务器
 * /admin/foreignServer/edit
 */
export function putAdminForeignServerEdit(input: ForeignEditReqDto) {
  return request<DeepRequired<RestRespVoid>>({
    url: `/admin/foreignServer/edit`,
    method: 'POST',
    data: input
  });
}

export interface DeleteAdminForeignServerDeleteByIdParams {
  id: number;
}

export interface GetAdminForeignServerListParams {
  params: ForeignServerListReqDto;
}

export interface GetAdminForeignServerByIdParams {
  id: number;
}
