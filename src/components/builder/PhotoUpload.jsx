'use client';

/**
 * PhotoUpload — Profile photo upload with:
 *   - Drag & drop + click to upload
 *   - Accepts JPG, PNG, WEBP (max 2MB)
 *   - Converts to base64 for persistence
 *   - Shows preview immediately
 *   - Remove button
 */

import { useRef, useState, useCallback } from 'react';
import { Camera, X, Upload } from 'lucide-react';
import useCVStore from '@/store/useCVStore';

const MAX_SIZE_MB = 2;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function PhotoUpload() {
  const { cvData, setPhoto, removePhoto } = useCVStore();
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  // ── Validate and convert to base64 ──────────────────────────────────────
  const processFile = useCallback(
    (file) => {
      setError('');

      if (!file) return;

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError('Formato no válido. Usá JPG, PNG o WEBP.');
        return;
      }

      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`La imagen es muy grande. Máximo ${MAX_SIZE_MB}MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => setPhoto(e.target.result);
      reader.onerror = () => setError('Error al leer la imagen.');
      reader.readAsDataURL(file);
    },
    [setPhoto]
  );

  // ── Input change ─────────────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    processFile(file);
    // Reset input so same file can be re-selected
    e.target.value = '';
  };

  // ── Drag & drop handlers ─────────────────────────────────────────────────
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="col-span-2">
      <label className="cv-label">Foto de perfil</label>

      {cvData.photo ? (
        // ── Preview mode ──────────────────────────────────────────────────
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cvData.photo}
              alt="Foto de perfil"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 shadow-sm"
            />
            <button
              onClick={removePhoto}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm"
              title="Eliminar foto"
            >
              <X size={11} />
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-600 text-navy-900">Foto cargada</p>
            <p className="text-[10px] text-gray-400">
              Se mostrará en tu CV según la plantilla.
            </p>
            <button
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-1 text-[11px] text-electric hover:underline font-600"
            >
              <Upload size={11} /> Cambiar foto
            </button>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleInputChange}
          />
        </div>
      ) : (
        // ── Upload zone ───────────────────────────────────────────────────
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer
            transition-all duration-150 select-none
            ${isDragging
              ? 'border-electric bg-blue-50'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }
          `}
        >
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
              <Camera size={18} className="text-gray-400" />
            </div>
            <p className="text-xs font-600 text-gray-600">
              {isDragging ? 'Soltá la imagen aquí' : 'Subir foto de perfil'}
            </p>
            <p className="text-[10px] text-gray-400">
              JPG, PNG o WEBP · Máx. {MAX_SIZE_MB}MB
            </p>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleInputChange}
          />
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="mt-1.5 text-[11px] text-red-500 font-600">{error}</p>
      )}
    </div>
  );
}
