export interface ForeignServer {
  id?: number;
  serverName?: string;
  supplier?: string;
  domainName?: string;
  ipAddress?: string;
  port?: number;
  startDate?: string;
  monthlyFee?: number;
  totalMonthlyDataTransfer?: number;
  consumedDataTransfer?: number;
  operatingSystem?: string;
  cpuCores?: number;
  ramGb?: number;
  remainingRamGb?: number;
  storageGb?: number;
  consumedStorageGb?: number;
  status?: number;
  isBeyondTransfer?: number;
  deleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
