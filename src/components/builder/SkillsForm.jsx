'use client';
import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import useCVStore from '@/store/useCVStore';

export default function SkillsForm() {
  const { cvData, addSkill, removeSkill } = useCVStore();
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const val = input.trim();
    if (val) {
      addSkill(val);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="form-card">
      <p className="section-title">
        <span>⚡</span> Habilidades
      </p>

      {/* Tag input */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          className="cv-input flex-1"
          placeholder="Ej: JavaScript, Figma, Excel..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleAdd}
          disabled={!input.trim()}
          className="btn-primary text-sm py-2 px-4 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus size={15} />
        </button>
      </div>

      <p className="text-xs text-gray-400 mb-3">
        Presioná Enter o coma para agregar. Máx. 15 habilidades.
      </p>

      {/* Tags */}
      {cvData.skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {cvData.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 px-3 py-1 bg-navy-900 text-white text-xs rounded-full font-600 group"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-0.5 opacity-50 hover:opacity-100 transition-opacity"
              >
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400 italic">
          Todavía no agregaste habilidades.
        </p>
      )}
    </div>
  );
}
