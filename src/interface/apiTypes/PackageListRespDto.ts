export interface PackageListRespDto {
  /** 主键 */
  id?: number;
  /** 套餐主键 */
  packageId?: number;
  /** 套餐名称 */
  packageName?: string;
  /** 套餐描述 */
  packageDesc?: string;
  /** 状态。0: 未启用 1：活动，2：下架 */
  packageStatus?: number;
  /** 商品原价 */
  originalPrice?: number;
  /** 商品销售价 */
  salePrice?: number;
  /** 折扣百分比 */
  discount?: number;
  /** 折扣开始日期 */
  discountStartDate?: string;
  /** 折扣结束日期 */
  discountEndDate?: string;
  /** 数据流量限额（单位：B）。无值表示无限制 */
  dataAllowance?: number;
  /** 设备数量限制。无值表示无限制 */
  deviceLimit?: number;
  /** 速率限制（单位：MB/s）。无值表示无限制 */
  speedLimit?: number;
  /** 是否已删除 1：已删除 0：未删除 */
  deleted?: number;
  /** 创建时间 */
  createdAt?: string;
  /** 更新时间 */
  updatedAt?: string;
}
