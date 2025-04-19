import { getAdminPacakgeGetAlllist } from '@/api';
import { PackageListReqDto } from '@/interface';
import { bToGB } from '@/lib/format';
import dayjs from 'dayjs';

class Service {
  async getPacakgeGetlist(params: PackageListReqDto) {
    const res = await getAdminPacakgeGetAlllist(params);
    if (res?.code !== 200 || !res.data?.list.length) return;

    res.data.list = res.data.list.map((item) => {
      return {
        ...item,
        dataAllowance: bToGB(item.dataAllowance ?? 0),
        createdAt: dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')
      };
    });
    return res.data;
  }
}
export default new Service();
