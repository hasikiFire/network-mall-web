import request from "@/lib/request";
import { type RestRespUsageRecord, type DeepRequired, type PackageEditReqDto } from "../../interface";
import { type AxiosRequestConfig } from "axios";

/**
 * /usageRecord/update
 */
export function putUsageRecordUpdate(input: PackageEditReqDto, config?: AxiosRequestConfig) {
    return request.put<DeepRequired<RestRespUsageRecord>>(`/usageRecord/update`, input, config);
}
