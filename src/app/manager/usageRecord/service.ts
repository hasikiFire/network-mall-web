import { getAdminUsageRecordGetList } from '@/api';
import { PurchaseStatusChinese, UsageRecordListReqDto } from '@/interface';
import { bToGB } from '@/lib/format';
import dayjs from 'dayjs';

class Service {
  async getAllUsageRecordList(params: UsageRecordListReqDto) {
    const res = await getAdminUsageRecordGetList(params);
    if (res.code !== 200 || !res.data?.list.length) return;

    res.data.list = res.data.list.map((item) => {
      return {
        ...item,
        speedLimit: bToGB(item.speedLimit),
        dataAllowance: bToGB(item.dataAllowance),
        consumedDataTransfer: bToGB(item.consumedDataTransfer),
        consumedDataDownload: bToGB(item.consumedDataDownload),
        consumedDataUpload: bToGB(item.consumedDataUpload),
        nextResetDate: dayjs(item.nextResetDate).format('YYYY-MM-DD'),
        purchaseStartTime: dayjs(item.purchaseStartTime).format('YYYY-MM-DD'),
        purchaseEndTime: dayjs(item.purchaseEndTime).format('YYYY-MM-DD'),
        _purchaseStatus:
          PurchaseStatusChinese[
            (item.purchaseStatus ?? 0) as keyof typeof PurchaseStatusChinese
          ],
        createdAt: dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')
      };
    });
    return res.data;
  }
}
export default new Service();
