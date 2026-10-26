import React, { useState } from 'react';
import { RotateCcw, ZapOff, Zap, CheckCircle2, AlertTriangle } from 'lucide-react';

export const DividersModule: React.FC = () => {
  const [mode, setMode] = useState<'series' | 'parallel'>('series');

  // Series & Voltage Divider State (Section 1.11 / Figure 21)
  const [vsSeries, setVsSeries] = useState<number>(24);
  const [r1Series, setR1Series] = useState<number>(4);
  const [r2Series, setR2Series] = useState<number>(8);

  const reqSeries = r1Series + r2Series;
  const iSeries = vsSeries / reqSeries;
  const v1Drop = vsSeries * (r1Series / reqSeries);
  const v2Drop = vsSeries * (r2Series / reqSeries);

  // Parallel & Current Divider State + Extreme Cases (Section 1.12 / Figure 22)
  const [vsParallel, setVsParallel] = useState<number>(18);
  const [r1Parallel, setR1Parallel] = useState<number>(6);
  const [r2Parallel, setR2Parallel] = useState<number>(3);
  const [limitCase, setLimitCase] = useState<'normal' | 'short' | 'open'>('normal');

  // Computations for Parallel considering extreme cases (Pages 15-16)
  const effectiveR2 =
    limitCase === 'short' ? 0 : limitCase === 'open' ? Infinity : r2Parallel;

  const reqParallel =
    limitCase === 'short'
      ? 0
      : limitCase === 'open'
      ? r1Parallel
      : (r1Parallel * r2Parallel) / (r1Parallel + r2Parallel);

  const i1Parallel = limitCase === 'short' ? 0 : vsParallel / r1Parallel;
  const i2Parallel =
    limitCase === 'short'
      ? 99.9 // Symbolic surge current in short circuit
      : limitCase === 'open'
      ? 0
      : vsParallel / r2Parallel;
  const iTotalParallel = i1Parallel + i2Parallel;

  const resetDefaults = () => {
    if (mode === 'series') {
      setVsSeries(24);
      setR1Series(4);
      setR2Series(8);
    } else {
      setVsParallel(18);
      setR1Parallel(6);
      setR2Parallel(3);
      setLimitCase('normal');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
            <span>Secciones 1.11 y 1.12</span>
            <span aria-hidden="true">·</span>
            <span>Figuras 21 y 22 de la Guía Didáctica</span>
            <span aria-hidden="true">·</span>
            <span>Simplificación de Circuitos y Casos Límite</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Resistores en Serie/Paralelo y Divisores de Tensión y Corriente
          </h1>
          <p className="text-slate-600 mt-1 max-w-3xl text-base">
            Explora cómo se distribuye el voltaje de manera directamente proporcional en serie (Ec. 3.4) y cómo se reparte la corriente de manera inversamente proporcional en paralelo (Ec. 3.6), incluyendo cortocircuitos y circuitos abiertos.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
            <button
              onClick={() => setMode('series')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                mode === 'series'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1.11 Serie y Divisor de Voltaje
            </button>
            <button
              onClick={() => setMode('parallel')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                mode === 'parallel'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1.12 Paralelo, Divisor de Corriente y Casos Extremos
            </button>
          </div>

          <button
            onClick={resetDefaults}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restaurar datos de la guía
          </button>
        </div>
      </div>

      {mode === 'series' ? (
        /* SERIES & VOLTAGE DIVIDER (Section 1.11 / Figure 21) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Circuito de un Solo Lazo con Dos Resistores en Serie (Figura 21)
                </h2>
                <p className="text-xs text-slate-500">
                  La corriente i es idéntica en todos los elementos en serie, y la caída de voltaje es proporcional a cada resistencia.
                </p>
              </div>
              <span className="font-mono text-xs font-semibold text-[#0284C7]">
                R_eq = R₁ + R₂ = {reqSeries} Ω
              </span>
            </div>

            <div className="relative w-full h-[360px] rounded-lg border border-slate-200 engineering-grid flex items-center justify-center">
              <svg viewBox="0 0 640 340" className="w-full h-full select-none">
                {/* Main loop */}
                <rect x="110" y="80" width="420" height="190" fill="none" stroke="#334155" strokeWidth="3" />
                <rect
                  x="110"
                  y="80"
                  width="420"
                  height="190"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="3"
                  className="animate-current-forward"
                />

                {/* Nodes a and b */}
                <circle cx="170" cy="80" r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
                <text x="170" y="65" textAnchor="middle" className="font-mono text-xs font-bold fill-slate-900">Nodo a</text>

                <circle cx="170" cy="270" r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
                <text x="170" y="292" textAnchor="middle" className="font-mono text-xs font-bold fill-slate-900">Nodo b</text>

                {/* Current arrow */}
                <text x="138" y="65" textAnchor="middle" className="font-mono text-xs font-bold fill-rose-600">
                  i = {iSeries.toFixed(2)} A →
                </text>

                {/* Voltage source v */}
                <g transform="translate(110, 175)">
                  <circle r="26" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.5" />
                  <text x="0" y="-6" textAnchor="middle" className="font-mono text-sm font-bold fill-blue-700">+</text>
                  <text x="0" y="16" textAnchor="middle" className="font-mono text-sm font-bold fill-blue-700">−</text>
                  <text x="36" y="5" textAnchor="start" className="font-mono text-xs font-bold fill-slate-900">
                    V_s = {vsSeries} V
                  </text>
                </g>

                {/* Resistor R1 */}
                <g transform="translate(265, 80)">
                  <rect x="-42" y="-14" width="84" height="28" rx="4" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.5" />
                  <polyline
                    points="-30,0 -20,-8 -10,8 0,-8 10,8 20,-8 30,0"
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="2.2"
                  />
                  <text x="0" y="-22" textAnchor="middle" className="font-mono text-xs font-bold fill-slate-900">
                    R₁ = {r1Series} Ω
                  </text>
                  <text x="0" y="34" textAnchor="middle" className="font-mono text-xs font-bold fill-amber-700">
                    +   v₁ = {v1Drop.toFixed(2)} V   −
                  </text>
                </g>

                {/* Resistor R2 */}
                <g transform="translate(425, 80)">
                  <rect x="-42" y="-14" width="84" height="28" rx="4" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.5" />
                  <polyline
                    points="-30,0 -20,-8 -10,8 0,-8 10,8 20,-8 30,0"
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="2.2"
                  />
                  <text x="0" y="-22" textAnchor="middle" className="font-mono text-xs font-bold fill-slate-900">
                    R₂ = {r2Series} Ω
                  </text>
                  <text x="0" y="34" textAnchor="middle" className="font-mono text-xs font-bold fill-amber-700">
                    +   v₂ = {v2Drop.toFixed(2)} V   −
                  </text>
                </g>
              </svg>
            </div>

            {/* Proportional Voltage Distribution Bar */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs font-medium text-slate-700">
                <span>Distribución Proporcional de Tensión (A mayor resistencia, mayor caída):</span>
                <span className="font-mono">v₁ + v₂ = {vsSeries.toFixed(1)} V</span>
              </div>
              <div className="w-full h-7 rounded-lg overflow-hidden flex border border-slate-300 font-mono text-xs font-bold text-white">
                <div
                  style={{ width: `${(r1Series / reqSeries) * 100}%` }}
                  className="bg-[#0284C7] flex items-center justify-center transition-all duration-150 overflow-hidden whitespace-nowrap"
                >
                  v₁: {v1Drop.toFixed(1)} V ({Math.round((r1Series / reqSeries) * 100)}%)
                </div>
                <div
                  style={{ width: `${(r2Series / reqSeries) * 100}%` }}
                  className="bg-amber-600 flex items-center justify-center transition-all duration-150 overflow-hidden whitespace-nowrap"
                >
                  v₂: {v2Drop.toFixed(1)} V ({Math.round((r2Series / reqSeries) * 100)}%)
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
              <h3 className="text-base font-semibold text-slate-900">
                Fórmulas de Serie y Divisor de Voltaje (Páginas 11–12)
              </h3>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs space-y-1.5">
                <div className="text-slate-500">1. Resistencia equivalente en serie (Ec. 3.3):</div>
                <div className="text-slate-900 font-bold">
                  R_eq = R₁ + R₂ = {r1Series} Ω + {r2Series} Ω = {reqSeries} Ω
                </div>
                <div className="text-[11px] text-slate-600">
                  Nota: R_eq ({reqSeries} Ω) siempre es mayor que cualquiera de las resistencias individuales.
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs space-y-1.5">
                <div className="text-slate-500">2. Divisor de voltaje directo (Ec. 3.4):</div>
                <div className="text-[#0284C7] font-bold">
                  v₁ = V_s · [R₁ / (R₁ + R₂)] = {vsSeries} · [{r1Series} / {reqSeries}] = {v1Drop.toFixed(2)} V
                </div>
                <div className="text-amber-700 font-bold">
                  v₂ = V_s · [R₂ / (R₁ + R₂)] = {vsSeries} · [{r2Series} / {reqSeries}] = {v2Drop.toFixed(2)} V
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 flex-1 space-y-4">
              <h3 className="text-base font-semibold text-slate-900">
                Parámetros del Divisor de Voltaje
              </h3>
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span>Voltaje de Fuente V_s</span>
                  <span className="font-mono font-bold text-[#0284C7]">{vsSeries} V</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={60}
                  step={2}
                  value={vsSeries}
                  onChange={(e) => setVsSeries(Number(e.target.value))}
                  className="w-full accent-[#0284C7]"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span>Resistor R₁</span>
                  <span className="font-mono font-bold text-slate-900">{r1Series} Ω</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={r1Series}
                  onChange={(e) => setR1Series(Number(e.target.value))}
                  className="w-full accent-[#0284C7]"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span>Resistor R₂</span>
                  <span className="font-mono font-bold text-slate-900">{r2Series} Ω</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={r2Series}
                  onChange={(e) => setR2Series(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* PARALLEL, CURRENT DIVIDER & EXTREME CASES (Section 1.12 / Figure 22) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Dos Resistores en Paralelo y Casos Extremos (Figura 22)
                </h2>
                <p className="text-xs text-slate-500">
                  Ambos resistores comparten la misma tensión entre el Nodo a y el Nodo b; la rama con menor resistencia conduce mayor corriente.
                </p>
              </div>

              {/* Extreme Cases Buttons (Pages 15-16 of Guide) */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setLimitCase('normal')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                    limitCase === 'normal'
                      ? 'bg-[#0F172A] text-white border-[#0F172A]'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Operación Normal
                </button>
                <button
                  onClick={() => setLimitCase('short')}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                    limitCase === 'short'
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-red-700 border-red-300 hover:bg-red-50'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  Cortocircuito (R₂ = 0 Ω)
                </button>
                <button
                  onClick={() => setLimitCase('open')}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                    limitCase === 'open'
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white text-amber-800 border-amber-300 hover:bg-amber-50'
                  }`}
                >
                  <ZapOff className="w-3.5 h-3.5" />
                  Circuito Abierto (R₂ → ∞)
                </button>
              </div>
            </div>

            {/* SVG Schematic matching Figure 22 */}
            <div className="relative w-full h-[360px] rounded-lg border border-slate-200 engineering-grid flex items-center justify-center">
              <svg viewBox="0 0 640 340" className="w-full h-full select-none">
                {/* Node a (Top green bus box as in Fig 22) */}
                <rect
                  x="230"
                  y="48"
                  width="270"
                  height="20"
                  rx="4"
                  fill="#ECFDF5"
                  stroke="#16A34A"
                  strokeWidth="1.8"
                />
                <text x="365" y="38" textAnchor="middle" className="font-mono text-xs font-bold fill-emerald-700">
                  Nodo a (Tensión compartida v = {limitCase === 'short' ? '0.0' : vsParallel} V)
                </text>

                {/* Node b (Bottom green bus box as in Fig 22) */}
                <rect
                  x="230"
                  y="272"
                  width="270"
                  height="20"
                  rx="4"
                  fill="#ECFDF5"
                  stroke="#16A34A"
                  strokeWidth="1.8"
                />
                <text x="365" y="312" textAnchor="middle" className="font-mono text-xs font-bold fill-emerald-700">
                  Nodo b (Referencia)
                </text>

                {/* Source branch on left */}
                <line x1="120" y1="58" x2="460" y2="58" stroke="#334155" strokeWidth="3" />
                <line x1="120" y1="58" x2="120" y2="282" stroke="#334155" strokeWidth="3" />
                <line x1="120" y1="282" x2="460" y2="282" stroke="#334155" strokeWidth="3" />

                {/* Total current animation from source */}
                <line
                  x1="120"
                  y1="58"
                  x2="270"
                  y2="58"
                  stroke="#DC2626"
                  strokeWidth="3.5"
                  className="animate-current-forward"
                />
                <text x="180" y="45" textAnchor="middle" className="font-mono text-xs font-bold fill-red-600">
                  i_s = {limitCase === 'short' ? '∞ (Corto)' : `${iTotalParallel.toFixed(2)} A`} →
                </text>

                {/* Source Vs */}
                <g transform="translate(120, 170)">
                  <circle r="26" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.5" />
                  <text x="0" y="-6" textAnchor="middle" className="font-mono text-sm font-bold fill-blue-700">+</text>
                  <text x="0" y="16" textAnchor="middle" className="font-mono text-sm font-bold fill-blue-700">−</text>
                  <text x="34" y="5" textAnchor="start" className="font-mono text-xs font-bold fill-slate-900">
                    V_s = {vsParallel} V
                  </text>
                </g>

                {/* Branch 1 (R1) at x = 280 */}
                <line x1="280" y1="58" x2="280" y2="282" stroke="#334155" strokeWidth="3" />
                {limitCase !== 'short' && (
                  <line
                    x1="280"
                    y1="58"
                    x2="280"
                    y2="282"
                    stroke="#0284C7"
                    strokeWidth="3.5"
                    className="animate-current-forward"
                  />
                )}
                <g transform="translate(280, 170)">
                  <rect x="-16" y="-36" width="32" height="72" rx="4" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.5" />
                  <polyline
                    points="0,-28 -8,-18 8,-8 -8,2 8,12 -8,22 0,28"
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="2.2"
                  />
                  <text x="26" y="-6" className="font-mono text-xs font-bold fill-slate-900">
                    R₁ = {r1Parallel} Ω
                  </text>
                  <text x="26" y="14" className="font-mono text-xs font-bold fill-[#0284C7]">
                    ↓ i₁ = {i1Parallel.toFixed(2)} A
                  </text>
                </g>

                {/* Branch 2 (R2) at x = 460 */}
                {limitCase === 'open' ? (
                  <g>
                    <line x1="460" y1="58" x2="460" y2="135" stroke="#94A3B8" strokeWidth="3" strokeDasharray="5 5" />
                    <line x1="460" y1="205" x2="460" y2="282" stroke="#94A3B8" strokeWidth="3" strokeDasharray="5 5" />
                    <circle cx="460" cy="135" r="5" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.5" />
                    <circle cx="460" cy="205" r="5" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.5" />
                    <text x="480" y="166" className="font-mono text-xs font-bold fill-amber-800">
                      R₂ → ∞ (Abierto)
                    </text>
                    <text x="480" y="184" className="font-mono text-xs font-bold fill-slate-500">
                      i₂ = 0.00 A (Sin paso)
                    </text>
                  </g>
                ) : limitCase === 'short' ? (
                  <g>
                    <line x1="460" y1="58" x2="460" y2="282" stroke="#DC2626" strokeWidth="5" />
                    <line
                      x1="460"
                      y1="58"
                      x2="460"
                      y2="282"
                      stroke="#FEF08A"
                      strokeWidth="3.5"
                      className="animate-current-forward"
                    />
                    <text x="480" y="166" className="font-mono text-xs font-bold fill-red-700">
                      ▲ CORTOCIRCUITO (R₂ = 0 Ω)
                    </text>
                    <text x="480" y="184" className="font-mono text-xs font-bold fill-red-600">
                      100% de la corriente por esta rama
                    </text>
                  </g>
                ) : (
                  <g>
                    <line x1="460" y1="58" x2="460" y2="282" stroke="#334155" strokeWidth="3" />
                    <line
                      x1="460"
                      y1="58"
                      x2="460"
                      y2="282"
                      stroke="#059669"
                      strokeWidth="3.5"
                      className="animate-current-forward"
                    />
                    <g transform="translate(460, 170)">
                      <rect x="-16" y="-36" width="32" height="72" rx="4" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.5" />
                      <polyline
                        points="0,-28 -8,-18 8,-8 -8,2 8,12 -8,22 0,28"
                        fill="none"
                        stroke="#D97706"
                        strokeWidth="2.2"
                      />
                      <text x="26" y="-6" className="font-mono text-xs font-bold fill-slate-900">
                        R₂ = {r2Parallel} Ω
                      </text>
                      <text x="26" y="14" className="font-mono text-xs font-bold fill-emerald-700">
                        ↓ i₂ = {i2Parallel.toFixed(2)} A
                      </text>
                    </g>
                  </g>
                )}
              </svg>
            </div>

            {/* Diagnostic Banner for Limit Cases (Pages 15-16) */}
            {limitCase === 'short' && (
              <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-950 text-xs flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Caso Extremo a) Cortocircuito en una rama (R₂ = 0 Ω — Página 15):</p>
                  <p className="mt-1">
                    1. La resistencia equivalente total tiende a <strong>0 Ω</strong> (R_eq = 0 Ω). 2. Toda la corriente se concentra en la trayectoria de menor resistencia (el cortocircuito), dejando a R₁ sin corriente (i₁ = 0 A).
                  </p>
                </div>
              </div>
            )}
            {limitCase === 'open' && (
              <div className="mt-4 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Caso Extremo b) Circuito abierto en una rama (R₂ → ∞ — Página 16):</p>
                  <p className="mt-1">
                    1. No circula corriente por la rama abierta (i₂ = 0 A). 2. La resistencia equivalente viene dada únicamente por las demás ramas conectadas (R_eq = R₁ = {r1Parallel} Ω).
                  </p>
                </div>
              </div>
            )}
            {limitCase === 'normal' && (
              <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs flex items-center justify-between">
                <span>
                  <strong>Propiedad fundamental (Pág. 15):</strong> R_eq ({reqParallel.toFixed(2)} Ω) es siempre menor que el resistor más pequeño ({Math.min(r1Parallel, r2Parallel)} Ω).
                </span>
                <span className="font-mono font-semibold text-emerald-700 shrink-0">
                  <CheckCircle2 className="w-4 h-4 inline mr-1" />
                  LCK Nodo a: {iTotalParallel.toFixed(2)} A = {i1Parallel.toFixed(2)} A + {i2Parallel.toFixed(2)} A
                </span>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
              <h3 className="text-base font-semibold text-slate-900">
                Fórmulas de Paralelo y Divisor de Corriente (Páginas 14–16)
              </h3>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs space-y-1.5">
                <div className="text-slate-500">1. Resistencia equivalente de dos resistores (Ec. 3.6):</div>
                <div className="text-slate-900 font-bold">
                  R_eq = (R₁ · R₂) / (R₁ + R₂) ={' '}
                  {limitCase === 'open'
                    ? `${r1Parallel.toFixed(2)} Ω (R₂ abierto)`
                    : `${reqParallel.toFixed(2)} Ω`}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs space-y-1.5">
                <div className="text-slate-500">
                  2. Divisor de corriente (con el &ldquo;resistor opuesto&rdquo; en el numerador):
                </div>
                <div className="text-[#0284C7] font-bold">
                  i₁ = i_s · [R₂ / (R₁ + R₂)] = {i1Parallel.toFixed(2)} A
                </div>
                <div className="text-emerald-700 font-bold">
                  i₂ = i_s · [R₁ / (R₁ + R₂)] = {limitCase === 'short' ? '∞ (Corto)' : `${i2Parallel.toFixed(2)} A`}
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 flex-1 space-y-4">
              <h3 className="text-base font-semibold text-slate-900">
                Parámetros del Circuito en Paralelo
              </h3>
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span>Voltaje de Fuente V_s</span>
                  <span className="font-mono font-bold text-[#0284C7]">{vsParallel} V</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={48}
                  step={3}
                  value={vsParallel}
                  onChange={(e) => setVsParallel(Number(e.target.value))}
                  className="w-full accent-[#0284C7]"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span>Resistor R₁ (Rama izquierda)</span>
                  <span className="font-mono font-bold text-slate-900">{r1Parallel} Ω</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={r1Parallel}
                  onChange={(e) => setR1Parallel(Number(e.target.value))}
                  className="w-full accent-[#0284C7]"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span>
                    Resistor R₂ (Rama derecha){' '}
                    {limitCase !== 'normal' && `(Forzado por caso extremo: ${effectiveR2} Ω)`}
                  </span>
                  <span className="font-mono font-bold text-slate-900">{r2Parallel} Ω</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  disabled={limitCase !== 'normal'}
                  value={r2Parallel}
                  onChange={(e) => setR2Parallel(Number(e.target.value))}
                  className="w-full accent-emerald-600 disabled:opacity-40"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
