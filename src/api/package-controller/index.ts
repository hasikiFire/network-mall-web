import {
  RestRespPageRespDtoPackageListRespDto,
  PackageBuyReqDto,
  RestRespPackageRespDto,
  PageReqDto
} from '@/interface';
import { IResp } from '@/interface/apiTypes/IResp';
import { request } from '@/lib/request';
import { DeepRequired } from 'react-hook-form';

/**
 * 查询可用的套餐列表
 * /package/getList
 */
export function getPackageGetList(params: PageReqDto) {
  return request<DeepRequired<RestRespPageRespDtoPackageListRespDto>>({
    url: `/package/getList`,
    method: 'GET',
    params
  });
}

/**
 * 购买套餐
 * /package/buy
 */
export function buyPackage(input: PackageBuyReqDto) {
  return request<DeepRequired<RestRespPackageRespDto>>({
    url: `/package/buy`,
    method: 'POST',
    data: input
  });
}

export interface GetPackageGetListParams {
  params: PageReqDto;
}

/**
 * 轮询
 * /pollOrder
 */
export function pollOrder(params: { orderCode: string }) {
  return request<IResp<IPollOrdersRespDto>>({
    url: `/payOrder/pollOrder`,
    method: 'GET',
    params
  });
}

interface IAlipayTradeQueryResponse {
  // 假设 AlipayTradeQueryResponse 的具体字段未提供，这里仅作为占位符
  // 你可以根据实际需求补充具体字段
}

interface IPollOrdersRespDto {
  /**
   * 订单ID
   */
  orderCode: string;

  /**
   * 状态。0待支付，1已支付，2已取消，3已退款
   */
  status: string;

  /**
   * 描述
   */
  desc: string;

  /**
   * 支付宝返回信息
   */
  alipayResp: IAlipayTradeQueryResponse;

  // /**
  //  * 微信支付返回信息返回信息
  //  */
  // alipayresp: AlipayTradeQueryResponse;
}
