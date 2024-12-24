import request from "@/lib/request";
import { type RestRespPageRespDtoPackageListRespDto, type DeepRequired, type PackageListReqDto } from "../../interface";
import { type AxiosRequestConfig } from "axios";

/**
 * /admin/pacakge/getAlllist
 */
export function getAdminPacakgeGetAlllist(params: GetAdminPacakgeGetAlllistParams, config?: AxiosRequestConfig) {
    const paramsInput = {
        ...params.params,
    };
    return request.get<DeepRequired<RestRespPageRespDtoPackageListRespDto>>(`/admin/pacakge/getAlllist`, {
        params: paramsInput,
        ...config,
    });
}

export interface GetAdminPacakgeGetAlllistParams {
    params: PackageListReqDto;
}
