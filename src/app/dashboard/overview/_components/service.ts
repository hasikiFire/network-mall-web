import { getUsageRecordDetail, getUserGetSubscribe } from '@/api';
import { getRemainingTime } from '@/lib/date';

class Service {
  async getRecordDetail() {
    const res = await getUsageRecordDetail();

    const data = res.data;
    if (data) {
      data._endTime = getRemainingTime(data.purchaseEndTime);
    }

    return data;
  }

  async getSubscribeLink() {
    const res = await getUserGetSubscribe();
    return res.data;
  }
}
export default new Service();
