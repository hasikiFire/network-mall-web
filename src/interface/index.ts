export * from './apiTypes/ForeignEditReqDto';
export * from './apiTypes/RestRespVoid';
export * from './apiTypes/UsersendEmailCodeDto';
export * from './apiTypes/UserRegisterReqDto';
export * from './apiTypes/RestRespUserRegisterRespDto';
export * from './apiTypes/UserRegisterRespDto';
export * from './apiTypes/UserLoginReqDto';
export * from './apiTypes/RestRespUserLoginRespDto';
export * from './apiTypes/UserLoginRespDto';
export * from './apiTypes/CancelOrderReqDto';
export * from './apiTypes/RestRespBoolean';
export * from './apiTypes/PackageBuyReqDto';
export * from './apiTypes/PayResponse';
export * from './apiTypes/RestRespPayResponse';
export * from './apiTypes/UserEditDto';
export * from './apiTypes/RestRespUser';
export * from './apiTypes/User';
export * from './apiTypes/UserCreateDto';
export * from './apiTypes/RestRespString';
export * from './apiTypes/UsageRecordEditReqDto';
export * from './apiTypes/RestRespUsageRecord';
export * from './apiTypes/UsageRecord';
export * from './apiTypes/RefundOrderReqDto';
export * from './apiTypes/AlipayTradeRefundResponse';
export * from './apiTypes/ContributeDetail';
export * from './apiTypes/PresetPayToolInfo';
export * from './apiTypes/RefundChargeInfo';
export * from './apiTypes/RefundOrderRespDto';
export * from './apiTypes/RefundSubFee';
export * from './apiTypes/RestRespRefundOrderRespDto';
export * from './apiTypes/TradeFundBill';
export * from './apiTypes/VoucherDetail';
export * from './apiTypes/PackageEditReqDto';
export * from './apiTypes/PackageAddReqDto';
export * from './apiTypes/PackageItem';
export * from './apiTypes/PackageRespDto';
export * from './apiTypes/PayOrder';
export * from './apiTypes/RestRespPackageRespDto';
export * from './apiTypes/RestRespUserCoupon';
export * from './apiTypes/UserCoupon';
export * from './apiTypes/RestRespListUserCoupon';
export * from './apiTypes/RestRespUserInfoRespDto';
export * from './apiTypes/UserInfoRespDto';
export * from './apiTypes/PayOrderItem';
export * from './apiTypes/RestRespPayOrderItem';
export * from './apiTypes/AlipayTradeQueryResponse';
export * from './apiTypes/BkAgentRespInfo';
export * from './apiTypes/ChargeInfo';
export * from './apiTypes/EnterprisePayInfo';
export * from './apiTypes/FulfillmentDetail';
export * from './apiTypes/GoodsDetail';
export * from './apiTypes/HbFqPayInfo';
export * from './apiTypes/IntactChargeInfo';
export * from './apiTypes/PaymentInfoWithId';
export * from './apiTypes/PollOrdersRespDto';
export * from './apiTypes/RestRespPollOrdersRespDto';
export * from './apiTypes/SubFee';
export * from './apiTypes/TapPayInfo';
export * from './apiTypes/TradeSettleDetail';
export * from './apiTypes/TradeSettleInfo';
export * from './apiTypes/RestRespListPayOrder';
export * from './apiTypes/PageReqDto';
export * from './apiTypes/PackageListRespDto';
export * from './apiTypes/PageRespDtoPackageListRespDto';
export * from './apiTypes/RestRespPageRespDtoPackageListRespDto';
export * from './apiTypes/Config';
export * from './apiTypes/RestRespListConfig';
export * from './apiTypes/UserListReqDto';
export * from './apiTypes/PageRespDtoUserListRespDto';
export * from './apiTypes/RestRespPageRespDtoUserListRespDto';
export * from './apiTypes/UserListRespDto';
export * from './apiTypes/UsageRecordListReqDto';
export * from './apiTypes/PageRespDtoUsageRecordListRespDto';
export * from './apiTypes/RestRespPageRespDtoUsageRecordListRespDto';
export * from './apiTypes/UsageRecordListRespDto';
export * from './apiTypes/PageRespDtoPayOrder';
export * from './apiTypes/RestRespPageRespDtoPayOrder';
export * from './apiTypes/PackageListReqDto';
export * from './apiTypes/ForeignServer';
export * from './apiTypes/RestRespForeignServer';
export * from './apiTypes/ForeignServerListReqDto';
export * from './apiTypes/ForeignServerListRespDto';
export * from './apiTypes/PageRespDtoForeignServerListRespDto';
export * from './apiTypes/RestRespPageRespDtoForeignServerListRespDto';

export type Primitive = undefined | null | boolean | string | number | symbol;
export type DeepRequired<T> = T extends Primitive
  ? T
  : keyof T extends never
  ? T
  : { [K in keyof T]-?: DeepRequired<T[K]> };
