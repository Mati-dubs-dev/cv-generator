'use client';

/**
 * SaveStatus — Visual autosave indicator for the builder toolbar.
 *
 * Reads `saveStatus` from the Zustand store and renders:
 *   idle    → nothing (or faint "Guardado" after save)
 *   saving  → pulsing dot + "Guardando..."
 *   saved   → check + "Guardado"
 */

import { Cloud, CloudOff, Loader2 } from 'lucide-react';
import useCVStore from '@/store/useCVStore';

export default function SaveStatus() {
  const saveStatus = useCVStore((s) => s.saveStatus);

  if (saveStatus === 'saving') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] text-amber-500 font-600 select-none">
        <Loader2 size={12} className="animate-spin" />
        Guardando...
      </span>
    );
  }

  if (saveStatus === 'saved') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] text-green-600 font-600 select-none animate-fade-in">
        <Cloud size={12} />
        Guardado
      </span>
    );
  }

  // idle — show nothing
  return null;
}
