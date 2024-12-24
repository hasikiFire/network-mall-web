export interface PackageItem {
    id?: number;
    packageName?: string;
    packageDesc?: string;
    originalPrice?: number;
    packageStatus?: number;
    salePrice?: number;
    discount?: number;
    discountStartDate?: string;
    discountEndDate?: string;
    dataAllowance?: number;
    deviceLimit?: number;
    speedLimit?: number;
    deleted?: number;
    createdAt?: string;
    updatedAt?: string;
}
