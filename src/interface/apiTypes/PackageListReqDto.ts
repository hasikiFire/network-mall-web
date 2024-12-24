export interface PackageListReqDto {
    pageNum?: number;
    pageSize?: number;
    fetchAll?: boolean;
    /** 套餐ID */
    packageId?: number;
    /** 名字 */
    packageName?: string;
    /** 状态。 0: 未启用 1：活动，2：下架 */
    packageStatus?: number;
    /** 是否打折 */
    inDiscount?: boolean;
}
