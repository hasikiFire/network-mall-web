export interface PackageBuyReqDto {
  /** 套餐ID */
  packageId: number;
  /** 用户ID */
  userId: number;
  /** 月份 */
  month: number;
  /** 数据流量限额,单位为B */
  dataAllowance?: number;
  /** 设备数量限制 */
  deviceLimit?: number;
  /** 支付方式。wxpay(微信支付)、alipay支付宝支付),USTD(加密货币交易)' */
  payWay: string;
  /** 优惠码 */
  couponCode?: string;
}
