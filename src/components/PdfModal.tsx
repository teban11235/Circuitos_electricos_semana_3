import React, { useState } from 'react';
import { X, FileText, ExternalLink } from 'lucide-react';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GUIDE_SECTIONS = [
  { label: 'Portada e Introducción', page: 1 },
  { label: '1.8 Ley de Corriente de Kirchhoff (LCK)', page: 2 },
  { label: 'Figura 18 y Ejemplo Guiado LCK', page: 3 },
  { label: '1.9 Ley de Voltaje de Kirchhoff (LVK)', page: 4 },
  { label: 'Figura 19 (Lazo) y Figura 20 (Fuentes Serie)', page: 6 },
  { label: '1.9.1 y 1.10 Ejemplos Guiados LVK y LCK', page: 8 },
  { label: '1.11 Resistores en Serie y Divisor de Voltaje', page: 10 },
  { label: '1.12 Resistores en Paralelo y Divisor de Corriente', page: 13 },
  { label: 'Casos Extremos (Corto y Abierto) + Ejemplo 1.12.1', page: 15 },
  { label: 'Actividades Recomendadas y Autoevaluación 1', page: 17 },
  { label: 'Preguntas de Autoevaluación 1 (1 a 11)', page: 20 },
];

export const PdfModal: React.FC<PdfModalProps> = ({ isOpen, onClose }) => {
  const [page, setPage] = useState<number>(2);

  if (!isOpen) return null;

  const pdfUrl = `/assets/aistudio/Semana_3_guia_f555c4aa.pdf#page=${page}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-6xl h-[88vh] flex flex-col overflow-hidden shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#0284C7]" />
            <h2 className="text-base font-bold text-slate-900">
              Guía Didáctica Original: Circuitos Eléctricos – Semana 3 (UTPL)
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/assets/aistudio/Semana_3_guia_f555c4aa.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Abrir PDF completo
            </a>
            <button
              onClick={onClose}
              aria-label="Cerrar visor PDF"
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body with Quick Section Index + PDF Embed */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          <div className="lg:col-span-4 border-r border-slate-200 p-4 overflow-y-auto space-y-2 bg-slate-50">
            <div className="text-xs font-semibold text-slate-500 mb-2">
              Índice Rápido por Página del Documento
            </div>
            {GUIDE_SECTIONS.map((sec) => (
              <button
                key={sec.page}
                onClick={() => setPage(sec.page)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between gap-2 ${
                  page === sec.page
                    ? 'bg-[#0284C7] text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="truncate">{sec.label}</span>
                <span className="font-mono shrink-0">Pág. {sec.page}</span>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 bg-slate-100 h-full">
            <iframe
              key={page}
              src={pdfUrl}
              title="Guía Didáctica Semana 3 UTPL"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
