import { request } from '@/lib/request';

import {
  type RestRespUserRegisterRespDto,
  type DeepRequired,
  type UserRegisterReqDto,
  RestRespString,
  RestRespUserInfoRespDto,
  RestRespUserLoginRespDto,
  RestRespVoid,
  UserLoginReqDto,
  UsersendEmailCodeDto
} from '@/interface';
import { type AxiosRequestConfig } from 'axios';
import { UserResetPassword } from '@/interface/apiTypes/UserResetPassword';

/**
 * 用户注册接口
 * /user/register
 */
export function postUserRegister(input: UserRegisterReqDto) {
  return request<DeepRequired<RestRespUserRegisterRespDto>>({
    url: `/user/register`,
    method: 'POST',
    data: input
  });
}

export interface GetUserSubscribeParams {
  token: string;
}

export interface GetUserGetUserInfoParams {
  userId: number;
}

/**
 * 生成订阅链接
 * /user/subscribe
 */
export function getUserSubscribe(params: GetUserSubscribeParams) {
  return request<DeepRequired<string>>({
    url: `/user/subscribe`,
    method: 'GET',
    params: {
      token: params.token
    }
  });
}

/**
 * 用户登录接口
 * /user/login
 */
export function postUserLogin(input: UserLoginReqDto) {
  return request<DeepRequired<RestRespUserLoginRespDto>>({
    url: `/user/login`,
    method: 'POST',
    data: input
  });
}

/**
 * Send email verification code interface
 * /user/sendEmailCode
 */
export function postUserSendEmailCode(input: UsersendEmailCodeDto) {
  return request<DeepRequired<RestRespVoid>>({
    url: `/user/sendEmailCode`,
    method: 'POST',
    data: input
  });
}

/**
 * 用户信息查询接口
 * /user/getUserInfo
 */
export function getUserGetUserInfo(params: GetUserGetUserInfoParams) {
  return request<DeepRequired<RestRespUserInfoRespDto>>({
    url: `/user/getUserInfo`,
    method: 'GET',
    params: {
      userId: params.userId
    }
  });
}

/**
 * 获取订阅链接
 * /user/getSubscribe
 */
export function getUserGetSubscribe() {
  return request<DeepRequired<RestRespString>>({
    url: `/user/getSubscribe`,
    method: 'GET'
  });
}

/**
 * 获取订阅链接
 * /user/getSubscribe
 */
export function resetPassword(input: UserResetPassword) {
  return request<DeepRequired<RestRespString>>({
    url: `/user/resetPassword`,
    method: 'POST',
    data: input
  });
}
