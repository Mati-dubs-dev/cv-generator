'use client';

/**
 * ExperienceForm — Work experience section.
 * v2: Added AIImproveButton on each experience description field.
 */

import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import useCVStore from '@/store/useCVStore';
import AIImproveButton from './AIImproveButton';

function ExperienceEntry({ exp, index }) {
  const { updateExperience, removeExperience } = useCVStore();
  const [open, setOpen] = useState(index === 0);

  const title =
    exp.position || exp.company
      ? `${exp.position || '—'}${exp.company ? ` @ ${exp.company}` : ''}`
      : `Experiencia ${index + 1}`;

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <div
        className="flex items-center justify-between px-4 py-3 bg-gray-50 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <p className="text-sm font-600 text-navy-900 truncate max-w-[200px]">{title}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); removeExperience(exp.id); }}
            className="p-1 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-400 transition-colors"
            title="Eliminar"
          >
            <Trash2 size={14} />
          </button>
          {open ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
        </div>
      </div>

      {open && (
        <div className="p-4 grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="cv-label">Empresa</label>
            <input className="cv-input" placeholder="Nombre de la empresa" value={exp.company}
              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} />
          </div>

          <div className="col-span-2">
            <label className="cv-label">Puesto / Rol</label>
            <input className="cv-input" placeholder="Ej: Desarrollador Frontend" value={exp.position}
              onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} />
          </div>

          <div>
            <label className="cv-label">Fecha inicio</label>
            <input type="month" className="cv-input" value={exp.startDate}
              onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} />
          </div>

          <div>
            <label className="cv-label">Fecha fin</label>
            <input type="month" className="cv-input" value={exp.endDate} disabled={exp.current}
              onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} />
            <label className="flex items-center gap-1.5 mt-1.5 cursor-pointer">
              <input type="checkbox" checked={exp.current} className="accent-navy-900"
                onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)} />
              <span className="text-xs text-gray-500">Trabajo actual</span>
            </label>
          </div>

          <div className="col-span-2">
            <div className="flex items-center justify-between mb-1">
              <label className="cv-label mb-0">Descripción</label>
              <AIImproveButton
                fieldKey="experience-description"
                currentValue={exp.description}
                context={`Empresa: ${exp.company}, Puesto: ${exp.position}`}
                updateFn={(improved) => updateExperience(exp.id, 'description', improved)}
              />
            </div>
            <textarea className="cv-textarea" rows={3}
              placeholder="Describí tus responsabilidades y logros más relevantes..."
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExperienceForm() {
  const { cvData, addExperience } = useCVStore();
  return (
    <div className="form-card">
      <div className="flex items-center justify-between mb-4">
        <p className="section-title mb-0"><span>💼</span> Experiencia laboral</p>
        <button onClick={addExperience} className="btn-secondary text-xs py-1.5 px-3">
          <Plus size={13} /> Agregar
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {cvData.experience.map((exp, i) => (
          <ExperienceEntry key={exp.id} exp={exp} index={i} />
        ))}
      </div>
    </div>
  );
}
