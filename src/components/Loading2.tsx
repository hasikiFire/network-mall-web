import React from 'react';
import DotLoader from 'react-spinners/DotLoader';
import { createPortal } from 'react-dom';
import colors from '@/lib/color';

type LoadingProps = {
  loading: boolean; // 控制加载遮罩的显示
  color?: string; // 加载器的颜色
  size?: number; // 加载器的大小
  title?: string;
};

const Loading2: React.FC<LoadingProps> = ({
  loading,
  color = colors.light.primary, // 默认主题色
  size = 50,
  title
}) => {
  if (!loading) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-opacity-60 text-lg">
      <DotLoader color={color} size={size} />
      {title && <p className="ml-2 mt-4 text-lg  text-primary ">{title}</p>}
    </div>,
    document.body
  );
};

export default Loading2;
