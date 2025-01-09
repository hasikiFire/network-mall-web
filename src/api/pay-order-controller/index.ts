import { RestRespBoolean } from '@/interface';
import { CancelOrderReqDto } from '@/interface/apiTypes/CancelOrderReqDto';
import { RestRespListPayOrder } from '@/interface/apiTypes/RestRespListPayOrder';
import { RestRespPayOrderItem } from '@/interface/apiTypes/RestRespPayOrderItem';
import { request } from '@/lib/request';
import { type AxiosRequestConfig } from 'axios';
import { DeepRequired } from 'react-hook-form';

/**
 * /payOrderItem/detail
 */
export function getPayOrderItemDetail(params: GetPayOrderItemDetailParams) {
  const paramsInput = {
    orderCode: params.orderCode
  };
  return request<DeepRequired<RestRespPayOrderItem>>({
    url: `/payOrderItem/detail`,
    method: 'GET',
    params: paramsInput
  });
}

export interface GetPayOrderItemDetailParams {
  orderCode: string;
}

/**
 * /payOrder/list
 */
export function getPayOrderList(config?: AxiosRequestConfig) {
  return request<DeepRequired<RestRespListPayOrder>>({
    url: `/payOrder/list`,
    method: 'GET'
  });
}

/**
 * 取消订单
 * /payOrder/cancel
 */
export function postPayOrderCancel(input: CancelOrderReqDto) {
  return request<DeepRequired<RestRespBoolean>>({
    url: `/payOrder/cancel`,
    method: 'POST',
    data: input
  });
}
