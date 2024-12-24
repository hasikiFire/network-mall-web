import request from "@/lib/request";
import { type RestRespPackageRespDto, type DeepRequired, type PackageBuyReqDto } from "../../interface";
import { type AxiosRequestConfig } from "axios";

/**
 * 购买套餐
 * /package/buy
 */
export function postPackageBuy(input: PackageBuyReqDto, config?: AxiosRequestConfig) {
    return request.post<DeepRequired<RestRespPackageRespDto>>(`/package/buy`, input, config);
}
