import { IPlanItem } from '@/store/usePlanStore';
import { serverFetch } from '@/lib/serverFetch';
import { PageRespDtoPackageListRespDto } from '@/interface';
import { bToGB } from '@/lib/format';

export async function fetchPlanList(): Promise<IPlanItem[]> {
  try {
    const data = await serverFetch<PageRespDtoPackageListRespDto>(
      '/package/getList?fetchAll=true'
    );

    if (!data?.data?.list || !Array.isArray(data.data.list)) {
      console.error('no plan list found');
      return [];
    }

    return data.data.list.map((v) => ({
      id: v.id ?? 0,
      title: v.packageName ?? '',
      basePrice: v.salePrice ?? 0,
      features: [v.packageDesc ?? ''],
      ipLimit: v.deviceLimit ?? 0,
      traffic: bToGB(v.dataAllowance ?? 0),
      speedLimit: v.speedLimit ?? 0
    }));
  } catch (error) {
    console.error('Error fetching plan list:', error);
    return [];
  }
}
