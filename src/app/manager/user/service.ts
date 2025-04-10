import {
  getAdminUserGetList,
  GetAdminUserGetListParams,
  postAdminUserUpdate
} from '@/api';
import { UserEditDto } from '@/interface';
import dayjs from 'dayjs';

class Service {
  async getUserList(params: GetAdminUserGetListParams) {
    const res = await getAdminUserGetList(params);
    if (res.code !== 200 || !res.data?.list.length) return;

    res.data.list = res.data.list.map((item) => {
      return {
        ...item,
        createdAt: dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')
      };
    });
    return res.data;
  }

  async adminUserUpdate(params: UserEditDto) {
    const res = await postAdminUserUpdate(params);
    if (res.code !== 200) return res.data;
  }
}
// 先实例化并赋值给具名变量
const serviceInstance = new Service();
export default serviceInstance;
