import request from "@/lib/request";
import { type RestRespPageRespDtoForeignServerListRespDto, type DeepRequired, type ForeignServerListReqDto } from "../../interface";
import { type AxiosRequestConfig } from "axios";

/**
 * /admin/foreignServer/list
 */
export function getAdminForeignServerList(params: GetAdminForeignServerListParams, config?: AxiosRequestConfig) {
    const paramsInput = {
        ...params.params,
    };
    return request.get<DeepRequired<RestRespPageRespDtoForeignServerListRespDto>>(`/admin/foreignServer/list`, {
        params: paramsInput,
        ...config,
    });
}

export interface GetAdminForeignServerListParams {
    params: ForeignServerListReqDto;
}
