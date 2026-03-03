import React from 'react';

interface FilterBarProps {
  filters: {
    status: string;
    type: string;
    academic: string;
  };
  onFilterChange: (key: string, value: string) => void;
  allTypes: string[];
}

const TYPE_LABELS: Record<string, string> = {
  '': 'Tous',
  frontend: 'Frontend',
  backend: 'Backend',
  fullstack: 'Fullstack',
  devops: 'DevOps',
  infra: 'Infrastructure',
};

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, allTypes }) => {
  const btnBase =
    'px-3 py-1.5 text-xs font-mono tracking-wide rounded-lg border transition-all duration-200';
  const btnActive =
    'bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100';
  const btnInactive =
    'bg-transparent text-zinc-500 dark:text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300';

  return (
    <div data-testid="filter-bar" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mr-2">
          Statut
        </span>
        {[
          { value: '', label: 'Tous' },
          { value: 'completed', label: 'Termine' },
          { value: 'in_progress', label: 'En cours' },
        ].map((opt) => (
          <button
            key={opt.value}
            data-testid={`filter-status-${opt.value || 'all'}`}
            onClick={() => onFilterChange('status', opt.value)}
            className={`${btnBase} ${
              filters.status === opt.value ? btnActive : btnInactive
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mr-2">
          Type
        </span>
        <button
          data-testid="filter-type-all"
          onClick={() => onFilterChange('type', '')}
          className={`${btnBase} ${
            filters.type === '' ? btnActive : btnInactive
          }`}
        >
          Tous
        </button>
        {allTypes.map((t) => (
          <button
            key={t}
            data-testid={`filter-type-${t}`}
            onClick={() => onFilterChange('type', t)}
            className={`${btnBase} ${
              filters.type === t ? btnActive : btnInactive
            }`}
          >
            {TYPE_LABELS[t] || t}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mr-2">
          Categorie
        </span>
        {[
          { value: '', label: 'Tous' },
          { value: 'professional', label: 'Professionnel' },
          { value: 'academic', label: 'Academique' },
        ].map((opt) => (
          <button
            key={opt.value}
            data-testid={`filter-academic-${opt.value || 'all'}`}
            onClick={() => onFilterChange('academic', opt.value)}
            className={`${btnBase} ${
              filters.academic === opt.value ? btnActive : btnInactive
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
