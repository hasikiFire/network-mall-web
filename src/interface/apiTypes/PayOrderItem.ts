export interface PayOrderItem {
  id?: number;
  orderCode?: string;
  packageId?: number;
  packageUnit?: number;
  packageName?: string;
  packageDesc?: string;
  originalPrice?: number;
  salePrice?: number;
  discount?: number;
  discountStartDate?: string;
  discountEndDate?: string;
  dataAllowance?: number;
  deviceLimit?: number;
  speedLimit?: number;
  deleted?: number;
  createdAt?: string;
  updatedAt?: string;
  _dataAllowance?: string;
  _packageUnit?: string;
}
