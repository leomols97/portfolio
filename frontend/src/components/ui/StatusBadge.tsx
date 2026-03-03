import React from 'react';

interface StatusBadgeProps {
  status: string;
  isAcademic?: boolean;
}

const statusStyles: Record<string, string> = {
  completed:
    'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  in_progress:
    'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
};

const statusLabels: Record<string, string> = {
  completed: 'Termine',
  in_progress: 'En cours',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, isAcademic }) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span
        data-testid={`status-badge-${status}`}
        className={`inline-flex items-center px-2.5 py-0.5 text-xs font-mono font-medium border rounded-full tracking-wide ${
          statusStyles[status] || 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
            status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'
          }`}
        />
        {statusLabels[status] || status}
      </span>
      {isAcademic && (
        <span
          data-testid="academic-badge"
          className="inline-flex items-center px-2.5 py-0.5 text-xs font-mono font-medium border rounded-full tracking-wide bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
        >
          Academique
        </span>
      )}
    </div>
  );
};

export default StatusBadge;
