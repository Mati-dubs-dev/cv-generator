'use client';
import useCVStore from '@/store/useCVStore';
import { Check } from 'lucide-react';

const TEMPLATES = [
  {
    id: 'modern',
    name: 'Moderno',
    description: 'Barra lateral oscura',
    color: '#0F172A',
  },
  {
    id: 'classic',
    name: 'Clásico',
    description: 'Elegante y formal',
    color: '#374151',
  },
  {
    id: 'minimalist',
    name: 'Minimalista',
    description: 'Tipografía protagonista',
    color: '#9CA3AF',
  },
];

export default function TemplateSelector() {
  const { selectedTemplate, setTemplate } = useCVStore();

  return (
    <div className="form-card">
      <p className="section-title">
        <span className="w-5 h-5 rounded bg-navy-900 text-white text-[10px] flex items-center justify-center font-700">
          🎨
        </span>
        Plantilla
      </p>

      <div className="flex flex-col gap-2">
        {TEMPLATES.map((t) => {
          const active = selectedTemplate === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all duration-150 ${
                active
                  ? 'border-navy-900 bg-navy-50'
                  : 'border-gray-100 hover:border-gray-200 bg-white'
              }`}
            >
              {/* Color swatch */}
              <div
                className="w-8 h-8 rounded-lg shrink-0"
                style={{ backgroundColor: t.color }}
              />

              {/* Text */}
              <div className="flex-1">
                <p className="text-sm font-700 text-navy-900">{t.name}</p>
                <p className="text-xs text-gray-500">{t.description}</p>
              </div>

              {/* Check */}
              {active && (
                <div className="w-5 h-5 rounded-full bg-navy-900 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
