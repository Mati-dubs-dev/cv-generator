'use client';
import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { exportToPDF, buildFileName } from '@/utils/pdfExport';
import useCVStore from '@/store/useCVStore';

export default function PDFExportButton({ className = '' }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { cvData } = useCVStore();

  const handleExport = async () => {
    setLoading(true);
    setSuccess(false);
    try {
      const fileName = buildFileName(cvData.fullName);
      await exportToPDF('cv-preview', fileName);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert('Hubo un error al generar el PDF. Intenta de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <button
        disabled
        className={`btn-primary opacity-75 cursor-not-allowed ${className}`}
      >
        <Loader2 size={16} className="animate-spin" />
        Generando PDF...
      </button>
    );
  }

  if (success) {
    return (
      <button
        disabled
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white text-sm font-600 ${className}`}
      >
        ✓ ¡PDF descargado!
      </button>
    );
  }

  return (
    <button onClick={handleExport} className={`btn-primary ${className}`}>
      <Download size={16} />
      Descargar PDF
    </button>
  );
}
