import {
  RestRespPageRespDtoPackageListRespDto,
  PackageListReqDto,
  RestRespPageRespDtoUserListRespDto,
  UserListReqDto,
  PackageAddReqDto,
  RestRespPackageRespDto,
  RestRespString,
  UserCreateDto,
  RestRespUser,
  UserEditDto,
  PackageEditReqDto,
  RestRespVoid,
  DeepRequired
} from '@/interface';
import { AxiosRequestConfig } from 'axios';
import { request } from '@/lib/request';
/**
 * 获取所有套餐列表
 * /admin/pacakge/getAlllist
 */
export function getAdminPacakgeGetAlllist(
  params: GetAdminPacakgeGetAlllistParams
) {
  return request<DeepRequired<RestRespPageRespDtoPackageListRespDto>>({
    url: `/admin/pacakge/getAlllist`,
    method: 'GET',
    params: {
      ...params.params
    }
  });
}

/**
 * 查询用户列表
 * /admin/user/getList
 */
export function getAdminUserGetList(params: GetAdminUserGetListParams) {
  return request<DeepRequired<RestRespPageRespDtoUserListRespDto>>({
    url: `/admin/user/getList`,
    method: 'GET',
    params: {
      ...params.params
    }
  });
}

/**
 * 新增套餐
 * /admin/pacakge/add
 */
export function postAdminPacakgeAdd(input: PackageAddReqDto) {
  return request<DeepRequired<RestRespPackageRespDto>>({
    url: `/admin/pacakge/add`,
    method: 'POST',
    data: input
  });
}

/**
 * 禁用/删除用户
 * /admin/user/changeStatus
 */
export function postAdminUserChangeStatus(
  params: PostAdminUserChangeStatusParams
) {
  return request<DeepRequired<RestRespString>>({
    url: `/admin/user/changeStatus`,
    method: 'POST',
    data: {
      status: params.status
    }
  });
}

/**
 * 新增用户
 * /admin/user/create
 */
export function postAdminUserCreate(input: UserCreateDto) {
  return request<DeepRequired<RestRespUser>>({
    url: `/admin/user/create`,
    method: 'POST',
    data: input
  });
}

/**
 * 编辑用户
 * /admin/user/update
 */
export function postAdminUserUpdate(input: UserEditDto) {
  return request<DeepRequired<RestRespUser>>({
    url: `/admin/user/update`,
    method: 'POST',
    data: input
  });
}

/**
 * 编辑套餐
 * /admin/pacakge/edit
 */
export function putAdminPacakgeEdit(input: PackageEditReqDto) {
  return request<DeepRequired<RestRespVoid>>({
    url: `/admin/pacakge/edit`,
    method: 'POST',
    data: input
  });
}

export interface GetAdminPacakgeGetAlllistParams {
  params: PackageListReqDto;
}

export interface GetAdminUserGetListParams {
  params: UserListReqDto;
}

export interface PostAdminUserChangeStatusParams {
  status: string;
}
