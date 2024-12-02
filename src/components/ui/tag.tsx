import React from 'react';

interface TagProps {
  label: string;
  onDelete: () => void;
}

const Tag: React.FC<TagProps> = ({ label, onDelete }) => {
  return (
    <div className="relative flex items-center  rounded-md bg-primary-foreground px-1 py-1   text-white shadow  transition-colors    ">
      <span className="text-xs text-primary">{label}</span>
      <button
        onClick={onDelete}
        className="ml-1  text-xs text-gray-400 transition-colors hover:text-gray-600"
        aria-label={`Delete ${label}`}
      >
        ✕
      </button>
    </div>
  );
};

export default Tag;