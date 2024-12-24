import { type PackageRespDto } from "..";

export interface RestRespPackageRespDto {
    /** 错误码，0-成功 */
    code?: number;
    /** 响应消息 */
    message?: string;
    data?: PackageRespDto;
}
