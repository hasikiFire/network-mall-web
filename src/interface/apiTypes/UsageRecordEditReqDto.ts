export interface UsageRecordEditReqDto {
    /** 套餐主键 */
    id: number;
    /** 订单ID */
    orderCode: string;
    /** 用户ID */
    userId: number;
    /** 套餐状态 0:未开始 1：生效中 2：流量已用尽 3：已过期 */
    purchaseStatus?: number;
    purchaseStartTime?: string;
    /** 结束日期 */
    purchaseEndTime?: string;
    /** 在线的设备数量 */
    deviceNum?: number;
    /** 数据流量限额（单位：B） */
    dataAllowance?: number;
    /** 用户已消耗的流量（单位：B） */
    consumedDataTransfer?: number;
    /** 流量速率限额（单位：B） */
    speedLimit?: number;
}
