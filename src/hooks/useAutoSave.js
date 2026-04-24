/**
 * useAutoSave — Debounced autosave hook
 *
 * Watches `cvData` changes, waits 400ms after last edit,
 * then marks the save as 'saved' (Zustand persist already
 * wrote to localStorage synchronously — this hook just
 * manages the *visual* status indicator).
 *
 * Usage: call once at the top of BuilderClient.
 */
import { useEffect, useRef } from 'react';
import useCVStore from '@/store/useCVStore';

const DEBOUNCE_MS = 400;

export function useAutoSave() {
  const { cvData, saveStatus, setSaveStatus } = useCVStore();
  const timerRef = useRef(null);

  useEffect(() => {
    // Only run when something is in 'saving' state
    if (saveStatus !== 'saving') return;

    // Clear any pending timer
    if (timerRef.current) clearTimeout(timerRef.current);

    // After debounce, flip to 'saved'
    timerRef.current = setTimeout(() => {
      setSaveStatus('saved');

      // Reset to 'idle' after showing "Guardado" for 2s
      timerRef.current = setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    }, DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [cvData, saveStatus, setSaveStatus]);
}
