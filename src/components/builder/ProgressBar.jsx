'use client';

/**
 * ProgressBar — CV completion indicator.
 *
 * Shows a horizontal bar with percentage and label.
 * Color shifts: red → amber → green based on completion.
 * Tooltip shows pending items on hover.
 */

import { useProgress } from '@/hooks/useProgress';

export default function ProgressBar() {
  const { percent, label, pending } = useProgress();

  // Color scheme based on completion level
  const barColor =
    percent >= 75
      ? 'bg-green-500'
      : percent >= 45
      ? 'bg-amber-400'
      : 'bg-red-400';

  const textColor =
    percent >= 75
      ? 'text-green-600'
      : percent >= 45
      ? 'text-amber-600'
      : 'text-red-500';

  return (
    <div className="form-card py-3 px-4 mb-4">
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-600 text-navy-900">Completitud del CV</p>
        <span className={`text-xs font-700 ${textColor}`}>
          {percent}% — {label}
        </span>
      </div>

      {/* Progress track */}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`}
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Pending items hint */}
      {pending.length > 0 && percent < 90 && (
        <p className="text-[10px] text-gray-400 mt-1.5 leading-relaxed">
          Falta:{' '}
          {pending.slice(0, 4).join(', ')}
          {pending.length > 4 && ` y ${pending.length - 4} más`}.
        </p>
      )}
    </div>
  );
}
