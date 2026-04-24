'use client';

/**
 * ZoomControls — Preview zoom buttons for the CV preview panel.
 *
 * Props:
 *   zoom       — current zoom level (number, e.g. 0.82)
 *   onZoomIn   — callback
 *   onZoomOut  — callback
 *   onReset    — callback
 *   min        — minimum zoom (default 0.4)
 *   max        — maximum zoom (default 1.4)
 */

import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

const DEFAULT_ZOOM = 0.82;
const STEP = 0.1;

export { DEFAULT_ZOOM, STEP };

export default function ZoomControls({ zoom, onZoomIn, onZoomOut, onReset, min = 0.4, max = 1.4 }) {
  const pct = Math.round(zoom * 100);

  return (
    <div className="flex items-center gap-0.5 bg-white/90 backdrop-blur rounded-xl border border-gray-200 shadow-sm px-1 py-1">
      {/* Zoom out */}
      <button
        onClick={onZoomOut}
        disabled={zoom <= min}
        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-navy-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        title="Alejar"
      >
        <ZoomOut size={14} />
      </button>

      {/* Percentage display */}
      <button
        onClick={onReset}
        className="px-2 h-7 text-[11px] font-700 text-gray-600 hover:text-navy-900 hover:bg-gray-100 rounded-lg transition-all min-w-[44px] text-center"
        title="Restablecer zoom"
      >
        {pct}%
      </button>

      {/* Zoom in */}
      <button
        onClick={onZoomIn}
        disabled={zoom >= max}
        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-navy-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        title="Acercar"
      >
        <ZoomIn size={14} />
      </button>

      {/* Reset to fit */}
      <div className="w-px h-4 bg-gray-200 mx-0.5" />
      <button
        onClick={onReset}
        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-navy-900 transition-all"
        title="Restablecer vista"
      >
        <Maximize2 size={13} />
      </button>
    </div>
  );
}
