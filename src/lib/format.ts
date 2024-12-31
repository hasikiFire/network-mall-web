export const formatTraffic = (bytes: number): string => {
  if (!bytes) return '不限制';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(0)} ${units[unitIndex]}`;
};
