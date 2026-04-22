/**
 * MinimalistTemplate — Typography-first, maximum whitespace
 * Perfect for designers, writers, and those who prefer restraint
 */

function SectionTitle({ children }) {
  return (
    <p className="text-[9px] font-700 uppercase tracking-[0.2em] text-gray-400 mb-3">
      {children}
    </p>
  );
}

export default function MinimalistTemplate({ data }) {
  const {
    fullName, professionalTitle, email, phone, location, website, linkedin, summary,
    experience = [], education = [], skills = [], languages = [],
  } = data;

  return (
    <div className="a4-page font-body p-12 text-[11px] text-gray-700 leading-relaxed">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-display text-[36px] text-gray-900 tracking-tight leading-none mb-1.5">
            {fullName || 'Tu Nombre'}
          </h1>
          <p className="text-[12px] text-gray-400 tracking-wider">
            {professionalTitle || 'Título profesional'}
          </p>
        </div>

        {/* Contact (right side) */}
        <div className="text-right flex flex-col gap-1 text-[10px] text-gray-400">
          {email && <span>{email}</span>}
          {phone && <span>{phone}</span>}
          {location && <span>{location}</span>}
          {website && <span>{website}</span>}
        </div>
      </header>

      <div className="h-px bg-gray-900 mb-8" />

      {/* ── Body: two-column grid ─────────────────────────────────────────── */}
      <div className="flex gap-10">

        {/* Left (narrow) */}
        <aside className="w-[30%] shrink-0 flex flex-col gap-6">

          {/* Summary — left column on minimalist */}
          {summary && (
            <div>
              <SectionTitle>Perfil</SectionTitle>
              <p className="text-gray-600 leading-relaxed text-[10px]">{summary}</p>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <SectionTitle>Habilidades</SectionTitle>
              <ul className="flex flex-col gap-1">
                {skills.map((s) => (
                  <li key={s} className="text-[10px] text-gray-600 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <SectionTitle>Idiomas</SectionTitle>
              {languages.map(({ language, level }) => (
                <div key={language} className="mb-1.5 text-[10px]">
                  <p className="font-600 text-gray-800">{language}</p>
                  {level && <p className="text-gray-400">{level}</p>}
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* Right (wide) */}
        <main className="flex-1 flex flex-col gap-6">

          {/* Experience */}
          {experience.filter((e) => e.company || e.position).length > 0 && (
            <div>
              <SectionTitle>Experiencia</SectionTitle>
              <div className="flex flex-col gap-5">
                {experience
                  .filter((e) => e.company || e.position)
                  .map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline gap-2 mb-0.5">
                        <p className="font-600 text-gray-900 text-[11px]">{exp.position}</p>
                        <p className="text-[9px] text-gray-300 shrink-0">
                          {exp.startDate}
                          {exp.startDate && (exp.endDate || exp.current) && '–'}
                          {exp.current ? 'Presente' : exp.endDate}
                        </p>
                      </div>
                      <p className="text-[10px] text-gray-400 mb-1">{exp.company}</p>
                      {exp.description && (
                        <p className="text-[10px] text-gray-600 leading-relaxed">{exp.description}</p>
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
              <div className="flex flex-col gap-4">
                {education
                  .filter((e) => e.institution || e.degree)
                  .map((edu) => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-baseline gap-2 mb-0.5">
                        <p className="font-600 text-gray-900 text-[11px]">
                          {edu.degree}{edu.field && ` — ${edu.field}`}
                        </p>
                        <p className="text-[9px] text-gray-300 shrink-0">
                          {edu.startDate}
                          {edu.startDate && edu.endDate && '–'}
                          {edu.endDate}
                        </p>
                      </div>
                      <p className="text-[10px] text-gray-400">{edu.institution}</p>
                      {edu.description && (
                        <p className="text-[10px] text-gray-500 leading-relaxed mt-0.5">{edu.description}</p>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
