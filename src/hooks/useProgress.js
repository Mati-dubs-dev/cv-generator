/**
 * useProgress — Calculates CV completion percentage
 *
 * Each field group has a weight. Returns:
 *   { percent: number, label: string, breakdown: object }
 */
import { useMemo } from 'react';
import useCVStore from '@/store/useCVStore';

// Each section: [weight, evaluator fn → boolean]
const CHECKS = [
  // Personal basics (30 pts)
  { label: 'Nombre',       pts: 8,  fn: (d) => !!d.fullName?.trim() },
  { label: 'Título',       pts: 6,  fn: (d) => !!d.professionalTitle?.trim() },
  { label: 'Email',        pts: 5,  fn: (d) => !!d.email?.trim() },
  { label: 'Teléfono',     pts: 4,  fn: (d) => !!d.phone?.trim() },
  { label: 'Ubicación',    pts: 4,  fn: (d) => !!d.location?.trim() },
  { label: 'Foto',         pts: 3,  fn: (d) => !!d.photo },

  // Summary (15 pts)
  { label: 'Resumen',      pts: 15, fn: (d) => d.summary?.trim().length >= 80 },

  // Experience (30 pts)
  {
    label: 'Experiencia',
    pts: 20,
    fn: (d) =>
      d.experience.some((e) => e.company?.trim() && e.position?.trim()),
  },
  {
    label: 'Descripción exp.',
    pts: 10,
    fn: (d) =>
      d.experience.some((e) => e.description?.trim().length >= 30),
  },

  // Education (15 pts)
  {
    label: 'Educación',
    pts: 15,
    fn: (d) =>
      d.education.some((e) => e.institution?.trim() && e.degree?.trim()),
  },

  // Skills (10 pts)
  { label: 'Habilidades', pts: 10, fn: (d) => d.skills.length >= 3 },
];

const TOTAL_PTS = CHECKS.reduce((acc, c) => acc + c.pts, 0);

export function useProgress() {
  const cvData = useCVStore((s) => s.cvData);

  return useMemo(() => {
    const earned = CHECKS.reduce(
      (acc, check) => acc + (check.fn(cvData) ? check.pts : 0),
      0
    );
    const percent = Math.round((earned / TOTAL_PTS) * 100);

    let label = 'Empezá tu CV';
    if (percent >= 90) label = '¡CV excelente!';
    else if (percent >= 70) label = 'Muy completo';
    else if (percent >= 50) label = 'Buen progreso';
    else if (percent >= 25) label = 'Siguiendo bien';
    else if (percent > 0) label = 'Recién empezando';

    // Which checks are still pending
    const pending = CHECKS
      .filter((check) => !check.fn(cvData))
      .map((c) => c.label);

    return { percent, label, pending };
  }, [cvData]);
}
