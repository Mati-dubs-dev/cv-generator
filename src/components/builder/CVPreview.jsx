'use client';

/**
 * CVPreview — Live preview panel with zoom controls and mouse-wheel zoom.
 *
 * v2 changes:
 *   - Local zoom state (default 0.82, step 0.10, range 0.4–1.4)
 *   - Mouse wheel zoom with Ctrl/Cmd held
 *   - ZoomControls overlay bottom-right
 *   - id="cv-preview" stays here (not inside templates) for html2pdf
 */

import { useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import useCVStore from '@/store/useCVStore';
import ZoomControls, { DEFAULT_ZOOM, STEP } from './ZoomControls';

const MIN_ZOOM = 0.4;
const MAX_ZOOM = 1.4;

// Load templates client-side only
const ModernTemplate     = dynamic(() => import('@/templates/ModernTemplate'),     { ssr: false });
const ClassicTemplate    = dynamic(() => import('@/templates/ClassicTemplate'),    { ssr: false });
const MinimalistTemplate = dynamic(() => import('@/templates/MinimalistTemplate'), { ssr: false });

const TEMPLATE_MAP = {
  modern:     ModernTemplate,
  classic:    ClassicTemplate,
  minimalist: MinimalistTemplate,
};

export default function CVPreview() {
  const { cvData, selectedTemplate } = useCVStore();
  const TemplateComponent = TEMPLATE_MAP[selectedTemplate] ?? ModernTemplate;

  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const containerRef = useRef(null);

  // ── Zoom helpers ──────────────────────────────────────────────────────────
  const clampZoom = (val) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, val));

  const zoomIn  = useCallback(() => setZoom((z) => clampZoom(+(z + STEP).toFixed(2))), []);
  const zoomOut = useCallback(() => setZoom((z) => clampZoom(+(z - STEP).toFixed(2))), []);
  const reset   = useCallback(() => setZoom(DEFAULT_ZOOM), []);

  // ── Mouse wheel zoom (Ctrl/Cmd + scroll) ──────────────────────────────────
  const handleWheel = useCallback((e) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    setZoom((z) => clampZoom(+(z + (e.deltaY < 0 ? STEP : -STEP)).toFixed(2)));
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex-1 bg-[#e2e2e2] overflow-auto relative"
      onWheel={handleWheel}
    >
      {/* Workspace — centers the A4 page */}
      <div className="flex justify-center py-10 px-6">
        {/*
         * Scale wrapper:
         *   - `zoom` controls the visual scale (CSS transform)
         *   - The real A4 div (#cv-preview) stays at 794px for html2pdf
         *   - marginBottom compensates vertical space after scale-down
         */}
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            // Shrink the container height so parent scrollbar is accurate
            marginBottom: `calc((${zoom} - 1) * 1123px)`,
            transition: 'transform 0.15s ease',
          }}
        >
          {/* id="cv-preview" — targeted by html2pdf, must stay here */}
          <div id="cv-preview" className="shadow-a4">
            <TemplateComponent data={cvData} />
          </div>
        </div>
      </div>

      {/* Zoom controls — floating bottom-right of preview pane */}
      <div className="sticky bottom-4 flex justify-end pr-4 pointer-events-none">
        <div className="pointer-events-auto">
          <ZoomControls
            zoom={zoom}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onReset={reset}
            min={MIN_ZOOM}
            max={MAX_ZOOM}
          />
        </div>
      </div>

      {/* Ctrl+scroll hint — shown only when not at default zoom */}
      {zoom !== DEFAULT_ZOOM && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[10px] px-2.5 py-1 rounded-full pointer-events-none select-none animate-fade-in">
          Ctrl + scroll para hacer zoom
        </div>
      )}
    </div>
  );
}
