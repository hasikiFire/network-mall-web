export interface UsageRecordListReqDto {
    pageNum?: number;
    pageSize?: number;
    fetchAll?: boolean;
    /** 主键 */
    id?: number;
    /** 套餐计划主键 */
    packageId?: number;
    /** 订单号 */
    orderCode?: string;
    /** 用户ID */
    userId?: number;
    /** 套餐状态 0:未开始 1：生效中 2：流量已用尽 3：已过期 4. 已取消 */
    purchaseStatus?: number;
}
