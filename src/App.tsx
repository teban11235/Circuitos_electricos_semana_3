/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ModuleId } from './types/circuit';
import { LckModule } from './components/LckModule';
import { LvkModule } from './components/LvkModule';
import { DividersModule } from './components/DividersModule';
import { GuidedExamplesModule } from './components/GuidedExamplesModule';
import { QuizModule } from './components/QuizModule';
import { PdfModal } from './components/PdfModal';

const NAV_ITEMS: { id: ModuleId; label: string }[] = [
  { id: 'lck', label: '1. LCK Nodos' },
  { id: 'lvk', label: '2. LVK Mallas' },
  { id: 'dividers', label: '3. Divisores' },
  { id: 'examples', label: '4. Ejemplos Guiados' },
  { id: 'quiz', label: '5. Autoevaluación' },
];

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>('lck');
  const [isPdfOpen, setIsPdfOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-6 py-4">
        <div className="max-w-[1380px] mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveModule('lck');
            }}
            className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            Circuitos Eléctricos · Semana 3
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Módulos de la clase"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item.id)}
                  className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                    isActive
                      ? 'text-[#0284C7] border-[#0284C7] font-semibold'
                      : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => setIsPdfOpen(true)}
              className="px-4 py-2 text-xs font-medium text-white bg-[#0F172A] rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
            >
              Ver Guía PDF
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Module Switcher (visible only below md breakpoint) */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-2 overflow-x-auto flex items-center gap-2">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
              activeModule === item.id
                ? 'bg-[#0284C7] text-white'
                : 'text-slate-600 bg-slate-100'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Content Stage (1440px desktop baseline container) */}
      <main id="top" className="flex-1 w-full max-w-[1380px] mx-auto px-6 py-8">
        {activeModule === 'lck' && <LckModule />}
        {activeModule === 'lvk' && <LvkModule />}
        {activeModule === 'dividers' && <DividersModule />}
        {activeModule === 'examples' && <GuidedExamplesModule />}
        {activeModule === 'quiz' && <QuizModule />}
      </main>

      {/* Clean Academic Footer */}
      <footer className="bg-white border-t border-slate-200 px-6 py-5 mt-12">
        <div className="max-w-[1380px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span>Universidad Técnica Particular de Loja (UTPL)</span>
            <span aria-hidden="true">·</span>
            <span>Facultad de Ingenierías y Arquitectura</span>
            <span aria-hidden="true">·</span>
            <span>Carrera: Redes y Analítica de Datos</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Basado en la Guía Didáctica del autor Esteban Paúl Briceño Sánchez</span>
          </div>
        </div>
      </footer>

      {/* PDF Guide Reference Modal */}
      <PdfModal isOpen={isPdfOpen} onClose={() => setIsPdfOpen(false)} />
    </div>
  );
}
