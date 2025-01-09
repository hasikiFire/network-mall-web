import { PackageItem } from './PackageItem';
import { PayOrder } from './PayOrder';

export interface PackageRespDto {
  packageItem?: PackageItem;
  payOrder?: PayOrder;
}
