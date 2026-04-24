'use client';

/**
 * PDFExportButton — Triggers PDF generation with visual state feedback.
 *
 * v2: Uses onProgress callback from exportToPDF for more reliable state.
 */

import { useState } from 'react';
import { Download, Loader2, CheckCircle } from 'lucide-react';
import { exportToPDF, buildFileName } from '@/utils/pdfExport';
import useCVStore from '@/store/useCVStore';

export default function PDFExportButton({ className = '' }) {
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'done' | 'error'
  const { cvData } = useCVStore();

  const handleExport = async () => {
    if (status === 'loading') return;
    setStatus('loading');

    try {
      const fileName = buildFileName(cvData.fullName);
      await exportToPDF('cv-preview', fileName, (phase) => {
        if (phase === 'done')  setStatus('done');
        if (phase === 'error') setStatus('error');
      });
      // Fallback if onProgress was not called
      setTimeout(() => setStatus((s) => (s === 'loading' ? 'idle' : s)), 8000);
    } catch {
      setStatus('error');
    }

    // Reset button after 3s
    setTimeout(() => setStatus('idle'), 3000);
  };

  // ── Button variants ──────────────────────────────────────────────────────
  if (status === 'loading') {
    return (
      <button disabled className={`btn-primary opacity-75 cursor-not-allowed ${className}`}>
        <Loader2 size={15} className="animate-spin" />
        Generando PDF...
      </button>
    );
  }

  if (status === 'done') {
    return (
      <button disabled className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white text-sm font-600 ${className}`}>
        <CheckCircle size={15} />
        ¡Descargado!
      </button>
    );
  }

  if (status === 'error') {
    return (
      <button onClick={handleExport} className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-600 transition-colors ${className}`}>
        <Download size={15} />
        Reintentar
      </button>
    );
  }

  return (
    <button onClick={handleExport} className={`btn-primary ${className}`}>
      <Download size={15} />
      Descargar PDF
    </button>
  );
}
