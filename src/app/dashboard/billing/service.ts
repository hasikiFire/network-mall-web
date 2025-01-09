import {
  getPayOrderList,
  getPayOrderItemDetail,
  postPayOrderCancel
} from '@/api/pay-order-controller';
import {
  OrderStatusChinese,
  PayStatusChinese
} from '@/interface/apiTypes/PayOrder';
import { bToGB } from '@/lib/format';
import dayjs from 'dayjs';
/**
 * 将月份格式化为中文描述
 * @param packageUnit 计费周期，单位为月份
 * @returns 格式化后的中文描述
 */
function formatPackageUnit(packageUnit: number): string {
  if (packageUnit === 1) {
    return '1个月';
  } else if (packageUnit === 6) {
    return '半年';
  } else if (packageUnit === 12) {
    return '1年';
  } else {
    return `${packageUnit}个月`;
  }
}

class Service {
  async getOrderList() {
    const res = await getPayOrderList();
    if (res.code !== 200 || !res.data?.length) return [];
    let data = res.data;
    data = data.map((item) => {
      return {
        ...item,
        _orderStatus: OrderStatusChinese[item.orderStatus],
        createdAt: dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        _packageUnit: formatPackageUnit(item.packageUnit)
      };
    });
    return data;
  }

  async getOrderDetail(orderCode: string) {
    const res = await getPayOrderItemDetail({ orderCode });
    if (res.code !== 200 || !res.data) return null;

    return {
      ...res.data,
      _packageUnit: formatPackageUnit(res.data.packageUnit),
      _dataAllowance: `${bToGB(res.data.dataAllowance)}GB`
    };
  }

  async cancelOrder(orderCode: string) {
    const res = await postPayOrderCancel({ orderCode });
    if (res.code !== 200) return false;
    return true;
  }
}
export default new Service();
