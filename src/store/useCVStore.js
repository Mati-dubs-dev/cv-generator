/**
 * useCVStore — Central state for the CV Generator
 * Uses Zustand with localStorage persistence
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ─── Default empty CV data ────────────────────────────────────────────────
const defaultCV = {
  // Personal info
  fullName: '',
  professionalTitle: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  linkedin: '',
  summary: '',

  // Work experience — array of entries
  experience: [
    {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    },
  ],

  // Education — array of entries
  education: [
    {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ],

  // Skills — array of strings
  skills: [],

  // Languages — array of { language, level }
  languages: [],
};

// ─── Store ────────────────────────────────────────────────────────────────
const useCVStore = create(
  persist(
    (set, get) => ({
      // CV data
      cvData: defaultCV,
      // Currently selected template: 'classic' | 'modern' | 'minimalist'
      selectedTemplate: 'modern',
      // Has the user made any changes?
      isDirty: false,

      // ── Update top-level fields ──────────────────────────────────────────
      updateField: (field, value) =>
        set((state) => ({
          cvData: { ...state.cvData, [field]: value },
          isDirty: true,
        })),

      // ── Experience ───────────────────────────────────────────────────────
      addExperience: () =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            experience: [
              ...state.cvData.experience,
              {
                id: crypto.randomUUID(),
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
              },
            ],
          },
          isDirty: true,
        })),

      updateExperience: (id, field, value) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            experience: state.cvData.experience.map((exp) =>
              exp.id === id ? { ...exp, [field]: value } : exp
            ),
          },
          isDirty: true,
        })),

      removeExperience: (id) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            experience: state.cvData.experience.filter((exp) => exp.id !== id),
          },
          isDirty: true,
        })),

      // ── Education ────────────────────────────────────────────────────────
      addEducation: () =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            education: [
              ...state.cvData.education,
              {
                id: crypto.randomUUID(),
                institution: '',
                degree: '',
                field: '',
                startDate: '',
                endDate: '',
                description: '',
              },
            ],
          },
          isDirty: true,
        })),

      updateEducation: (id, field, value) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            education: state.cvData.education.map((edu) =>
              edu.id === id ? { ...edu, [field]: value } : edu
            ),
          },
          isDirty: true,
        })),

      removeEducation: (id) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            education: state.cvData.education.filter((edu) => edu.id !== id),
          },
          isDirty: true,
        })),

      // ── Skills ───────────────────────────────────────────────────────────
      setSkills: (skills) =>
        set((state) => ({
          cvData: { ...state.cvData, skills },
          isDirty: true,
        })),

      addSkill: (skill) =>
        set((state) => {
          const trimmed = skill.trim();
          if (!trimmed || state.cvData.skills.includes(trimmed)) return state;
          return {
            cvData: { ...state.cvData, skills: [...state.cvData.skills, trimmed] },
            isDirty: true,
          };
        }),

      removeSkill: (skill) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            skills: state.cvData.skills.filter((s) => s !== skill),
          },
          isDirty: true,
        })),

      // ── Template ─────────────────────────────────────────────────────────
      setTemplate: (template) => set({ selectedTemplate: template }),

      // ── Reset ────────────────────────────────────────────────────────────
      resetCV: () =>
        set({
          cvData: {
            ...defaultCV,
            experience: [
              {
                id: crypto.randomUUID(),
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
              },
            ],
            education: [
              {
                id: crypto.randomUUID(),
                institution: '',
                degree: '',
                field: '',
                startDate: '',
                endDate: '',
                description: '',
              },
            ],
          },
          isDirty: false,
        }),

      // ── Load demo data ────────────────────────────────────────────────────
      loadDemo: () =>
        set({
          cvData: {
            fullName: 'María González',
            professionalTitle: 'Diseñadora UX/UI Senior',
            email: 'maria.gonzalez@email.com',
            phone: '+54 11 4567-8901',
            location: 'Buenos Aires, Argentina',
            website: 'mariagonzalez.design',
            linkedin: 'linkedin.com/in/mariagonzalez',
            summary:
              'Diseñadora UX/UI con más de 6 años de experiencia creando productos digitales centrados en el usuario. Especializada en Design Systems, investigación de usuarios y prototipado de alta fidelidad. Apasionada por la intersección entre estética y funcionalidad.',
            experience: [
              {
                id: crypto.randomUUID(),
                company: 'Mercado Libre',
                position: 'Senior UX Designer',
                startDate: '2021-03',
                endDate: '',
                current: true,
                description:
                  'Lideré el rediseño del flujo de checkout aumentando la conversión en 18%. Creé y mantuve el Design System usado por más de 40 diseñadores. Facilité workshops de Design Thinking con equipos multidisciplinarios.',
              },
              {
                id: crypto.randomUUID(),
                company: 'Globant',
                position: 'UX/UI Designer',
                startDate: '2019-01',
                endDate: '2021-02',
                current: false,
                description:
                  'Diseñé interfaces para clientes de Fortune 500. Realicé entrevistas de usuario y pruebas de usabilidad. Trabajé con metodologías Agile en equipo de 8 personas.',
              },
            ],
            education: [
              {
                id: crypto.randomUUID(),
                institution: 'Universidad de Buenos Aires',
                degree: 'Licenciatura',
                field: 'Diseño Gráfico',
                startDate: '2014-03',
                endDate: '2019-12',
                description: 'Promedio 8.7/10. Tesis: "Diseño centrado en el usuario en aplicaciones móviles".',
              },
              {
                id: crypto.randomUUID(),
                institution: 'Interaction Design Foundation',
                degree: 'Certificación',
                field: 'UX Design',
                startDate: '2020-01',
                endDate: '2020-06',
                description: '',
              },
            ],
            skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems', 'Sketch', 'HTML/CSS', 'Agile/Scrum'],
            languages: [
              { language: 'Español', level: 'Nativo' },
              { language: 'Inglés', level: 'Avanzado (C1)' },
            ],
          },
          isDirty: true,
        }),
    }),
    {
      name: 'cv-generator-data', // localStorage key
      version: 1,
    }
  )
);

export default useCVStore;
