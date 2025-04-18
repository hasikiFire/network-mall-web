'use client';

import { useDialog } from '@/components/dialog/dialog-provider';

// 客户端调用
export function useAlert() {
  const { openDialog } = useDialog();

  const alert = ({
    title,
    cancelText = '取消',
    confirmText = '确认'
  }: {
    title: string;
    cancelText: string;
    confirmText: string;
  }) => {
    return openDialog({
      title: title,
      cancelText: cancelText,
      confirmText: confirmText
    }).then(() => true);
  };

  const confirm = ({
    title,
    cancelText = '取消',
    confirmText = '确认'
  }: {
    title: string;
    cancelText?: string;
    confirmText?: string;
  }) => {
    return openDialog({
      title: title,
      cancelText: cancelText,
      confirmText: confirmText
    });
  };

  return { alert, confirm };
}

// 全局挂载（可选）
declare global {
  interface Window {
    nextAlert: (message: string) => Promise<boolean>;
    nextConfirm: (message: string) => Promise<boolean>;
  }
}
