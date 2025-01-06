import {
  PackageEditReqDto,
  RestRespUsageRecord,
  PackageListReqDto,
  UsageRecord
} from '@/interface';
import { IResp } from '@/interface/apiTypes/IResp';
import { request } from '@/lib/request';
import { DeepRequired } from 'react-hook-form';

/**
 * /usageRecord/detail
 */
export function getUsageRecordDetail() {
  return request<DeepRequired<IResp<UsageRecord>>>({
    url: `/usageRecord/detail`,
    method: 'GET'
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
