'use client';

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
import useCVStore from '@/store/useCVStore';
import { RotateCcw, Sparkles, Eye, PencilLine } from 'lucide-react';

// Lazy-load the CV preview (references window/DOM)
const CVPreview = dynamic(() => import('@/components/builder/CVPreview'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 bg-gray-100 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-navy-900/20 border-t-navy-900 rounded-full animate-spin" />
    </div>
  ),
});

export default function BuilderClient() {
  const searchParams = useSearchParams();
  const { setTemplate, loadDemo, resetCV } = useCVStore();

  // Apply ?template=xxx URL param on first mount
  useEffect(() => {
    const t = searchParams.get('template');
    if (t && ['modern', 'classic', 'minimalist'].includes(t)) {
      setTemplate(t);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Mobile: switch between form and preview
  const [mobileTab, setMobileTab] = useState('form');

  const handleReset = () => {
    if (window.confirm('¿Limpiar todos los datos del CV?')) resetCV();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* ── Top toolbar ──────────────────────────────────────────────────────── */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 h-12 flex items-center justify-between gap-3">

          {/* Left actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={loadDemo}
              className="inline-flex items-center gap-1.5 text-xs font-600 text-electric hover:text-navy-900 transition-colors py-1.5 px-3 rounded-lg hover:bg-gray-100"
              title="Cargar datos de ejemplo para ver cómo queda"
            >
              <Sparkles size={13} />
              <span className="hidden sm:inline">Cargar ejemplo</span>
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-600 text-gray-400 hover:text-red-500 transition-colors py-1.5 px-3 rounded-lg hover:bg-red-50"
              title="Borrar todos los datos"
            >
              <RotateCcw size={13} />
              <span className="hidden sm:inline">Limpiar</span>
            </button>
          </div>

          {/* Center: mobile tabs (hidden on desktop) */}
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

          {/* Right: primary CTA */}
          <PDFExportButton className="text-xs py-2 px-4 shrink-0" />
        </div>
      </div>

      {/* ── Main two-column layout ────────────────────────────────────────────── */}
      {/* Offset: Header 64px + toolbar 48px = 112px */}
      <div className="flex flex-1 pt-[112px] max-w-screen-2xl w-full mx-auto">

        {/* ── Left: Form panel ──────────────────────────────────────────────── */}
        <aside
          className={`
            w-full md:w-[400px] lg:w-[460px] shrink-0
            h-[calc(100vh-112px)] overflow-y-auto sticky top-[112px]
            p-4 pb-0 bg-gray-50 border-r border-gray-200 no-scrollbar
            ${mobileTab === 'preview' ? 'hidden md:block' : 'block'}
          `}
        >
          <TemplateSelector />
          <PersonalInfoForm />
          <ExperienceForm />
          <EducationForm />
          <SkillsForm />

          {/* Bottom CTA + autosave note */}
          <div className="sticky bottom-0 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent pt-6 pb-4">
            <PDFExportButton className="w-full justify-center mb-2" />
            <p className="text-[10px] text-gray-400 text-center leading-relaxed">
              💾 Tus datos se guardan automáticamente en este navegador.
            </p>
          </div>
        </aside>

        {/* ── Right: Live preview ───────────────────────────────────────────── */}
        <section
          className={`
            flex-1 h-[calc(100vh-112px)] sticky top-[112px] overflow-auto
            ${mobileTab === 'form' ? 'hidden md:flex' : 'flex'}
          `}
        >
          <CVPreview />
        </section>
      </div>
    </div>
  );
}
