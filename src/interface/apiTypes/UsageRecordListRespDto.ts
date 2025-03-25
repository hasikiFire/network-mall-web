export interface UsageRecordListRespDto {
  /** 主键 */
  id?: number;
  /** 套餐计划主键 */
  packageId?: number;
  /** 订单号 */
  orderCode?: string;
  /** 用户ID */
  userId?: number;
  userName?: number;
  /** 套餐状态 0:未开始 1：生效中 2：流量已用尽 3：已过期 4. 已取消 */
  purchaseStatus?: number;
  /** 开始日期 */
  purchaseStartTime?: string;
  /** 结束日期 */
  purchaseEndTime?: string;
  /** 数据流量限额（单位：B） */
  dataAllowance?: number | string;
  /** 用户已消耗的流量（单位：B） */
  consumedDataTransfer?: number | string;
  /** 用户已消耗的下行流量（单位：B） */
  consumedDataDownload?: number | string;
  /** 用户已消耗的上行流量（单位：B） */
  consumedDataUpload?: number | string;
  /** 流量速率限额（单位：B） */
  speedLimit?: number | string;
  /** 在线的设备数量 */
  deviceNum?: number;
  /** 在线设备数量限额 */
  deviceLimit?: number;
  /** 下次流量重置日期 */
  nextResetDate?: string;
  /** 创建时间 */
  createdAt?: string;
  /** 更新时间 */
  updatedAt?: string;
  /** 是否已删除 1：已删除 0：未删除 */
  deleted?: number;

  _purchaseStatus?: string;
}
export enum PurchaseStatus {
  NotStarted = 0,
  InEffect = 1,
  FlowExhausted = 2,
  Expired = 3,
  Cancelled = 4
}

// 套餐状态中文映射
export const PurchaseStatusChinese = {
  [PurchaseStatus.NotStarted]: '未开始',
  [PurchaseStatus.InEffect]: '生效中',
  [PurchaseStatus.FlowExhausted]: '流量用尽',
  [PurchaseStatus.Expired]: '已过期',
  [PurchaseStatus.Cancelled]: '已取消'
};
