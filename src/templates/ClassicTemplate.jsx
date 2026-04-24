/**
 * ClassicTemplate — Single-column traditional CV.
 *
 * v2: Photo displayed as a rounded square top-left, beside the name.
 */

function Divider() {
  return <div className="border-t border-gray-300 my-4" />;
}

function SectionTitle({ children }) {
  return (
    <h3 className="font-display text-[15px] text-navy-900 uppercase tracking-widest mb-3">
      {children}
    </h3>
  );
}

export default function ClassicTemplate({ data }) {
  const {
    fullName, professionalTitle, email, phone, location, website, linkedin,
    summary, experience = [], education = [], skills = [], languages = [], photo,
  } = data;

  return (
    <div className="a4-page font-body p-10 text-[11px] text-gray-700 leading-relaxed">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="flex items-start gap-5 mb-2">
        {/* Photo — rounded square, top-left */}
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={fullName || 'Foto de perfil'}
            className="w-20 h-20 rounded-lg object-cover shrink-0 shadow-sm"
            style={{ borderRadius: '8px' }}
          />
        )}

        {/* Name block */}
        <div className={`flex-1 ${photo ? 'text-left' : 'text-center'}`}>
          <h1 className="font-display text-[32px] text-navy-900 tracking-tight mb-1">
            {fullName || 'Tu Nombre Completo'}
          </h1>
          {professionalTitle && (
            <p className="text-[13px] text-gray-500 font-500 tracking-wide mb-2">
              {professionalTitle}
            </p>
          )}
          <div className={`flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-gray-500 ${photo ? '' : 'justify-center'}`}>
            {email    && <span>{email}</span>}
            {phone    && <span>{phone}</span>}
            {location && <span>{location}</span>}
            {website  && <span>{website}</span>}
            {linkedin && <span>{linkedin}</span>}
          </div>
        </div>
      </header>

      <div className="border-b-2 border-navy-900 mt-3 mb-4" />

      {/* ── Summary ────────────────────────────────────────────────────── */}
      {summary && (
        <>
          <SectionTitle>Perfil</SectionTitle>
          <p className="text-gray-600 leading-relaxed mb-2">{summary}</p>
          <Divider />
        </>
      )}

      {/* ── Experience ─────────────────────────────────────────────────── */}
      {experience.filter((e) => e.company || e.position).length > 0 && (
        <>
          <SectionTitle>Experiencia Profesional</SectionTitle>
          <div className="flex flex-col gap-4 mb-2">
            {experience.filter((e) => e.company || e.position).map((exp) => (
              <div key={exp.id} className="grid grid-cols-[1fr_auto] gap-4 items-start">
                <div>
                  <p className="font-700 text-navy-900 text-[11.5px]">{exp.position}</p>
                  <p className="text-[10.5px] text-gray-500 italic mb-1">{exp.company}</p>
                  {exp.description && (
                    <p className="text-gray-600 leading-relaxed text-[10.5px]">{exp.description}</p>
                  )}
                </div>
                <p className="text-[9.5px] text-gray-400 whitespace-nowrap pt-0.5">
                  {exp.startDate}
                  {exp.startDate && (exp.endDate || exp.current) && ' – '}
                  {exp.current ? 'Presente' : exp.endDate}
                </p>
              </div>
            ))}
          </div>
          <Divider />
        </>
      )}

      {/* ── Education ──────────────────────────────────────────────────── */}
      {education.filter((e) => e.institution || e.degree).length > 0 && (
        <>
          <SectionTitle>Educación</SectionTitle>
          <div className="flex flex-col gap-3 mb-2">
            {education.filter((e) => e.institution || e.degree).map((edu) => (
              <div key={edu.id} className="grid grid-cols-[1fr_auto] gap-4 items-start">
                <div>
                  <p className="font-700 text-navy-900 text-[11.5px]">
                    {edu.degree}{edu.field && `, ${edu.field}`}
                  </p>
                  <p className="text-[10.5px] text-gray-500 italic">{edu.institution}</p>
                  {edu.description && (
                    <p className="text-gray-500 text-[10px] mt-0.5">{edu.description}</p>
                  )}
                </div>
                <p className="text-[9.5px] text-gray-400 whitespace-nowrap pt-0.5">
                  {edu.startDate}
                  {edu.startDate && edu.endDate && ' – '}
                  {edu.endDate}
                </p>
              </div>
            ))}
          </div>
          <Divider />
        </>
      )}

      {/* ── Skills + Languages ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-8">
        {skills.length > 0 && (
          <div>
            <SectionTitle>Habilidades</SectionTitle>
            <div className="flex flex-wrap gap-1">
              {skills.map((s) => (
                <span key={s} className="px-2 py-0.5 border border-gray-300 rounded text-[9.5px] text-gray-600">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <SectionTitle>Idiomas</SectionTitle>
            {languages.map(({ language, level }) => (
              <div key={language} className="mb-1 text-[10px]">
                <span className="font-700 text-navy-900">{language}</span>
                {level && <span className="text-gray-500"> — {level}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
