export interface UsageRecord {
    id?: number;
    packageId?: number;
    orderCode?: string;
    userId?: number;
    purchaseStatus?: number;
    purchaseStartTime?: string;
    purchaseEndTime?: string;
    dataAllowance?: number;
    consumedDataTransfer?: number;
    speedLimit?: number;
    deviceNum?: number;
    subscriptionLink?: string;
    createdAt?: string;
    updatedAt?: string;
    deleted?: number;
}
