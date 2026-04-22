'use client';
import useCVStore from '@/store/useCVStore';

export default function PersonalInfoForm() {
  const { cvData, updateField } = useCVStore();

  const fields = [
    { key: 'fullName', label: 'Nombre completo', placeholder: 'Ej: María González', type: 'text', col: 'full' },
    { key: 'professionalTitle', label: 'Título profesional', placeholder: 'Ej: Desarrolladora Full Stack', type: 'text', col: 'full' },
    { key: 'email', label: 'Email', placeholder: 'tu@email.com', type: 'email', col: 'half' },
    { key: 'phone', label: 'Teléfono', placeholder: '+54 11 1234-5678', type: 'tel', col: 'half' },
    { key: 'location', label: 'Ubicación', placeholder: 'Buenos Aires, Argentina', type: 'text', col: 'half' },
    { key: 'website', label: 'Sitio web', placeholder: 'miportafolio.com', type: 'text', col: 'half' },
    { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/tuperfil', type: 'text', col: 'full' },
  ];

  return (
    <div className="form-card">
      <p className="section-title">
        <span>👤</span> Información personal
      </p>

      <div className="grid grid-cols-2 gap-3">
        {fields.map(({ key, label, placeholder, type, col }) => (
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

        {/* Summary */}
        <div className="col-span-2">
          <label className="cv-label">Resumen profesional</label>
          <textarea
            className="cv-textarea"
            rows={4}
            placeholder="Describí brevemente tu experiencia, habilidades y lo que te diferencia como profesional..."
            value={cvData.summary || ''}
            onChange={(e) => updateField('summary', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
