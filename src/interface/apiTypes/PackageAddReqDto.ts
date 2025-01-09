export interface PackageAddReqDto {
  /** 套餐名称 */
  packageName: string;
  /** 0: 未启用 1：活动，2：下架 */
  status?: number;
  /** 套餐描述 */
  packageDesc: string;
  /** 原价 */
  originalPrice: number;
  /** 销售价 */
  salePrice: number;
  /** 折扣 */
  discount?: number;
  /** 折扣开始日期 */
  discountStartDate?: string;
  /** 折扣结束日期 */
  discountEndDate?: string;
  /** 数据额度，单位GB */
  dataAllowance: number;
  /** 设备限制数量，不传则不限制 */
  deviceLimit?: number;
  /** 速度限制，单位B，不传则不限制 */
  speedLimit: number;
}
