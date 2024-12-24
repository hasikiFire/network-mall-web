import request from "@/lib/request";
import { type RestRespPageRespDtoPackageListRespDto, type DeepRequired, type PackageListReqDto } from "../../interface";
import { type AxiosRequestConfig } from "axios";

/**
 * /usageRecord/detail
 */
export function getUsageRecordDetail(params: GetUsageRecordDetailParams, config?: AxiosRequestConfig) {
    const paramsInput = {
        ...params.params,
    };
    return request.get<DeepRequired<RestRespPageRespDtoPackageListRespDto>>(`/usageRecord/detail`, {
        params: paramsInput,
        ...config,
    });
}

export interface GetUsageRecordDetailParams {
    params: PackageListReqDto;
}
