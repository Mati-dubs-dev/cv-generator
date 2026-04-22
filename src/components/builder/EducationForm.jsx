'use client';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import useCVStore from '@/store/useCVStore';

function EducationEntry({ edu, index }) {
  const { updateEducation, removeEducation } = useCVStore();
  const [open, setOpen] = useState(index === 0);

  const title = edu.institution || edu.degree
    ? `${edu.degree || '—'}${edu.institution ? ` · ${edu.institution}` : ''}`
    : `Educación ${index + 1}`;

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 cursor-pointer" onClick={() => setOpen(!open)}>
        <p className="text-sm font-600 text-navy-900 truncate max-w-[200px]">{title}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); removeEducation(edu.id); }}
            className="p-1 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-400 transition-colors"
          >
            <Trash2 size={14} />
          </button>
          {open ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
        </div>
      </div>

      {open && (
        <div className="p-4 grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="cv-label">Institución</label>
            <input className="cv-input" placeholder="Universidad, Instituto, etc." value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} />
          </div>

          <div>
            <label className="cv-label">Título / Tipo</label>
            <input className="cv-input" placeholder="Licenciatura, Técnico..." value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} />
          </div>

          <div>
            <label className="cv-label">Campo de estudio</label>
            <input className="cv-input" placeholder="Ingeniería en Sistemas..." value={edu.field} onChange={(e) => updateEducation(edu.id, 'field', e.target.value)} />
          </div>

          <div>
            <label className="cv-label">Inicio</label>
            <input type="month" className="cv-input" value={edu.startDate} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} />
          </div>

          <div>
            <label className="cv-label">Fin</label>
            <input type="month" className="cv-input" value={edu.endDate} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} />
          </div>

          <div className="col-span-2">
            <label className="cv-label">Descripción (opcional)</label>
            <textarea
              className="cv-textarea"
              rows={2}
              placeholder="Promedio, tesis, actividades relevantes..."
              value={edu.description}
              onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function EducationForm() {
  const { cvData, addEducation } = useCVStore();

  return (
    <div className="form-card">
      <div className="flex items-center justify-between mb-4">
        <p className="section-title mb-0">
          <span>🎓</span> Educación
        </p>
        <button onClick={addEducation} className="btn-secondary text-xs py-1.5 px-3">
          <Plus size={13} /> Agregar
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {cvData.education.map((edu, i) => (
          <EducationEntry key={edu.id} edu={edu} index={i} />
        ))}
      </div>
    </div>
  );
}
