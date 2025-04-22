import { getAdminPayOrderList, postAdminPayOrderRefund } from '@/api';
import { PageReqDto, RefundOrderReqDto } from '@/interface';
import dayjs from 'dayjs';

class Service {
  async getAllOrders(params: PageReqDto) {
    const res = await getAdminPayOrderList(params);
    if (res?.code !== 200 || !res.data?.list.length) return;

    res.data.list = res.data.list.map((item) => {
      return {
        ...item,

        createdAt: dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')
      };
    });
    return res.data;
  }

  async payOrderRefund(input: RefundOrderReqDto) {
    return await postAdminPayOrderRefund(input);
  }
}
const service = new Service();
export default service;
