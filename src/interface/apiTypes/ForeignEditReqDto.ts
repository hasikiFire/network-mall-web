export interface ForeignEditReqDto {
  /** 服务器ID，传则为编辑 */
  foreignId?: number;
  /** 服务器的名称 */
  serverName: string;
  /** 服务器的服务商 */
  supplier?: string;
  /** 服务器的域名(会变动) */
  domainName: string;
  /** 服务器的IP地址(会变动) */
  ipAddress?: string;
  /** 服务器启动日期 */
  startDate?: string;
  /** 每月费用，单位（美元） */
  monthlyFee?: number;
  /** 服务器每月的总流量（以B为单位） */
  totalMonthlyDataTransfer?: number;
  /** 服务器已消耗的流量（以B为单位） */
  consumedDataTransfer?: number;
  /** 服务器的操作系统 */
  operatingSystem?: string;
  /** 服务器的CPU核心数 */
  cpuCores?: number;
  /** 服务器的总RAM大小（以GB为单位） */
  ramGb?: number;
  /** 服务器剩余的RAM大小（以GB为单位） */
  remainingRamGb?: number;
  /** 服务器的总存储大小（以GB为单位） */
  storageGb?: number;
  /** 服务器已使用的存储大小（以GB为单位） */
  consumedStorageGb?: number;
  /** 服务器的状态。0: 停止 1：活动，2：过期 */
  status: number;
}
