import { RestRespListUserCoupon } from '@/interface/apiTypes/RestRespListUserCoupon';
import { RestRespUserCoupon } from '@/interface/apiTypes/RestRespUserCoupon';
import { request } from '@/lib/request';
import { type AxiosRequestConfig } from 'axios';
import { DeepRequired } from 'react-hook-form';

/**
 * /userCoupon/detail/{id}
 */
export function getUserCouponDetailById(params: GetUserCouponDetailByIdParams) {
  return request<DeepRequired<RestRespUserCoupon>>({
    url: `/userCoupon/detail/${params.id}`,
    method: 'GET'
  });
}

export interface GetUserCouponDetailByIdParams {
  id: number;
}

/**
 * /userCoupon/list
 */
export function getUserCouponList(config?: AxiosRequestConfig) {
  return request<DeepRequired<RestRespListUserCoupon>>({
    url: `/userCoupon/list`,
    method: 'GET',
    ...config
  });
}

/**
 * /userCoupon/validate
 */
export function getUserCouponValidate(
  params: GetUserCouponValidateParams,
  config?: AxiosRequestConfig
) {
  const paramsInput = {
    couponCode: params.couponCode
  };
  return request<DeepRequired<RestRespUserCoupon>>({
    url: `/userCoupon/validate`,
    method: 'GET',
    params: paramsInput,
    ...config
  });
}

export interface GetUserCouponValidateParams {
  couponCode: string;
}
