import React, { useState } from 'react';
import {
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Eye,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';

type ExampleKey = '1.8.1' | '1.9.1' | '1.10' | '1.11.1' | '1.12.1';

export const GuidedExamplesModule: React.FC = () => {
  const [activeExample, setActiveExample] = useState<ExampleKey>('1.8.1');
  const [step, setStep] = useState<number>(1);

  // Example 1.8.1 State (Page 4: Known 8 mA, 9 mA, 12 mA in three branches; find i1, i2, i3)
  const [ex1_ia, setEx1_ia] = useState<number>(8);
  const [ex1_ib, setEx1_ib] = useState<number>(9);
  const [ex1_ic, setEx1_ic] = useState<number>(12);
  // Node A: ia (8mA) enters, ib (9mA) leaves => i1 (leaving) = ia - ib = -1 mA (or 8 + i1 = 9)
  // Node B: i1 enters, ic (12mA) leaves => i2 (entering) = ic - i1 = 13 mA
  // Node C (common node): i3 = ia + i2 - ib = 12 mA
  const ex1_i1 = ex1_ia - ex1_ib; // -1 mA with default 8 and 9 (illustrates negative current meaning!)
  const ex1_i2 = ex1_ic - ex1_i1; // 13 mA
  const ex1_i3 = ex1_ib + ex1_ic; // 21 mA total return

  // Example 1.9.1 State (Page 8: Single loop with 10 V and 8 V sources, 4 Ω and 2 Ω resistors in series)
  const [ex2_vs1, setEx2_vs1] = useState<number>(10);
  const [ex2_vs2, setEx2_vs2] = useState<number>(8);
  const [ex2_r1, setEx2_r1] = useState<number>(4);
  const [ex2_r2, setEx2_r2] = useState<number>(2);
  // Assuming opposing 8V source or aiding: in Alexander & Sadiku 10V and -8V or 10V+8V over 4+2=6 ohm:
  // With 10V and 8V in series (or 10V opposing 8V): let's provide a polarity toggle for the 8V source!
  const [ex2_opposing, setEx2_opposing] = useState<boolean>(false);
  const ex2_netV = ex2_opposing ? ex2_vs1 - ex2_vs2 : ex2_vs1 + ex2_vs2;
  const ex2_i = ex2_netV / (ex2_r1 + ex2_r2);
  const ex2_v1 = ex2_i * ex2_r1;
  const ex2_v2 = ex2_i * ex2_r2;

  // Example 1.10 State (Pages 8-9: 30 V source in series with 8 Ω resistor feeding top node 'a' with 3 Ω || 6 Ω)
  const [ex3_vs, setEx3_vs] = useState<number>(30);
  const [ex3_r1, setEx3_r1] = useState<number>(8);
  const [ex3_r2, setEx3_r2] = useState<number>(3);
  const [ex3_r3, setEx3_r3] = useState<number>(6);
  const ex3_rParallel = (ex3_r2 * ex3_r3) / (ex3_r2 + ex3_r3); // 3 || 6 = 2 Ω
  const ex3_rTotal = ex3_r1 + ex3_rParallel; // 8 + 2 = 10 Ω
  const ex3_i1 = ex3_vs / ex3_rTotal; // 30 / 10 = 3 A
  const ex3_v1 = ex3_i1 * ex3_r1; // 24 V
  const ex3_v2 = ex3_vs - ex3_v1; // 6 V (since v1 + v2 = 30 V)
  const ex3_v3 = ex3_v2; // Parallel condition: v2 = v3 = 6 V
  const ex3_i2 = ex3_v2 / ex3_r2; // 6 / 3 = 2 A
  const ex3_i3 = ex3_v3 / ex3_r3; // 6 / 6 = 1 A

  // Example 1.11.1 State (Pages 12-13: 12 V source in series with 4 Ω and parallel branch 6 Ω || 3 Ω between nodes a-b)
  const [ex4_vs, setEx4_vs] = useState<number>(12);
  const [ex4_rs, setEx4_rs] = useState<number>(4);
  const [ex4_rp1, setEx4_rp1] = useState<number>(6);
  const [ex4_rp2, setEx4_rp2] = useState<number>(3);
  const ex4_reqP = (ex4_rp1 * ex4_rp2) / (ex4_rp1 + ex4_rp2); // 6 || 3 = 2 Ω
  const ex4_vo = ex4_vs * (ex4_reqP / (ex4_rs + ex4_reqP)); // 12 * (2 / (4+2)) = 4 V
  const ex4_io = ex4_vo / ex4_rp2; // 4 / 3 = 1.333 A
  const ex4_p3 = ex4_io * ex4_io * ex4_rp2; // (4/3)^2 * 3 = 5.333 W

  // Example 1.12.1 State (Page 16: 15 V source feeds two parallel groups: (12 Ω || 6 Ω) left and (10 Ω || 40 Ω) right)
  const [ex5_vs, setEx5_vs] = useState<number>(15);
  const [ex5_rL1, setEx5_rL1] = useState<number>(12);
  const [ex5_rL2, setEx5_rL2] = useState<number>(6);
  const [ex5_rR1, setEx5_rR1] = useState<number>(10);
  const [ex5_rR2, setEx5_rR2] = useState<number>(40);
  const ex5_reqLeft = (ex5_rL1 * ex5_rL2) / (ex5_rL1 + ex5_rL2); // 12 || 6 = 4 Ω
  const ex5_reqRight = (ex5_rR1 * ex5_rR2) / (ex5_rR1 + ex5_rR2); // 10 || 40 = 8 Ω
  const ex5_rTotal = ex5_reqLeft + ex5_reqRight; // 4 + 8 = 12 Ω
  const ex5_iTotal = ex5_vs / ex5_rTotal; // 15 / 12 = 1.25 A
  const ex5_v1 = ex5_iTotal * ex5_reqLeft; // 1.25 * 4 = 5 V
  const ex5_v2 = ex5_iTotal * ex5_reqRight; // 1.25 * 8 = 10 V
  // Current divider with "opposite resistor" in numerator:
  const ex5_i1_12ohm = ex5_iTotal * (ex5_rL2 / (ex5_rL1 + ex5_rL2)); // 1.25 * (6/18) = 0.4167 A
  const ex5_i2_40ohm = ex5_iTotal * (ex5_rR1 / (ex5_rR1 + ex5_rR2)); // 1.25 * (10/50) = 0.25 A
  const ex5_p12 = ex5_i1_12ohm * ex5_i1_12ohm * ex5_rL1; // 2.083 W
  const ex5_p40 = ex5_i2_40ohm * ex5_i2_40ohm * ex5_rR2; // 2.50 W

  const resetCurrentExample = () => {
    setStep(1);
    if (activeExample === '1.8.1') {
      setEx1_ia(8);
      setEx1_ib(9);
      setEx1_ic(12);
    } else if (activeExample === '1.9.1') {
      setEx2_vs1(10);
      setEx2_vs2(8);
      setEx2_r1(4);
      setEx2_r2(2);
      setEx2_opposing(false);
    } else if (activeExample === '1.10') {
      setEx3_vs(30);
      setEx3_r1(8);
      setEx3_r2(3);
      setEx3_r3(6);
    } else if (activeExample === '1.11.1') {
      setEx4_vs(12);
      setEx4_rs(4);
      setEx4_rp1(6);
      setEx4_rp2(3);
    } else if (activeExample === '1.12.1') {
      setEx5_vs(15);
      setEx5_rL1(12);
      setEx5_rL2(6);
      setEx5_rR1(10);
      setEx5_rR2(40);
    }
  };

  const examplesList: { id: ExampleKey; title: string; page: string }[] = [
    { id: '1.8.1', title: '1.8.1 Ejemplo LCK (8, 9, 12 mA)', page: 'Pág. 4' },
    { id: '1.9.1', title: '1.9.1 Ejemplo LVK (10V, 8V, 4Ω, 2Ω)', page: 'Pág. 8' },
    { id: '1.10', title: '1.10 LVK + LCK (30V, 8Ω, 3Ω ∥ 6Ω)', page: 'Págs. 8–9' },
    { id: '1.11.1', title: '1.11.1 Divisor de Voltaje (12V, 4Ω, 6Ω ∥ 3Ω)', page: 'Págs. 12–13' },
    { id: '1.12.1', title: '1.12.1 Divisor de Corriente (15V, 12∥6Ω y 10∥40Ω)', page: 'Pág. 16' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
            <span>Pizarra Docente Paso a Paso</span>
            <span aria-hidden="true">·</span>
            <span>5 Ejemplos Guiados Oficiales de la Guía UTPL</span>
            <span aria-hidden="true">·</span>
            <span>Valores Editables en Vivo</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Resolución Interactiva de los Ejemplos Guiados de la Semana 3
          </h1>
          <p className="text-slate-600 mt-1 max-w-3xl text-base">
            Proyecta cada ejercicio en clase, revela el procedimiento etapa por etapa antes del resultado final o modifica los valores de las fuentes y resistores para plantear variantes en vivo.
          </p>
        </div>

        <button
          onClick={resetCurrentExample}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Restaurar datos de la guía
        </button>
      </div>

      {/* Selector Bar for the 5 Examples */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/70 rounded-xl">
        {examplesList.map((ex) => (
          <button
            key={ex.id}
            onClick={() => {
              setActiveExample(ex.id);
              setStep(1);
            }}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeExample === ex.id
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'text-slate-700 hover:bg-white/70'
            }`}
          >
            {ex.title} · {ex.page}
          </button>
        ))}
      </div>

      {/* Main Two-Zone Chalkboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Zone: Circuit Diagram + Editable Parameters (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <h2 className="text-lg font-semibold text-slate-900">
                Esquema Dinámico del Ejemplo {activeExample}
              </h2>
              <span className="font-mono text-xs text-[#0284C7] font-semibold">
                Etapa {step} de 4 activa
              </span>
            </div>

            {/* Dynamic SVG per Example */}
            <div className="w-full h-[300px] rounded-lg border border-slate-200 engineering-grid flex items-center justify-center overflow-hidden">
              {activeExample === '1.8.1' && (
                <svg viewBox="0 0 560 280" className="w-full h-full select-none">
                  {/* Multi-node LCK network with 8mA, 9mA, 12mA */}
                  <line x1="60" y1="90" x2="500" y2="90" stroke="#334155" strokeWidth="3" />
                  <line x1="60" y1="210" x2="500" y2="210" stroke="#334155" strokeWidth="3" />
                  <line x1="180" y1="90" x2="180" y2="210" stroke="#334155" strokeWidth="3" />
                  <line x1="380" y1="90" x2="380" y2="210" stroke="#334155" strokeWidth="3" />

                  {/* Nodes */}
                  <circle cx="180" cy="90" r="6" fill="#0284C7" />
                  <text x="180" y="72" textAnchor="middle" className="font-mono text-xs font-bold fill-slate-900">
                    Nodo A
                  </text>
                  <circle cx="380" cy="90" r="6" fill="#0284C7" />
                  <text x="380" y="72" textAnchor="middle" className="font-mono text-xs font-bold fill-slate-900">
                    Nodo B
                  </text>
                  <circle cx="280" cy="210" r="6" fill="#0F172A" />
                  <text x="280" y="236" textAnchor="middle" className="font-mono text-xs font-bold fill-slate-900">
                    Nodo Común C
                  </text>

                  {/* Known Currents */}
                  <text x="115" y="80" textAnchor="middle" className="font-mono text-xs font-bold fill-emerald-700">
                    {ex1_ia} mA →
                  </text>
                  <text x="135" y="155" textAnchor="end" className="font-mono text-xs font-bold fill-amber-700">
                    ↓ {ex1_ib} mA
                  </text>
                  <text x="445" y="80" textAnchor="middle" className="font-mono text-xs font-bold fill-amber-700">
                    {ex1_ic} mA →
                  </text>

                  {/* Unknowns i1, i2, i3 */}
                  <text x="280" y="80" textAnchor="middle" className="font-mono text-xs font-bold fill-[#0284C7]">
                    i₁ = {step >= 3 ? `${ex1_i1} mA` : '?'} →
                  </text>
                  <text x="435" y="155" textAnchor="start" className="font-mono text-xs font-bold fill-[#0284C7]">
                    ↑ i₂ = {step >= 3 ? `${ex1_i2} mA` : '?'}
                  </text>
                  <text x="115" y="200" textAnchor="middle" className="font-mono text-xs font-bold fill-purple-700">
                    ← i₃ = {step >= 4 ? `${ex1_i3} mA` : '?'}
                  </text>
                </svg>
              )}

              {activeExample === '1.9.1' && (
                <svg viewBox="0 0 560 280" className="w-full h-full select-none">
                  <rect x="90" y="55" width="380" height="170" fill="none" stroke="#334155" strokeWidth="3" />
                  <rect x="90" y="55" width="380" height="170" fill="none" stroke="#0284C7" strokeWidth="3" className="animate-current-forward" />
                  {/* Source 1 (10V) on left */}
                  <g transform="translate(90, 140)">
                    <circle r="22" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.5" />
                    <text x="0" y="-4" textAnchor="middle" className="font-mono text-xs font-bold fill-blue-700">+</text>
                    <text x="0" y="12" textAnchor="middle" className="font-mono text-xs font-bold fill-blue-700">−</text>
                    <text x="30" y="4" className="font-mono text-xs font-bold fill-slate-900">{ex2_vs1} V</text>
                  </g>
                  {/* R1 (4 Ω) on top */}
                  <g transform="translate(220, 55)">
                    <rect x="-35" y="-12" width="70" height="24" rx="4" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.5" />
                    <text x="0" y="4" textAnchor="middle" className="font-mono text-xs font-bold fill-amber-800">{ex2_r1} Ω</text>
                    <text x="0" y="-18" textAnchor="middle" className="font-mono text-xs font-bold fill-slate-900">
                      + v₁ = {step >= 3 ? `${ex2_v1.toFixed(2)} V` : '?'} −
                    </text>
                  </g>
                  {/* Source 2 (8V) on right */}
                  <g transform="translate(470, 140)">
                    <circle r="22" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.5" />
                    <text x="0" y="-4" textAnchor="middle" className="font-mono text-xs font-bold fill-blue-700">
                      {ex2_opposing ? '+' : '−'}
                    </text>
                    <text x="0" y="12" textAnchor="middle" className="font-mono text-xs font-bold fill-blue-700">
                      {ex2_opposing ? '−' : '+'}
                    </text>
                    <text x="-30" y="4" textAnchor="end" className="font-mono text-xs font-bold fill-slate-900">{ex2_vs2} V</text>
                  </g>
                  {/* R2 (2 Ω) on bottom */}
                  <g transform="translate(280, 225)">
                    <rect x="-35" y="-12" width="70" height="24" rx="4" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.5" />
                    <text x="0" y="4" textAnchor="middle" className="font-mono text-xs font-bold fill-amber-800">{ex2_r2} Ω</text>
                    <text x="0" y="28" textAnchor="middle" className="font-mono text-xs font-bold fill-slate-900">
                      − v₂ = {step >= 3 ? `${ex2_v2.toFixed(2)} V` : '?'} +
                    </text>
                  </g>
                  <text x="280" y="145" textAnchor="middle" className="font-mono text-xs font-bold fill-[#0284C7]">
                    ↻ Malla Horaria (i = {step >= 3 ? `${ex2_i.toFixed(2)} A` : '?'})
                  </text>
                </svg>
              )}

              {activeExample === '1.10' && (
                <svg viewBox="0 0 560 280" className="w-full h-full select-none">
                  {/* 30V source + 8Ω series + node 'a' + 3Ω || 6Ω */}
                  <line x1="80" y1="60" x2="460" y2="60" stroke="#334155" strokeWidth="3" />
                  <line x1="80" y1="60" x2="80" y2="230" stroke="#334155" strokeWidth="3" />
                  <line x1="80" y1="230" x2="460" y2="230" stroke="#334155" strokeWidth="3" />
                  <line x1="320" y1="60" x2="320" y2="230" stroke="#334155" strokeWidth="3" />
                  <line x1="460" y1="60" x2="460" y2="230" stroke="#334155" strokeWidth="3" />

                  <circle cx="320" cy="60" r="5" fill="#0284C7" />
                  <text x="320" y="44" textAnchor="middle" className="font-mono text-xs font-bold fill-[#0284C7]">
                    Nodo a (v₂ = v₃ = {step >= 3 ? `${ex3_v2.toFixed(1)} V` : '?'})
                  </text>

                  {/* 30V Source */}
                  <g transform="translate(80, 145)">
                    <circle r="22" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.5" />
                    <text x="0" y="-4" textAnchor="middle" className="font-mono text-xs font-bold fill-blue-700">+</text>
                    <text x="0" y="12" textAnchor="middle" className="font-mono text-xs font-bold fill-blue-700">−</text>
                    <text x="28" y="4" className="font-mono text-xs font-bold fill-slate-900">{ex3_vs} V</text>
                  </g>

                  {/* 8 Ω Resistor */}
                  <g transform="translate(200, 60)">
                    <rect x="-34" y="-12" width="68" height="24" rx="4" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.5" />
                    <text x="0" y="4" textAnchor="middle" className="font-mono text-xs font-bold fill-amber-800">{ex3_r1} Ω</text>
                    <text x="0" y="-18" textAnchor="middle" className="font-mono text-xs font-bold fill-slate-900">
                      + v₁ ({step >= 3 ? `${ex3_v1.toFixed(1)}V` : '?'}) −
                    </text>
                    <text x="0" y="26" textAnchor="middle" className="font-mono text-[11px] font-bold fill-[#0284C7]">
                      i₁ = {step >= 3 ? `${ex3_i1.toFixed(2)} A` : '?'} →
                    </text>
                  </g>

                  {/* 3 Ω Resistor */}
                  <g transform="translate(320, 145)">
                    <rect x="-14" y="-30" width="28" height="60" rx="4" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.5" />
                    <text x="20" y="-4" className="font-mono text-xs font-bold fill-slate-900">{ex3_r2} Ω</text>
                    <text x="20" y="14" className="font-mono text-xs font-bold fill-emerald-700">
                      ↓ i₂ = {step >= 3 ? `${ex3_i2.toFixed(2)} A` : '?'}
                    </text>
                  </g>

                  {/* 6 Ω Resistor */}
                  <g transform="translate(460, 145)">
                    <rect x="-14" y="-30" width="28" height="60" rx="4" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.5" />
                    <text x="20" y="-4" className="font-mono text-xs font-bold fill-slate-900">{ex3_r3} Ω</text>
                    <text x="20" y="14" className="font-mono text-xs font-bold fill-emerald-700">
                      ↓ i₃ = {step >= 3 ? `${ex3_i3.toFixed(2)} A` : '?'}
                    </text>
                  </g>
                </svg>
              )}

              {activeExample === '1.11.1' && (
                <svg viewBox="0 0 560 280" className="w-full h-full select-none">
                  {/* 12V + 4Ω + (6Ω || 3Ω) between nodes a and b */}
                  <line x1="80" y1="60" x2="460" y2="60" stroke="#334155" strokeWidth="3" />
                  <line x1="80" y1="60" x2="80" y2="230" stroke="#334155" strokeWidth="3" />
                  <line x1="80" y1="230" x2="460" y2="230" stroke="#334155" strokeWidth="3" />
                  <line x1="320" y1="60" x2="320" y2="230" stroke="#334155" strokeWidth="3" />
                  <line x1="460" y1="60" x2="460" y2="230" stroke="#334155" strokeWidth="3" />

                  <circle cx="320" cy="60" r="5" fill="#0284C7" />
                  <text x="320" y="42" textAnchor="middle" className="font-mono text-xs font-bold fill-slate-900">
                    Nodo a (+ v_o = {step >= 3 ? `${ex4_vo.toFixed(2)} V` : '?'})
                  </text>
                  <circle cx="320" cy="230" r="5" fill="#0F172A" />
                  <text x="320" y="252" textAnchor="middle" className="font-mono text-xs font-bold fill-slate-900">
                    Nodo b (−)
                  </text>

                  <g transform="translate(80, 145)">
                    <circle r="22" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.5" />
                    <text x="0" y="-4" textAnchor="middle" className="font-mono text-xs font-bold fill-blue-700">+</text>
                    <text x="0" y="12" textAnchor="middle" className="font-mono text-xs font-bold fill-blue-700">−</text>
                    <text x="28" y="4" className="font-mono text-xs font-bold fill-slate-900">{ex4_vs} V</text>
                  </g>

                  <g transform="translate(195, 60)">
                    <rect x="-32" y="-12" width="64" height="24" rx="4" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.5" />
                    <text x="0" y="4" textAnchor="middle" className="font-mono text-xs font-bold fill-amber-800">{ex4_rs} Ω</text>
                  </g>

                  <g transform="translate(320, 145)">
                    <rect x="-14" y="-28" width="28" height="56" rx="4" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.5" />
                    <text x="20" y="4" className="font-mono text-xs font-bold fill-slate-900">{ex4_rp1} Ω</text>
                  </g>

                  <g transform="translate(460, 145)">
                    <rect x="-14" y="-28" width="28" height="56" rx="4" fill="#F0F9FF" stroke="#0284C7" strokeWidth="2.5" />
                    <text x="20" y="-6" className="font-mono text-xs font-bold fill-slate-900">{ex4_rp2} Ω</text>
                    <text x="20" y="12" className="font-mono text-xs font-bold fill-[#0284C7]">
                      i_o = {step >= 3 ? `${ex4_io.toFixed(2)} A` : '?'}
                    </text>
                  </g>
                </svg>
              )}

              {activeExample === '1.12.1' && (
                <svg viewBox="0 0 560 280" className="w-full h-full select-none">
                  {/* 15V feeding two series blocks: (12||6) and (10||40) */}
                  <rect x="60" y="65" width="440" height="150" fill="none" stroke="#334155" strokeWidth="3" />
                  <g transform="translate(60, 140)">
                    <circle r="22" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.5" />
                    <text x="0" y="-4" textAnchor="middle" className="font-mono text-xs font-bold fill-blue-700">+</text>
                    <text x="0" y="12" textAnchor="middle" className="font-mono text-xs font-bold fill-blue-700">−</text>
                    <text x="28" y="4" className="font-mono text-xs font-bold fill-slate-900">{ex5_vs} V</text>
                  </g>

                  {/* Left Parallel Block (12 Ω || 6 Ω) */}
                  <rect x="150" y="42" width="130" height="46" rx="6" fill="#F8FAFC" stroke="#0284C7" strokeWidth="2" />
                  <text x="215" y="62" textAnchor="middle" className="font-mono text-xs font-bold fill-slate-900">
                    Bloque 1: {ex5_rL1} Ω ∥ {ex5_rL2} Ω
                  </text>
                  <text x="215" y="78" textAnchor="middle" className="font-mono text-[11px] font-bold fill-[#0284C7]">
                    R_eq1 = {step >= 2 ? `${ex5_reqLeft.toFixed(1)} Ω` : '?'} · v₁ = {step >= 3 ? `${ex5_v1.toFixed(1)} V` : '?'}
                  </text>

                  {/* Right Parallel Block (10 Ω || 40 Ω) */}
                  <rect x="330" y="42" width="130" height="46" rx="6" fill="#F8FAFC" stroke="#059669" strokeWidth="2" />
                  <text x="395" y="62" textAnchor="middle" className="font-mono text-xs font-bold fill-slate-900">
                    Bloque 2: {ex5_rR1} Ω ∥ {ex5_rR2} Ω
                  </text>
                  <text x="395" y="78" textAnchor="middle" className="font-mono text-[11px] font-bold fill-emerald-700">
                    R_eq2 = {step >= 2 ? `${ex5_reqRight.toFixed(1)} Ω` : '?'} · v₂ = {step >= 3 ? `${ex5_v2.toFixed(1)} V` : '?'}
                  </text>

                  <text x="280" y="155" textAnchor="middle" className="font-mono text-xs font-bold fill-slate-900">
                    Corriente Total I = V_s / R_T = {step >= 2 ? `${ex5_iTotal.toFixed(2)} A` : '?'}
                  </text>
                </svg>
              )}
            </div>
          </div>

          {/* Live Value Sliders for the Active Guided Example */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#0284C7]" />
                Modificar Valores Numéricos del Ejercicio en Vivo
              </span>
              <span className="text-[11px] text-slate-500">
                Recalcula automáticamente todas las etapas
              </span>
            </div>

            {activeExample === '1.8.1' && (
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-slate-700 font-medium mb-1">
                    Rama A: <span className="font-mono font-bold">{ex1_ia} mA</span>
                  </label>
                  <input type="range" min={1} max={25} value={ex1_ia} onChange={(e) => setEx1_ia(Number(e.target.value))} className="w-full accent-[#0284C7]" />
                </div>
                <div>
                  <label className="block text-xs text-slate-700 font-medium mb-1">
                    Rama B: <span className="font-mono font-bold">{ex1_ib} mA</span>
                  </label>
                  <input type="range" min={1} max={25} value={ex1_ib} onChange={(e) => setEx1_ib(Number(e.target.value))} className="w-full accent-[#0284C7]" />
                </div>
                <div>
                  <label className="block text-xs text-slate-700 font-medium mb-1">
                    Rama C: <span className="font-mono font-bold">{ex1_ic} mA</span>
                  </label>
                  <input type="range" min={1} max={25} value={ex1_ic} onChange={(e) => setEx1_ic(Number(e.target.value))} className="w-full accent-[#0284C7]" />
                </div>
              </div>
            )}

            {activeExample === '1.9.1' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs text-slate-700 font-medium mb-1">
                      V_s1: <span className="font-mono font-bold">{ex2_vs1} V</span>
                    </label>
                    <input type="range" min={2} max={30} value={ex2_vs1} onChange={(e) => setEx2_vs1(Number(e.target.value))} className="w-full accent-[#0284C7]" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-700 font-medium mb-1">
                      V_s2: <span className="font-mono font-bold">{ex2_vs2} V</span>
                    </label>
                    <input type="range" min={2} max={30} value={ex2_vs2} onChange={(e) => setEx2_vs2(Number(e.target.value))} className="w-full accent-[#0284C7]" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-700 font-medium mb-1">
                      R₁: <span className="font-mono font-bold">{ex2_r1} Ω</span>
                    </label>
                    <input type="range" min={1} max={12} value={ex2_r1} onChange={(e) => setEx2_r1(Number(e.target.value))} className="w-full accent-amber-600" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-700 font-medium mb-1">
                      R₂: <span className="font-mono font-bold">{ex2_r2} Ω</span>
                    </label>
                    <input type="range" min={1} max={12} value={ex2_r2} onChange={(e) => setEx2_r2(Number(e.target.value))} className="w-full accent-amber-600" />
                  </div>
                </div>
                <button
                  onClick={() => setEx2_opposing(!ex2_opposing)}
                  className="px-3 py-1 text-xs font-medium bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors"
                >
                  Polaridad de 8 V: {ex2_opposing ? 'Opuesta a 10 V (Resta)' : 'A favor de 10 V (Suma)'}
                </button>
              </div>
            )}

            {activeExample === '1.10' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs text-slate-700 font-medium mb-1">
                    Fuente: <span className="font-mono font-bold">{ex3_vs} V</span>
                  </label>
                  <input type="range" min={6} max={60} step={2} value={ex3_vs} onChange={(e) => setEx3_vs(Number(e.target.value))} className="w-full accent-[#0284C7]" />
                </div>
                <div>
                  <label className="block text-xs text-slate-700 font-medium mb-1">
                    R_serie: <span className="font-mono font-bold">{ex3_r1} Ω</span>
                  </label>
                  <input type="range" min={1} max={20} value={ex3_r1} onChange={(e) => setEx3_r1(Number(e.target.value))} className="w-full accent-amber-600" />
                </div>
                <div>
                  <label className="block text-xs text-slate-700 font-medium mb-1">
                    R_par 1: <span className="font-mono font-bold">{ex3_r2} Ω</span>
                  </label>
                  <input type="range" min={1} max={18} value={ex3_r2} onChange={(e) => setEx3_r2(Number(e.target.value))} className="w-full accent-emerald-600" />
                </div>
                <div>
                  <label className="block text-xs text-slate-700 font-medium mb-1">
                    R_par 2: <span className="font-mono font-bold">{ex3_r3} Ω</span>
                  </label>
                  <input type="range" min={1} max={18} value={ex3_r3} onChange={(e) => setEx3_r3(Number(e.target.value))} className="w-full accent-emerald-600" />
                </div>
              </div>
            )}

            {activeExample === '1.11.1' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs text-slate-700 font-medium mb-1">
                    Fuente: <span className="font-mono font-bold">{ex4_vs} V</span>
                  </label>
                  <input type="range" min={4} max={36} step={2} value={ex4_vs} onChange={(e) => setEx4_vs(Number(e.target.value))} className="w-full accent-[#0284C7]" />
                </div>
                <div>
                  <label className="block text-xs text-slate-700 font-medium mb-1">
                    R_serie: <span className="font-mono font-bold">{ex4_rs} Ω</span>
                  </label>
                  <input type="range" min={1} max={16} value={ex4_rs} onChange={(e) => setEx4_rs(Number(e.target.value))} className="w-full accent-amber-600" />
                </div>
                <div>
                  <label className="block text-xs text-slate-700 font-medium mb-1">
                    R_par 1: <span className="font-mono font-bold">{ex4_rp1} Ω</span>
                  </label>
                  <input type="range" min={1} max={18} value={ex4_rp1} onChange={(e) => setEx4_rp1(Number(e.target.value))} className="w-full accent-emerald-600" />
                </div>
                <div>
                  <label className="block text-xs text-slate-700 font-medium mb-1">
                    R_par 2: <span className="font-mono font-bold">{ex4_rp2} Ω</span>
                  </label>
                  <input type="range" min={1} max={18} value={ex4_rp2} onChange={(e) => setEx4_rp2(Number(e.target.value))} className="w-full accent-emerald-600" />
                </div>
              </div>
            )}

            {activeExample === '1.12.1' && (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                <div>
                  <label className="block text-[11px] text-slate-700 font-medium mb-1">
                    V_s: <span className="font-mono font-bold">{ex5_vs}V</span>
                  </label>
                  <input type="range" min={5} max={45} value={ex5_vs} onChange={(e) => setEx5_vs(Number(e.target.value))} className="w-full accent-[#0284C7]" />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-700 font-medium mb-1">
                    R_L1: <span className="font-mono font-bold">{ex5_rL1}Ω</span>
                  </label>
                  <input type="range" min={2} max={30} value={ex5_rL1} onChange={(e) => setEx5_rL1(Number(e.target.value))} className="w-full accent-amber-600" />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-700 font-medium mb-1">
                    R_L2: <span className="font-mono font-bold">{ex5_rL2}Ω</span>
                  </label>
                  <input type="range" min={2} max={30} value={ex5_rL2} onChange={(e) => setEx5_rL2(Number(e.target.value))} className="w-full accent-amber-600" />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-700 font-medium mb-1">
                    R_R1: <span className="font-mono font-bold">{ex5_rR1}Ω</span>
                  </label>
                  <input type="range" min={2} max={50} value={ex5_rR1} onChange={(e) => setEx5_rR1(Number(e.target.value))} className="w-full accent-emerald-600" />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-700 font-medium mb-1">
                    R_R2: <span className="font-mono font-bold">{ex5_rR2}Ω</span>
                  </label>
                  <input type="range" min={2} max={60} value={ex5_rR2} onChange={(e) => setEx5_rR2(Number(e.target.value))} className="w-full accent-emerald-600" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Zone: Progressive Step-by-Step Chalkboard (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            {/* Stepper Controls Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-200">
              <h3 className="text-base font-semibold text-slate-900">
                Desarrollo Paso a Paso (Modo Proyección)
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  disabled={step === 1}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg disabled:opacity-40 transition-colors whitespace-nowrap shrink-0"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Paso Anterior
                </button>
                <button
                  onClick={() => setStep((s) => Math.min(4, s + 1))}
                  disabled={step === 4}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-[#0284C7] hover:bg-sky-700 text-white rounded-lg disabled:opacity-40 transition-colors whitespace-nowrap shrink-0"
                >
                  Siguiente Paso
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Revelar Todo
                </button>
              </div>
            </div>

            {/* Step Cards for Active Example */}
            <div className="space-y-4">
              {activeExample === '1.8.1' && (
                <>
                  <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/70">
                    <div className="text-xs font-bold text-[#0284C7] mb-1">
                      Paso 1: Identificación de Nodos y Criterio &ldquo;Entradas = Salidas&rdquo;
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Conocemos las corrientes de tres ramas ({ex1_ia} mA, {ex1_ib} mA y {ex1_ic} mA). En cada nodo identificamos qué flechas apuntan hacia el nodo (entradas) y cuáles se alejan de él (salidas).
                    </p>
                  </div>

                  {step >= 2 && (
                    <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/70">
                      <div className="text-xs font-bold text-[#0284C7] mb-1">
                        Paso 2: Planteamiento de Ecuaciones LCK por Nodo
                      </div>
                      <p className="font-mono text-xs text-slate-900">
                        • Nodo A: {ex1_ia} mA = {ex1_ib} mA + i₁  ⇒  i₁ = {ex1_ia} − {ex1_ib}
                      </p>
                      <p className="font-mono text-xs text-slate-900 mt-1">
                        • Nodo B: i₁ + i₂ = {ex1_ic} mA  ⇒  i₂ = {ex1_ic} − i₁
                      </p>
                    </div>
                  )}

                  {step >= 3 && (
                    <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/70">
                      <div className="text-xs font-bold text-[#0284C7] mb-1">
                        Paso 3: Cálculo Numérico e Interpretación del Signo Negativo
                      </div>
                      <p className="font-mono text-xs font-bold text-slate-900">
                        i₁ = {ex1_i1} mA  |  i₂ = {ex1_i2} mA
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        {ex1_i1 < 0
                          ? `Observa que i₁ dio ${ex1_i1} mA (negativo). Según la página 4 de la guía, esto indica que el sentido físico real es opuesto al de la flecha asignada.`
                          : 'Ambas corrientes resultaron positivas, por lo que sus sentidos reales coinciden con las flechas.'}
                      </p>
                    </div>
                  )}

                  {step >= 4 && (
                    <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/60">
                      <div className="text-xs font-bold text-emerald-800 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Paso 4: Comprobación Final en el Nodo Común
                      </div>
                      <p className="font-mono text-xs text-emerald-950">
                        i₃ = {ex1_ib} mA + {ex1_ic} mA = {ex1_i3} mA (Satisface Σ i_entran = Σ i_salen en todo el circuito).
                      </p>
                    </div>
                  )}
                </>
              )}

              {activeExample === '1.9.1' && (
                <>
                  <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/70">
                    <div className="text-xs font-bold text-[#0284C7] mb-1">
                      Paso 1: Sentido de Recorrido y Convención Pasiva de Signos
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Definimos un recorrido horario para la única malla en serie con las fuentes de {ex2_vs1} V y {ex2_vs2} V y los resistores de {ex2_r1} Ω y {ex2_r2} Ω. Asignamos + y − en los resistores respetando la convención pasiva.
                    </p>
                  </div>

                  {step >= 2 && (
                    <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/70">
                      <div className="text-xs font-bold text-[#0284C7] mb-1">
                        Paso 2: Ecuación de la Ley de Voltajes de Kirchhoff (LVK)
                      </div>
                      <p className="font-mono text-xs text-slate-900">
                        −{ex2_vs1} + v₁ {ex2_opposing ? `+ ${ex2_vs2}` : `− ${ex2_vs2}`} + v₂ = 0  ⇒  v₁ + v₂ = {ex2_netV} V
                      </p>
                      <p className="font-mono text-xs text-slate-700 mt-1">
                        Por Ley de Ohm: v₁ = {ex2_r1}·i  y  v₂ = {ex2_r2}·i
                      </p>
                    </div>
                  )}

                  {step >= 3 && (
                    <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/70">
                      <div className="text-xs font-bold text-[#0284C7] mb-1">
                        Paso 3: Cálculo de la Corriente de Malla y Tensiones v₁, v₂
                      </div>
                      <p className="font-mono text-xs font-bold text-slate-900">
                        i = {ex2_netV} V / ({ex2_r1} + {ex2_r2}) Ω = {ex2_i.toFixed(2)} A
                      </p>
                      <p className="font-mono text-xs text-[#0284C7] font-bold mt-1">
                        v₁ = {ex2_v1.toFixed(2)} V   |   v₂ = {ex2_v2.toFixed(2)} V
                      </p>
                    </div>
                  )}

                  {step >= 4 && (
                    <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/60">
                      <div className="text-xs font-bold text-emerald-800 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Paso 4: Verificación de Subidas y Caídas de Potencial
                      </div>
                      <p className="font-mono text-xs text-emerald-950">
                        v₁ + v₂ = {ex2_v1.toFixed(2)} V + {ex2_v2.toFixed(2)} V = {(ex2_v1 + ex2_v2).toFixed(2)} V (Coincide exactamente con la tensión neta de las fuentes: {ex2_netV} V).
                      </p>
                    </div>
                  )}
                </>
              )}

              {activeExample === '1.10' && (
                <>
                  <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/70">
                    <div className="text-xs font-bold text-[#0284C7] mb-1">
                      Paso 1: Estrategia de Análisis Integrado (Página 9)
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      1° Plantear LVK en el lazo principal: <strong>v₁ + v₂ = {ex3_vs} V</strong>. 2° Reconocer la condición de paralelo en las ramas derechas: <strong>v₂ = v₃</strong>. 3° Aplicar LCK en el nodo superior <em>a</em>: <strong>i₁ = i₂ + i₃</strong>.
                    </p>
                  </div>

                  {step >= 2 && (
                    <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/70">
                      <div className="text-xs font-bold text-[#0284C7] mb-1">
                        Paso 2: Expresión de Corrientes mediante Ley de Ohm y Reducción
                      </div>
                      <p className="font-mono text-xs text-slate-900">
                        R_paralelo = ({ex3_r2} · {ex3_r3}) / ({ex3_r2} + {ex3_r3}) = {ex3_rParallel.toFixed(2)} Ω
                      </p>
                      <p className="font-mono text-xs text-slate-900 mt-1">
                        R_total = {ex3_r1} Ω + {ex3_rParallel.toFixed(2)} Ω = {ex3_rTotal.toFixed(2)} Ω
                      </p>
                    </div>
                  )}

                  {step >= 3 && (
                    <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/70">
                      <div className="text-xs font-bold text-[#0284C7] mb-1">
                        Paso 3: Determinación de Tensiones (v₁, v₂, v₃) y Corrientes (i₁, i₂, i₃)
                      </div>
                      <p className="font-mono text-xs font-bold text-slate-900">
                        i₁ = {ex3_vs} / {ex3_rTotal.toFixed(2)} = {ex3_i1.toFixed(2)} A   ⇒   v₁ = {ex3_r1} · {ex3_i1.toFixed(2)} = {ex3_v1.toFixed(2)} V
                      </p>
                      <p className="font-mono text-xs font-bold text-[#0284C7] mt-1">
                        v₂ = v₃ = {ex3_vs} − {ex3_v1.toFixed(2)} = {ex3_v2.toFixed(2)} V   |   i₂ = {ex3_i2.toFixed(2)} A   |   i₃ = {ex3_i3.toFixed(2)} A
                      </p>
                    </div>
                  )}

                  {step >= 4 && (
                    <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/60">
                      <div className="text-xs font-bold text-emerald-800 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Paso 4: Verificación Simultánea de LCK y LVK
                      </div>
                      <p className="font-mono text-xs text-emerald-950">
                        • LVK Lazo Principal: v₁ + v₂ = {ex3_v1.toFixed(2)} + {ex3_v2.toFixed(2)} = {ex3_vs.toFixed(2)} V ✓
                      </p>
                      <p className="font-mono text-xs text-emerald-950 mt-0.5">
                        • LCK Nodo a: i₂ + i₃ = {ex3_i2.toFixed(2)} + {ex3_i3.toFixed(2)} = {ex3_i1.toFixed(2)} A = i₁ ✓
                      </p>
                    </div>
                  )}
                </>
              )}

              {activeExample === '1.11.1' && (
                <>
                  <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/70">
                    <div className="text-xs font-bold text-[#0284C7] mb-1">
                      Paso 1: Reducir Primero el Ramal en Paralelo (Página 12)
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Antes de aplicar el divisor de voltaje, convertimos el paralelo entre los nodos a–b ({ex4_rp1} Ω ∥ {ex4_rp2} Ω) en una resistencia equivalente R_eq:
                    </p>
                    <p className="font-mono text-xs font-bold text-slate-900 mt-1">
                      R_eq = ({ex4_rp1} · {ex4_rp2}) / ({ex4_rp1} + {ex4_rp2}) = {ex4_reqP.toFixed(2)} Ω
                    </p>
                  </div>

                  {step >= 2 && (
                    <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/70">
                      <div className="text-xs font-bold text-[#0284C7] mb-1">
                        Paso 2: Aplicar el Divisor de Voltaje en la Serie Resultante ({ex4_rs} Ω y R_eq)
                      </div>
                      <p className="font-mono text-xs font-bold text-slate-900">
                        v_o = V_s · [R_eq / ({ex4_rs} + R_eq)] = {ex4_vs} · [{ex4_reqP.toFixed(2)} / {(ex4_rs + ex4_reqP).toFixed(2)}] = {ex4_vo.toFixed(2)} V
                      </p>
                    </div>
                  )}

                  {step >= 3 && (
                    <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/70">
                      <div className="text-xs font-bold text-[#0284C7] mb-1">
                        Paso 3: Hallar la Corriente i_o en el Resistor de {ex4_rp2} Ω (Página 13)
                      </div>
                      <p className="font-mono text-xs font-bold text-slate-900">
                        i_o = v_o / {ex4_rp2} Ω = {ex4_vo.toFixed(2)} V / {ex4_rp2} Ω = {ex4_io.toFixed(3)} A
                      </p>
                    </div>
                  )}

                  {step >= 4 && (
                    <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/60">
                      <div className="text-xs font-bold text-emerald-800 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Paso 4: Cálculo y Verificación de la Potencia Disipada p₃
                      </div>
                      <p className="font-mono text-xs text-emerald-950">
                        p₃ = i_o² · ({ex4_rp2} Ω) = ({ex4_io.toFixed(3)})² · {ex4_rp2} = {ex4_p3.toFixed(2)} W
                      </p>
                    </div>
                  )}
                </>
              )}

              {activeExample === '1.12.1' && (
                <>
                  <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/70">
                    <div className="text-xs font-bold text-[#0284C7] mb-1">
                      Paso 1: Reducir Cada Grupo en Paralelo a su Equivalente (Página 16)
                    </div>
                    <p className="font-mono text-xs text-slate-900">
                      • Izquierda ({ex5_rL1} Ω ∥ {ex5_rL2} Ω): R_eq1 = ({ex5_rL1}·{ex5_rL2})/({ex5_rL1}+{ex5_rL2}) = {ex5_reqLeft.toFixed(2)} Ω
                    </p>
                    <p className="font-mono text-xs text-slate-900 mt-1">
                      • Derecha ({ex5_rR1} Ω ∥ {ex5_rR2} Ω): R_eq2 = ({ex5_rR1}·{ex5_rR2})/({ex5_rR1}+{ex5_rR2}) = {ex5_reqRight.toFixed(2)} Ω
                    </p>
                  </div>

                  {step >= 2 && (
                    <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/70">
                      <div className="text-xs font-bold text-[#0284C7] mb-1">
                        Paso 2: Calcular la Corriente Total I = V_s / R_T y Tensiones v₁, v₂
                      </div>
                      <p className="font-mono text-xs font-bold text-slate-900">
                        R_T = {ex5_reqLeft.toFixed(2)} + {ex5_reqRight.toFixed(2)} = {ex5_rTotal.toFixed(2)} Ω   ⇒   I = {ex5_vs} / {ex5_rTotal.toFixed(2)} = {ex5_iTotal.toFixed(3)} A
                      </p>
                      <p className="font-mono text-xs text-[#0284C7] font-bold mt-1">
                        v₁ = I · R_eq1 = {ex5_v1.toFixed(2)} V   |   v₂ = I · R_eq2 = {ex5_v2.toFixed(2)} V
                      </p>
                    </div>
                  )}

                  {step >= 3 && (
                    <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/70">
                      <div className="text-xs font-bold text-[#0284C7] mb-1">
                        Paso 3: Repartir la Corriente con Divisor (&ldquo;Resistor Opuesto&rdquo; en el Numerador)
                      </div>
                      <p className="font-mono text-xs font-bold text-slate-900">
                        • En {ex5_rL1} Ω: i₁ = {ex5_iTotal.toFixed(2)} · [{ex5_rL2} / ({ex5_rL1} + {ex5_rL2})] = {ex5_i1_12ohm.toFixed(3)} A
                      </p>
                      <p className="font-mono text-xs font-bold text-slate-900 mt-1">
                        • En {ex5_rR2} Ω: i₂ = {ex5_iTotal.toFixed(2)} · [{ex5_rR1} / ({ex5_rR1} + {ex5_rR2})] = {ex5_i2_40ohm.toFixed(3)} A
                      </p>
                    </div>
                  )}

                  {step >= 4 && (
                    <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/60">
                      <div className="text-xs font-bold text-emerald-800 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Paso 4: Potencia Disipada con p = i² · R
                      </div>
                      <p className="font-mono text-xs text-emerald-950">
                        • Potencia en {ex5_rL1} Ω: p = ({ex5_i1_12ohm.toFixed(3)})² · {ex5_rL1} = {ex5_p12.toFixed(2)} W
                      </p>
                      <p className="font-mono text-xs text-emerald-950 mt-0.5">
                        • Potencia en {ex5_rR2} Ω: p = ({ex5_i2_40ohm.toFixed(3)})² · {ex5_rR2} = {ex5_p40.toFixed(2)} W
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>
              Usa los botones superiores para ir revelando cada etapa mientras preguntas a tus estudiantes.
            </span>
            <span className="font-mono">
              Progreso: {step}/4
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
