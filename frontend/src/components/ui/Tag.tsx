import React from 'react';

interface TagProps {
  label: string;
  variant?: 'default' | 'outline';
}

const Tag: React.FC<TagProps> = ({ label, variant = 'default' }) => {
  const base = 'inline-flex items-center px-2 py-0.5 text-xs font-mono rounded-md transition-colors';
  const styles =
    variant === 'outline'
      ? 'border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400';

  return (
    <span data-testid={`tag-${label}`} className={`${base} ${styles}`}>
      {label}
    </span>
  );
};

export default Tag;
