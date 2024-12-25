import {
  RestRespPageRespDtoPackageListRespDto,
  PackageBuyReqDto,
  RestRespPackageRespDto,
  PageReqDto
} from '@/interface';
import { request } from '@/lib/request';
import { DeepRequired } from 'react-hook-form';

/**
 * 查询可用的套餐列表
 * /package/getList
 */
export function getPackageGetList(params: GetPackageGetListParams) {
  return request<DeepRequired<RestRespPageRespDtoPackageListRespDto>>({
    url: `/package/getList`,
    method: 'GET',
    params: {
      ...params.params
    }
  });
}

/**
 * 购买套餐
 * /package/buy
 */
export function postPackageBuy(input: PackageBuyReqDto) {
  return request<DeepRequired<RestRespPackageRespDto>>({
    url: `/package/buy`,
    method: 'POST',
    data: input
  });
}

export interface GetPackageGetListParams {
  params: PageReqDto;
}
