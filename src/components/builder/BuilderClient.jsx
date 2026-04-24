'use client';

/**
 * BuilderClient — Main CV editor layout.
 *
 * v2 changes:
 *   - useAutoSave hook for debounced save status
 *   - SaveStatus indicator in toolbar
 *   - ProgressBar above the form
 *   - Improved toolbar layout and spacing
 */

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import PersonalInfoForm from '@/components/builder/PersonalInfoForm';
import ExperienceForm from '@/components/builder/ExperienceForm';
import EducationForm from '@/components/builder/EducationForm';
import SkillsForm from '@/components/builder/SkillsForm';
import TemplateSelector from '@/components/builder/TemplateSelector';
import PDFExportButton from '@/components/builder/PDFExportButton';
import ProgressBar from '@/components/builder/ProgressBar';
import SaveStatus from '@/components/builder/SaveStatus';
import useCVStore from '@/store/useCVStore';
import { useAutoSave } from '@/hooks/useAutoSave';
import { RotateCcw, Sparkles, Eye, PencilLine } from 'lucide-react';

// Lazy-load the CV preview (references window/DOM)
const CVPreview = dynamic(() => import('@/components/builder/CVPreview'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 bg-[#e2e2e2] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-navy-900/20 border-t-navy-900 rounded-full animate-spin" />
    </div>
  ),
});

export default function BuilderClient() {
  const searchParams = useSearchParams();
  const { setTemplate, loadDemo, resetCV } = useCVStore();

  // Activate autosave on mount
  useAutoSave();

  // Apply ?template=xxx URL param on first mount
  useEffect(() => {
    const t = searchParams.get('template');
    if (t && ['modern', 'classic', 'minimalist'].includes(t)) {
      setTemplate(t);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Mobile tab state
  const [mobileTab, setMobileTab] = useState('form');

  const handleReset = () => {
    if (window.confirm('¿Limpiar todos los datos del CV?')) resetCV();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* ── Toolbar (fixed, below header) ─────────────────────────────────── */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 h-12 flex items-center justify-between gap-3">

          {/* Left: demo + reset + save status */}
          <div className="flex items-center gap-1">
            <button
              onClick={loadDemo}
              className="inline-flex items-center gap-1.5 text-xs font-600 text-electric hover:text-navy-900 transition-colors py-1.5 px-3 rounded-lg hover:bg-gray-100"
              title="Cargar datos de ejemplo"
            >
              <Sparkles size={13} />
              <span className="hidden sm:inline">Ejemplo</span>
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-600 text-gray-400 hover:text-red-500 transition-colors py-1.5 px-3 rounded-lg hover:bg-red-50"
              title="Borrar todos los datos"
            >
              <RotateCcw size={13} />
              <span className="hidden sm:inline">Limpiar</span>
            </button>
            {/* Auto-save status indicator */}
            <div className="hidden sm:block pl-1">
              <SaveStatus />
            </div>
          </div>

          {/* Center: mobile tabs */}
          <div className="flex md:hidden items-center rounded-xl border border-gray-200 overflow-hidden shrink-0">
            <button
              onClick={() => setMobileTab('form')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-600 transition-colors ${
                mobileTab === 'form'
                  ? 'bg-navy-900 text-white'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <PencilLine size={13} /> Editar
            </button>
            <button
              onClick={() => setMobileTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-600 transition-colors ${
                mobileTab === 'preview'
                  ? 'bg-navy-900 text-white'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Eye size={13} /> Previsualizar
            </button>
          </div>

          {/* Right: download */}
          <PDFExportButton className="text-xs py-2 px-4 shrink-0" />
        </div>
      </div>

      {/* ── Main layout (Header 64px + Toolbar 48px = 112px offset) ─────────── */}
      <div className="flex flex-1 pt-[112px] max-w-screen-2xl w-full mx-auto">

        {/* ── Left: Form panel ────────────────────────────────────────────── */}
        <aside
          className={`
            w-full md:w-[400px] lg:w-[460px] shrink-0
            h-[calc(100vh-112px)] overflow-y-auto sticky top-[112px]
            bg-[#f4f4f5] border-r border-gray-200 no-scrollbar
            ${mobileTab === 'preview' ? 'hidden md:block' : 'block'}
          `}
        >
          <div className="p-4 pb-0">
            {/* Progress bar — always visible at top */}
            <ProgressBar />

            {/* Form sections */}
            <TemplateSelector />
            <PersonalInfoForm />
            <ExperienceForm />
            <EducationForm />
            <SkillsForm />

            {/* Bottom CTA */}
            <div className="sticky bottom-0 bg-gradient-to-t from-[#f4f4f5] via-[#f4f4f5] to-transparent pt-6 pb-4">
              <PDFExportButton className="w-full justify-center mb-2" />
              <p className="text-[10px] text-gray-400 text-center">
                💾 Guardado automáticamente en tu navegador.
              </p>
            </div>
          </div>
        </aside>

        {/* ── Right: Live preview ──────────────────────────────────────────── */}
        <section
          className={`
            flex-1 h-[calc(100vh-112px)] sticky top-[112px] overflow-hidden
            ${mobileTab === 'form' ? 'hidden md:flex' : 'flex'}
          `}
        >
          <CVPreview />
        </section>
      </div>
    </div>
  );
}
