import {
  RestRespPageRespDtoPackageListRespDto,
  PackageEditReqDto,
  RestRespUsageRecord,
  PackageListReqDto
} from '@/interface';
import { request } from '@/lib/request';
import { DeepRequired } from 'react-hook-form';

/**
 * /usageRecord/detail
 */
export function getUsageRecordDetail(params: GetUsageRecordDetailParams) {
  return request<DeepRequired<RestRespPageRespDtoPackageListRespDto>>({
    url: `/usageRecord/detail`,
    method: 'GET',
    params: {
      ...params.params
    }
  });
}

/**
 * /usageRecord/update
 */
export function putUsageRecordUpdate(input: PackageEditReqDto) {
  return request<DeepRequired<RestRespUsageRecord>>({
    url: `/usageRecord/update`,
    method: 'PUT',
    data: input
  });
}

export interface GetUsageRecordDetailParams {
  params: PackageListReqDto;
}
