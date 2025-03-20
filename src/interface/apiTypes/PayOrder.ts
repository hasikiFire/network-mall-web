export interface PayOrder {
  /**
   * 主键
   */
  id: number;

  /**
   * 订单号
   */
  orderCode: string;

  /**
   * 外部支付系统交易号
   */
  tradeNo: string;

  /**
   * 用户ID
   */
  userId: number;

  /**
   * 套餐计划主键
   */
  packageId: number;

  /**
   * 计费周期。单位：月份
   */
  packageUnit: number;

  /**
   * 订单创建日期
   */
  orderCreateTime: string; // LocalDateTime 转换为字符串

  /**
   * 订单过期日期
   */
  orderExpireTime: string; // LocalDateTime 转换为字符串

  /**
   * 订单状态
   */
  orderStatus: OrderStatus;

  /**
   * 订单金额
   */
  orderAmount: number;

  /**
   * 支付金额
   */
  payAmount: number;

  /**
   * 订单备注
   */
  orderRemark: string;

  /**
   * 支付时间
   */
  payTime: string; // LocalDateTime 转换为字符串

  /**
   * 支付方式
   */
  payWay: PayWay;

  /**
   * 支付场景
   */
  paySeene: PayScene;

  /**
   * 支付状态
   */
  payStatus: PayStatus;

  /**
   * 优惠券编码
   */
  couponCode: string;

  /**
   * 已优惠金额
   */
  couponAmount: number;

  /**
   * 收款商户ID
   */
  supplierId: string;

  /**
   * 退款单号
   */
  refundNo: string; // LocalDateTime 转换为字符串

  /**
   * 退款请求时间
   */
  refundReqTime: string; // LocalDateTime 转换为字符串

  /**
   * 退款时间
   */
  refundTime: string; // LocalDateTime 转换为字符串

  /**
   * 退款金额
   */
  refundAmount: number;

  /**
   * 退款状态
   */
  refundStatus: RefundStatus;

  /**
   * 是否已删除
   */
  deleted: DeletedStatus;

  /**
   * 创建时间
   */
  createdAt: string; // LocalDateTime 转换为字符串

  /**
   * 更新时间
   */
  updatedAt: string; // LocalDateTime 转换为字符串
  _orderStatus?: string;
  _packageUnit?: string;
}
// 订单状态
export enum OrderStatus {
  WaitPay = 'WAIT_PAY', // 待支付
  Paid = 'PAID', // 已支付
  Refunding = 'REFUNDING', // 退款中
  Refunded = 'REFUNDED', // 已退款
  Closed = 'CLOSED', // 已关闭
  Canceled = 'CANCELED', // 已取消
  COMPLETE = 'COMPLETE' // 已完成
}

// 订单状态中文映射
export const OrderStatusChinese = {
  [OrderStatus.WaitPay]: '待支付',
  [OrderStatus.Paid]: '已支付',
  [OrderStatus.Refunding]: '退款中',
  [OrderStatus.Refunded]: '已退款',
  [OrderStatus.Closed]: '已关闭',
  [OrderStatus.Canceled]: '已取消',
  [OrderStatus.COMPLETE]: '已完成'
};

// 支付方式
export enum PayWay {
  WxPay = 'wxpay', // 微信支付
  AliPay = 'alipay', // 支付宝支付
  USTD = 'USTD' // 加密货币交易
}

// 支付方式中文映射
export const PayWayChinese = {
  [PayWay.WxPay]: '微信支付',
  [PayWay.AliPay]: '支付宝支付',
  [PayWay.USTD]: '加密货币交易'
};

// 支付场景
export enum PayScene {
  OnlinePay = 'ONLINE_PAY', // 在线支付
  QrcodeScanPay = 'QRCODE_SCAN_PAY', // 扫码支付
  QrcodeShowPay = 'QRCODE_SHOW_PAY' // 付款码支付
}

// 支付场景中文映射
export const PaySceneChinese = {
  [PayScene.OnlinePay]: '在线支付',
  [PayScene.QrcodeScanPay]: '扫码支付',
  [PayScene.QrcodeShowPay]: '付款码支付'
};

// 支付状态
export enum PayStatus {
  Waiting = 'waiting', // 待支付
  Success = 'success', // 支付成功
  Failed = 'failed' // 支付失败
}

// 支付状态中文映射
export const PayStatusChinese = {
  [PayStatus.Waiting]: '待支付',
  [PayStatus.Success]: '支付成功',
  [PayStatus.Failed]: '支付失败'
};

// 退款状态
export enum RefundStatus {
  Refunding = 'refunding', // 退款中
  PartRefunded = 'part_refunded', // 部分退款
  AllRefunded = 'all_refunded', // 全部退款
  Rejected = 'rejected' // 已拒绝
}

// 退款状态中文映射
export const RefundStatusChinese = {
  [RefundStatus.Refunding]: '退款中',
  [RefundStatus.PartRefunded]: '部分退款',
  [RefundStatus.AllRefunded]: '全部退款',
  [RefundStatus.Rejected]: '已拒绝'
};

// 是否已删除
export enum DeletedStatus {
  NotDeleted = 0, // 未删除
  Deleted = 1 // 已删除
}

// 是否已删除中文映射
export const DeletedStatusChinese = {
  [DeletedStatus.NotDeleted]: '未删除',
  [DeletedStatus.Deleted]: '已删除'
};
