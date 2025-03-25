import {
  type RefundChargeInfo,
  type TradeFundBill,
  type PresetPayToolInfo,
  type VoucherDetail
} from '@/interface';

export interface AlipayTradeRefundResponse {
  code?: string;
  msg?: string;
  subCode?: string;
  subMsg?: string;
  body?: string;
  params?: AlipayTradeRefundResponseParams;
  buyerLogonId?: string;
  buyerOpenId?: string;
  buyerUserId?: string;
  fundChange?: string;
  gmtRefundPay?: string;
  hasDepositBack?: string;
  openId?: string;
  outTradeNo?: string;
  preAuthCancelFee?: string;
  presentRefundBuyerAmount?: string;
  presentRefundDiscountAmount?: string;
  presentRefundMdiscountAmount?: string;
  refundChargeAmount?: string;
  refundChargeInfoList?: RefundChargeInfo[];
  refundCurrency?: string;
  refundDetailItemList?: TradeFundBill[];
  refundFee?: string;
  refundHybAmount?: string;
  refundPresetPaytoolList?: PresetPayToolInfo;
  refundSettlementId?: string;
  refundVoucherDetailList?: VoucherDetail[];
  sendBackFee?: string;
  storeName?: string;
  tradeNo?: string;
  errorCode?: string;
  success?: boolean;
}

export interface AlipayTradeRefundResponseParams {
  [key: string]: any;
}
