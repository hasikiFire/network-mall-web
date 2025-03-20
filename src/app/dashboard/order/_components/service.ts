import { buyPackage, pollOrder } from '@/api';
import {
  getUserCouponValidate,
  GetUserCouponValidateParams
} from '@/api/user-coupon-controller';
import { PackageBuyReqDto } from '@/interface';

export interface IDiscount {
  amount: number;
  discount_type: 'percentage'; // 假设 discount_type 可以是 "percentage"
}

class Service {
  async CouponValidate(params: GetUserCouponValidateParams) {
    const res = await getUserCouponValidate(params);
    if (res.code === 200) {
      return res.data;
    }
  }

  async buyPackageItem(params: PackageBuyReqDto) {
    const res = await buyPackage(params);
    if (res.code === 200) {
      return res.data;
    }
  }

  async pollOrder(params: { orderCode: string }) {
    const res = await pollOrder(params);
    if (res.code === 200) {
      return res.data;
    }
  }
}
export default new Service();
