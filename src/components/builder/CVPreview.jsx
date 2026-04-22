'use client';

import dynamic from 'next/dynamic';
import useCVStore from '@/store/useCVStore';

// Load templates client-side only (they use browser-specific features for PDF)
const ModernTemplate    = dynamic(() => import('@/templates/ModernTemplate'),    { ssr: false });
const ClassicTemplate   = dynamic(() => import('@/templates/ClassicTemplate'),   { ssr: false });
const MinimalistTemplate = dynamic(() => import('@/templates/MinimalistTemplate'), { ssr: false });

const TEMPLATE_MAP = {
  modern:     ModernTemplate,
  classic:    ClassicTemplate,
  minimalist: MinimalistTemplate,
};

export default function CVPreview() {
  const { cvData, selectedTemplate } = useCVStore();
  const TemplateComponent = TEMPLATE_MAP[selectedTemplate] ?? ModernTemplate;

  return (
    /**
     * Outer container: scrollable gray workspace, centers the A4 sheet.
     * The A4 is 794px wide. We scale it to ~82% so it fits comfortably
     * in a ~660px panel without horizontal scrolling, while preserving
     * the real 794px width that html2pdf reads for PDF generation.
     */
    <div className="flex-1 bg-[#e8e8e8] overflow-auto">
      <div className="flex justify-center py-8 px-4">
        {/* Scale wrapper — shrinks visually, not physically */}
        <div
          style={{
            transform: 'scale(0.82)',
            transformOrigin: 'top center',
            // Compensate height so the parent scrolls correctly
            height: 'fit-content',
            marginBottom: '-18%',
          }}
        >
          {/*
           * id="cv-preview" is placed HERE (not inside each template)
           * so html2pdf always targets the same element regardless of
           * which template is active.
           */}
          <div id="cv-preview" className="shadow-a4">
            <TemplateComponent data={cvData} />
          </div>
        </div>
      </div>
    </div>
  );
}
