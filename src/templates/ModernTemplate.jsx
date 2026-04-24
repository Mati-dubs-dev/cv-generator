/**
 * ModernTemplate — Two-column CV with navy sidebar.
 *
 * v2: Photo displayed as a circle at the top of the sidebar.
 */

function SectionTitle({ children, light = false }) {
  return (
    <h3
      className={`text-[10px] font-700 uppercase tracking-[0.15em] mb-2 pb-1 border-b ${
        light ? 'text-white/50 border-white/20' : 'text-navy-500 border-navy-100'
      }`}
    >
      {children}
    </h3>
  );
}

function SkillBadge({ skill }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-600 bg-white/15 text-white/90 mr-1 mb-1">
      {skill}
    </span>
  );
}

export default function ModernTemplate({ data }) {
  const {
    fullName, professionalTitle, email, phone, location, website, linkedin,
    summary, experience = [], education = [], skills = [], languages = [], photo,
  } = data;

  return (
    <div className="a4-page flex font-body text-[11px] leading-relaxed">

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className="w-[35%] bg-navy-900 text-white p-7 flex flex-col gap-5 shrink-0">

        {/* Photo — circle at top of sidebar */}
        {photo ? (
          <div className="flex justify-center mb-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo}
              alt={fullName || 'Foto de perfil'}
              className="w-24 h-24 rounded-full object-cover border-3 border-white/30 shadow-lg"
              style={{ border: '3px solid rgba(255,255,255,0.25)' }}
            />
          </div>
        ) : null}

        {/* Name & title */}
        <div className={photo ? '' : 'mt-0'}>
          <h1 className="font-display text-[22px] text-white leading-tight mb-1">
            {fullName || 'Tu Nombre'}
          </h1>
          <p className="text-[12px] text-accent font-600 tracking-wide">
            {professionalTitle || 'Título profesional'}
          </p>
        </div>

        {/* Contact */}
        <div>
          <SectionTitle light>Contacto</SectionTitle>
          <div className="flex flex-col gap-1.5 text-white/75 text-[10px]">
            {email    && <span>✉ {email}</span>}
            {phone    && <span>📱 {phone}</span>}
            {location && <span>📍 {location}</span>}
            {website  && <span>🌐 {website}</span>}
            {linkedin && <span>in {linkedin}</span>}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <SectionTitle light>Habilidades</SectionTitle>
            <div className="flex flex-wrap">
              {skills.map((s) => <SkillBadge key={s} skill={s} />)}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <SectionTitle light>Idiomas</SectionTitle>
            {languages.map(({ language, level }) => (
              <div key={language} className="text-white/75 text-[10px] mb-1">
                <span className="font-600 text-white">{language}</span>
                {level && <span className="text-white/50"> — {level}</span>}
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* ── Main ────────────────────────────────────────────────────────── */}
      <main className="flex-1 p-7 flex flex-col gap-5">

        {/* Summary */}
        {summary && (
          <div>
            <SectionTitle>Perfil profesional</SectionTitle>
            <p className="text-gray-600 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.filter((e) => e.company || e.position).length > 0 && (
          <div>
            <SectionTitle>Experiencia laboral</SectionTitle>
            <div className="flex flex-col gap-4">
              {experience.filter((e) => e.company || e.position).map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="font-700 text-navy-900 text-[11px]">{exp.position}</p>
                      <p className="text-electric font-600 text-[10px]">{exp.company}</p>
                    </div>
                    <p className="text-gray-400 text-[9px] shrink-0 mt-0.5">
                      {exp.startDate}
                      {exp.startDate && (exp.endDate || exp.current) && ' – '}
                      {exp.current ? 'Presente' : exp.endDate}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="mt-1.5 text-gray-600 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.filter((e) => e.institution || e.degree).length > 0 && (
          <div>
            <SectionTitle>Educación</SectionTitle>
            <div className="flex flex-col gap-3">
              {education.filter((e) => e.institution || e.degree).map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="font-700 text-navy-900 text-[11px]">
                        {edu.degree}{edu.field && ` en ${edu.field}`}
                      </p>
                      <p className="text-electric font-600 text-[10px]">{edu.institution}</p>
                    </div>
                    <p className="text-gray-400 text-[9px] shrink-0 mt-0.5">
                      {edu.startDate}
                      {edu.startDate && edu.endDate && ' – '}
                      {edu.endDate}
                    </p>
                  </div>
                  {edu.description && (
                    <p className="mt-1 text-gray-500 text-[10px] leading-relaxed">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
