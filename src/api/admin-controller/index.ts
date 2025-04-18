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
  DeepRequired,
  RestRespUsageRecord,
  PageReqDto,
  RestRespPageRespDtoPayOrder,
  RestRespPageRespDtoUsageRecordListRespDto,
  UsageRecordEditReqDto,
  UsageRecordListReqDto,
  UserEditStatusDto
} from '@/interface';
import { AxiosRequestConfig } from 'axios';
import { request } from '@/lib/request';
import { redirect } from 'next/navigation';

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
      ...params
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
 * 编辑用户
 * /admin/user/update
 */
export function postAdminUserUpdateStatus(input: UserEditStatusDto) {
  return request<DeepRequired<RestRespUser>>({
    url: `/admin/user/updateUserStatus`,
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
  pageNum?: number;
  pageSize?: number;
  fetchAll?: boolean;
  /** 用户ID */
  userId?: number;
  /** 名字 */
  name?: string;
  /** 邮箱 */
  email?: string;
  /** 状态 1 正常 0 无效 2 已禁用（触发审计规则） */
  status?: number;
}

export interface PostAdminUserChangeStatusParams {
  status: string;
}
/**
 * 获取支付订单列表
 * /admin/payOrder/list
 */
export function getAdminPayOrderList(
  params: PageReqDto,
  config?: AxiosRequestConfig
) {
  return request<DeepRequired<RestRespPageRespDtoPayOrder>>({
    url: '/admin/payOrder/list',
    method: 'GET',
    params: params,
    ...config
  });
}

/**
 * 查询使用记录列表
 * /admin/usageRecord/getList
 */
export function getAdminUsageRecordGetList(
  params: UsageRecordListReqDto,
  config?: AxiosRequestConfig
) {
  return request<DeepRequired<RestRespPageRespDtoUsageRecordListRespDto>>({
    url: '/admin/usageRecord/getList',
    method: 'GET',
    params: params,
    ...config
  });
}

/**
 * 更新使用记录
 * /admin/usageRecord/update
 */
export function postAdminUsageRecordUpdate(
  input: UsageRecordEditReqDto,
  config?: AxiosRequestConfig
) {
  return request<DeepRequired<RestRespUsageRecord>>({
    url: '/admin/usageRecord/update',
    method: 'POST',
    data: input,
    ...config
  });
}
