import request from "@/lib/request";
import { type RestRespPageRespDtoPackageListRespDto, type DeepRequired, type PageReqDto } from "../../interface";
import { type AxiosRequestConfig } from "axios";

/**
 * 查询可用的套餐列表
 * /package/getList
 */
export function getPackageGetList(params: GetPackageGetListParams, config?: AxiosRequestConfig) {
    const paramsInput = {
        ...params.params,
    };
    return request.get<DeepRequired<RestRespPageRespDtoPackageListRespDto>>(`/package/getList`, {
        params: paramsInput,
        ...config,
    });
}

export interface GetPackageGetListParams {
    params: PageReqDto;
}
