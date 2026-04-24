'use client';

/**
 * PersonalInfoForm — Personal information section of the CV builder.
 * v2: Integrates PhotoUpload component and AI-improved summary button.
 */

import useCVStore from '@/store/useCVStore';
import PhotoUpload from './PhotoUpload';
import AIImproveButton from './AIImproveButton';

const FIELDS = [
  { key: 'fullName',          label: 'Nombre completo',     placeholder: 'Ej: María González',           type: 'text',  col: 'full' },
  { key: 'professionalTitle', label: 'Título profesional',  placeholder: 'Ej: Desarrolladora Full Stack', type: 'text',  col: 'full' },
  { key: 'email',             label: 'Email',               placeholder: 'tu@email.com',                  type: 'email', col: 'half' },
  { key: 'phone',             label: 'Teléfono',            placeholder: '+54 11 1234-5678',              type: 'tel',   col: 'half' },
  { key: 'location',          label: 'Ubicación',           placeholder: 'Buenos Aires, Argentina',       type: 'text',  col: 'half' },
  { key: 'website',           label: 'Sitio web',           placeholder: 'miportafolio.com',              type: 'text',  col: 'half' },
  { key: 'linkedin',          label: 'LinkedIn',            placeholder: 'linkedin.com/in/tuperfil',      type: 'text',  col: 'full' },
];

export default function PersonalInfoForm() {
  const { cvData, updateField } = useCVStore();

  return (
    <div className="form-card">
      <p className="section-title">
        <span>👤</span> Información personal
      </p>

      <div className="grid grid-cols-2 gap-3">
        {/* Photo upload */}
        <PhotoUpload />

        {/* Text fields */}
        {FIELDS.map(({ key, label, placeholder, type, col }) => (
          <div key={key} className={col === 'full' ? 'col-span-2' : 'col-span-1'}>
            <label className="cv-label">{label}</label>
            <input
              type={type}
              className="cv-input"
              placeholder={placeholder}
              value={cvData[key] || ''}
              onChange={(e) => updateField(key, e.target.value)}
            />
          </div>
        ))}

        {/* Summary with AI improve */}
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-1">
            <label className="cv-label mb-0">Resumen profesional</label>
            <AIImproveButton
              fieldKey="summary"
              currentValue={cvData.summary || ''}
              context={`Nombre: ${cvData.fullName || ''}, Título: ${cvData.professionalTitle || ''}`}
            />
          </div>
          <textarea
            className="cv-textarea"
            rows={4}
            placeholder="Describí brevemente tu experiencia, habilidades y lo que te diferencia como profesional..."
            value={cvData.summary || ''}
            onChange={(e) => updateField('summary', e.target.value)}
          />
          <p className="text-[10px] text-gray-400 mt-1">
            {(cvData.summary || '').length} caracteres
            {(cvData.summary || '').length < 80 && (
              <span className="text-amber-500 ml-1">· Recomendado: mínimo 80</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
