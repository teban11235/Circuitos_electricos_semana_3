import React, { useState } from 'react';
import { RotateCcw, RotateCw, RotateCcw as CounterClockwiseIcon, ArrowUpDown, CheckCircle2 } from 'lucide-react';

export const LvkModule: React.FC = () => {
  const [subTab, setSubTab] = useState<'fig19' | 'fig20'>('fig19');

  // Figure 19 state: Single loop with v1 (source), v2 (drop), v3 (drop), v4 (source), v5 (drop)
  // In Fig 19: -v1 + v2 + v3 - v4 + v5 = 0 => v1 + v4 = v2 + v3 + v5
  const [direction, setDirection] = useState<'cw' | 'ccw'>('cw');
  const [v1, setV1] = useState<number>(20);
  const [v4, setV4] = useState<number>(10);
  const [r2, setR2] = useState<number>(4);
  const [r3, setR3] = useState<number>(6);
  const [r5, setR5] = useState<number>(5);
  const [activeElement, setActiveElement] = useState<number | null>(null);

  // Derived loop current and voltage drops so LVK is physically exact
  const totalRise = v1 + v4;
  const totalResistance = r2 + r3 + r5;
  const loopCurrent = totalRise / totalResistance;
  const v2 = Number((loopCurrent * r2).toFixed(2));
  const v3 = Number((loopCurrent * r3).toFixed(2));
  const v5 = Number((loopCurrent * r5).toFixed(2));

  // Figure 20 state: Series voltage sources V1, V2, V3
  // In Fig 20: Vab = V1 + V2 - V3
  const [sV1, setSV1] = useState<number>(12);
  const [sV2, setSV2] = useState<number>(8);
  const [sV3, setSV3] = useState<number>(5);
  const [pol1, setPol1] = useState<1 | -1>(1);
  const [pol2, setPol2] = useState<1 | -1>(1);
  const [pol3, setPol3] = useState<1 | -1>(-1); // In Fig 20a, V3 has opposite polarity (- on top, + on bottom)

  const vAbEquivalent = pol1 * sV1 + pol2 * sV2 + pol3 * sV3;

  const resetDefaults = () => {
    if (subTab === 'fig19') {
      setDirection('cw');
      setV1(20);
      setV4(10);
      setR2(4);
      setR3(6);
      setR5(5);
      setActiveElement(null);
    } else {
      setSV1(12);
      setSV2(8);
      setSV3(5);
      setPol1(1);
      setPol2(1);
      setPol3(-1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
            <span>Sección 1.9</span>
            <span aria-hidden="true">·</span>
            <span>Figuras 19 y 20 de la Guía Didáctica</span>
            <span aria-hidden="true">·</span>
            <span>Conservación de la Energía</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Ley de Voltajes de Kirchhoff (LVK / KVL) y Fuentes en Serie
          </h1>
          <p className="text-slate-600 mt-1 max-w-3xl text-base">
            Al recorrer cualquier trayectoria cerrada (lazo o malla) en un circuito, la suma algebraica de todos los incrementos y caídas de potencial eléctrico es igual a cero (Ec. 3.2: Σ vₘ = 0).
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Sub-module segmented selector */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
            <button
              onClick={() => setSubTab('fig19')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                subTab === 'fig19'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Figura 19: Lazo Simple LVK
            </button>
            <button
              onClick={() => setSubTab('fig20')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                subTab === 'fig20'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Figura 20: Fuentes en Serie
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

      {subTab === 'fig19' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Zone: Interactive SVG Loop (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Recorrido de Malla y Primer Signo Encontrado (Figura 19)
                </h2>
                <p className="text-xs text-slate-500">
                  Cambia el sentido de recorrido (Horario vs. Antihorario) o selecciona un elemento para inspeccionar su signo.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDirection('cw')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                    direction === 'cw'
                      ? 'bg-[#0F172A] text-white border-[#0F172A]'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  Sentido Horario
                </button>
                <button
                  onClick={() => setDirection('ccw')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                    direction === 'ccw'
                      ? 'bg-[#0F172A] text-white border-[#0F172A]'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <CounterClockwiseIcon className="w-3.5 h-3.5" />
                  Sentido Antihorario
                </button>
              </div>
            </div>

            {/* SVG Schematic matching Figure 19 */}
            <div className="relative w-full h-[390px] rounded-lg border border-slate-200 engineering-grid flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 640 380" className="w-full h-full select-none">
                {/* Main rectangular loop wire */}
                <rect
                  x="110"
                  y="70"
                  width="420"
                  height="240"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="3"
                />
                {/* Animated current flow along the loop */}
                <rect
                  x="110"
                  y="70"
                  width="420"
                  height="240"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="3"
                  className="animate-current-forward"
                />

                {/* Center Loop Traversal Indicator */}
                <g transform="translate(320, 190)">
                  <circle
                    r="42"
                    fill="#FFFFFF"
                    stroke="#0F172A"
                    strokeWidth="2"
                    strokeDasharray="6 3"
                  />
                  <text
                    x="0"
                    y="-4"
                    textAnchor="middle"
                    className="font-display text-xs font-bold fill-slate-900"
                  >
                    {direction === 'cw' ? '↻ HORARIO' : '↺ ANTIHORARIO'}
                  </text>
                  <text
                    x="0"
                    y="14"
                    textAnchor="middle"
                    className="font-mono text-[11px] fill-[#0284C7] font-semibold"
                  >
                    i = {loopCurrent.toFixed(2)} A
                  </text>
                </g>

                {/* Element 1: Source v1 on left vertical branch (+ top, - bottom) */}
                <g
                  transform="translate(110, 190)"
                  onClick={() => setActiveElement(1)}
                  className="cursor-pointer"
                >
                  <circle
                    r="26"
                    fill="#FFFFFF"
                    stroke={activeElement === 1 ? '#0284C7' : '#2563EB'}
                    strokeWidth={activeElement === 1 ? '3.5' : '2.5'}
                  />
                  <text x="0" y="-6" textAnchor="middle" className="font-mono text-sm font-bold fill-blue-700">
                    +
                  </text>
                  <text x="0" y="16" textAnchor="middle" className="font-mono text-sm font-bold fill-blue-700">
                    −
                  </text>
                  <text x="-48" y="4" textAnchor="end" className="font-mono text-xs font-bold fill-slate-900">
                    v₁ = {v1} V
                  </text>
                  <text x="-48" y="20" textAnchor="end" className="font-mono text-[10px] fill-amber-700 font-semibold">
                    {direction === 'cw' ? '1er signo: −v₁' : '1er signo: +v₁'}
                  </text>
                </g>

                {/* Element 2: Resistor v2 on top left (+ left, - right) */}
                <g
                  transform="translate(230, 70)"
                  onClick={() => setActiveElement(2)}
                  className="cursor-pointer"
                >
                  <rect x="-36" y="-14" width="72" height="28" rx="4" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.5" />
                  <polyline
                    points="-28,0 -20,-8 -12,8 -4,-8 4,8 12,-8 20,8 28,0"
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="2.2"
                  />
                  <text x="-44" y="-18" className="font-mono text-xs font-bold fill-slate-900">+</text>
                  <text x="38" y="-18" className="font-mono text-xs font-bold fill-slate-900">−</text>
                  <text x="0" y="-22" textAnchor="middle" className="font-mono text-xs font-bold fill-slate-900">
                    v₂ = {v2} V ({r2} Ω)
                  </text>
                  <text x="0" y="30" textAnchor="middle" className="font-mono text-[10px] fill-sky-700 font-semibold">
                    {direction === 'cw' ? '1er signo: +v₂' : '1er signo: −v₂'}
                  </text>
                </g>

                {/* Element 3: Resistor v3 on top right (+ left, - right) */}
                <g
                  transform="translate(410, 70)"
                  onClick={() => setActiveElement(3)}
                  className="cursor-pointer"
                >
                  <rect x="-36" y="-14" width="72" height="28" rx="4" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.5" />
                  <polyline
                    points="-28,0 -20,-8 -12,8 -4,-8 4,8 12,-8 20,8 28,0"
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="2.2"
                  />
                  <text x="-44" y="-18" className="font-mono text-xs font-bold fill-slate-900">+</text>
                  <text x="38" y="-18" className="font-mono text-xs font-bold fill-slate-900">−</text>
                  <text x="0" y="-22" textAnchor="middle" className="font-mono text-xs font-bold fill-slate-900">
                    v₃ = {v3} V ({r3} Ω)
                  </text>
                  <text x="0" y="30" textAnchor="middle" className="font-mono text-[10px] fill-sky-700 font-semibold">
                    {direction === 'cw' ? '1er signo: +v₃' : '1er signo: −v₃'}
                  </text>
                </g>

                {/* Element 4: Source v4 on right vertical branch (- top, + bottom as in Fig 19) */}
                <g
                  transform="translate(530, 190)"
                  onClick={() => setActiveElement(4)}
                  className="cursor-pointer"
                >
                  <circle
                    r="26"
                    fill="#FFFFFF"
                    stroke={activeElement === 4 ? '#0284C7' : '#2563EB'}
                    strokeWidth={activeElement === 4 ? '3.5' : '2.5'}
                  />
                  <text x="0" y="-6" textAnchor="middle" className="font-mono text-sm font-bold fill-blue-700">
                    −
                  </text>
                  <text x="0" y="16" textAnchor="middle" className="font-mono text-sm font-bold fill-blue-700">
                    +
                  </text>
                  <text x="42" y="4" textAnchor="start" className="font-mono text-xs font-bold fill-slate-900">
                    v₄ = {v4} V
                  </text>
                  <text x="42" y="20" textAnchor="start" className="font-mono text-[10px] fill-amber-700 font-semibold">
                    {direction === 'cw' ? '1er signo: −v₄' : '1er signo: +v₄'}
                  </text>
                </g>

                {/* Element 5: Passive element v5 on bottom (- left, + right as in Fig 19) */}
                <g
                  transform="translate(320, 310)"
                  onClick={() => setActiveElement(5)}
                  className="cursor-pointer"
                >
                  <rect
                    x="-42"
                    y="-14"
                    width="84"
                    height="28"
                    rx="4"
                    fill="#FFE4E6"
                    stroke="#E11D48"
                    strokeWidth="2.5"
                  />
                  <text x="-54" y="26" className="font-mono text-xs font-bold fill-slate-900">−</text>
                  <text x="48" y="26" className="font-mono text-xs font-bold fill-slate-900">+</text>
                  <text x="0" y="4" textAnchor="middle" className="font-mono text-xs font-bold fill-rose-900">
                    v₅ = {v5} V ({r5} Ω)
                  </text>
                  <text x="0" y="-22" textAnchor="middle" className="font-mono text-[10px] fill-sky-700 font-semibold">
                    {direction === 'cw' ? '1er signo: +v₅' : '1er signo: −v₅'}
                  </text>
                </g>
              </svg>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-4">
              <span>
                <strong>Regla de la página 5:</strong> Si al recorrer la rama entramos por el terminal positivo (+), sumamos <strong>+v</strong>; si entramos por el negativo (−), sumamos <strong>−v</strong>.
              </span>
              <span className="font-mono text-emerald-700 font-semibold">
                ✓ Energía aportada ({totalRise.toFixed(1)} V) = Caídas ({(v2 + v3 + v5).toFixed(1)} V)
              </span>
            </div>
          </div>

          {/* Right Zone: Equations & Sliders (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <h3 className="text-base font-semibold text-slate-900">
                Deducción de la Ecuación LVK ({direction === 'cw' ? 'Sentido Horario' : 'Sentido Antihorario'})
              </h3>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs space-y-2">
                <div className="text-slate-500">
                  1. Tomando el primer signo de cada elemento al recorrer el lazo:
                </div>
                <div className="text-slate-900 font-bold text-sm">
                  {direction === 'cw'
                    ? '−v₁ + v₂ + v₃ − v₄ + v₅ = 0'
                    : '+v₁ − v₅ + v₄ − v₃ − v₂ = 0'}
                </div>
                <div className="text-slate-600">
                  {direction === 'cw'
                    ? `−(${v1}) + ${v2} + ${v3} − (${v4}) + ${v5} = 0`
                    : `+${v1} − ${v5} + ${v4} − ${v3} − ${v2} = 0`}
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs space-y-2">
                <div className="text-slate-500">
                  2. Suma de aumentos de tensión = Suma de caídas de tensión:
                </div>
                <div className="text-slate-900 font-bold text-sm">
                  v₁ + v₄ = v₂ + v₃ + v₅
                </div>
                <div className="text-[#0284C7] font-semibold">
                  {v1} V + {v4} V = {v2} V + {v3} V + {v5} V ({totalRise.toFixed(1)} V = {(v2 + v3 + v5).toFixed(1)} V)
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 flex-1 space-y-4">
              <h3 className="text-base font-semibold text-slate-900">
                Parámetros del Lazo (Fuentes y Elementos Pasivos)
              </h3>

              <div className="space-y-3.5">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-700">Fuente de Tensión v₁ (Subida en sentido horario)</span>
                    <span className="font-mono font-semibold text-blue-700">{v1} V</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={40}
                    step={1}
                    value={v1}
                    onChange={(e) => setV1(Number(e.target.value))}
                    className="w-full accent-[#0284C7]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-700">Fuente de Tensión v₄ (Subida en sentido horario)</span>
                    <span className="font-mono font-semibold text-blue-700">{v4} V</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={30}
                    step={1}
                    value={v4}
                    onChange={(e) => setV4(Number(e.target.value))}
                    className="w-full accent-[#0284C7]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-200">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      R₂: <span className="font-mono text-slate-900 font-semibold">{r2} Ω</span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={15}
                      step={1}
                      value={r2}
                      onChange={(e) => setR2(Number(e.target.value))}
                      className="w-full accent-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      R₃: <span className="font-mono text-slate-900 font-semibold">{r3} Ω</span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={15}
                      step={1}
                      value={r3}
                      onChange={(e) => setR3(Number(e.target.value))}
                      className="w-full accent-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      R₅: <span className="font-mono text-slate-900 font-semibold">{r5} Ω</span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={15}
                      step={1}
                      value={r5}
                      onChange={(e) => setR5(Number(e.target.value))}
                      className="w-full accent-rose-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Figure 20: Series Voltage Sources */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Fuentes de Tensión en Serie: Circuito Original vs. Equivalente (Figura 20)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Cuando varias fuentes de voltaje están en serie, pueden reemplazarse por una única fuente equivalente V_S igual a la suma algebraica de las fuentes individuales.
              </p>
            </div>

            <div className="relative w-full h-[380px] my-4 rounded-lg border border-slate-200 engineering-grid flex items-center justify-center">
              <svg viewBox="0 0 640 360" className="w-full h-full select-none">
                {/* a) Original Circuit */}
                <text x="160" y="34" textAnchor="middle" className="font-display text-sm font-bold fill-slate-900">
                  a) Circuito Original
                </text>
                <line x1="120" y1="60" x2="200" y2="60" stroke="#334155" strokeWidth="2.5" />
                <line x1="200" y1="60" x2="200" y2="300" stroke="#334155" strokeWidth="2.5" />
                <line x1="120" y1="300" x2="200" y2="300" stroke="#334155" strokeWidth="2.5" />

                <circle cx="120" cy="60" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
                <text x="105" y="64" textAnchor="end" className="font-mono text-sm font-bold fill-slate-900">a</text>
                <text x="120" y="84" textAnchor="middle" className="font-mono text-sm font-bold fill-slate-700">+</text>

                <circle cx="120" cy="300" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
                <text x="105" y="304" textAnchor="end" className="font-mono text-sm font-bold fill-slate-900">b</text>
                <text x="120" y="282" textAnchor="middle" className="font-mono text-sm font-bold fill-slate-700">−</text>
                <text x="120" y="185" textAnchor="middle" className="font-mono text-sm font-bold fill-[#0284C7]">
                  V_ab = {vAbEquivalent} V
                </text>

                {/* V1, V2, V3 on the vertical line x=200 */}
                {[
                  { y: 110, label: 'V₁', val: sV1, pol: pol1 },
                  { y: 180, label: 'V₂', val: sV2, pol: pol2 },
                  { y: 250, label: 'V₃', val: sV3, pol: pol3 },
                ].map((src, i) => (
                  <g key={i} transform={`translate(200, ${src.y})`}>
                    <circle r="22" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.5" />
                    <text x="0" y="-4" textAnchor="middle" className="font-mono text-xs font-bold fill-blue-700">
                      {src.pol === 1 ? '+' : '−'}
                    </text>
                    <text x="0" y="14" textAnchor="middle" className="font-mono text-xs font-bold fill-blue-700">
                      {src.pol === 1 ? '−' : '+'}
                    </text>
                    <text x="34" y="5" textAnchor="start" className="font-mono text-xs font-bold fill-slate-900">
                      {src.label} ({src.val} V)
                    </text>
                  </g>
                ))}

                {/* Arrow between a) and b) */}
                <text x="335" y="185" textAnchor="middle" className="font-mono text-xl font-bold fill-slate-400">
                  ⇒
                </text>

                {/* b) Equivalent Circuit */}
                <text x="480" y="34" textAnchor="middle" className="font-display text-sm font-bold fill-slate-900">
                  b) Circuito Equivalente
                </text>
                <line x1="430" y1="90" x2="500" y2="90" stroke="#334155" strokeWidth="2.5" />
                <line x1="500" y1="90" x2="500" y2="270" stroke="#334155" strokeWidth="2.5" />
                <line x1="430" y1="270" x2="500" y2="270" stroke="#334155" strokeWidth="2.5" />

                <circle cx="430" cy="90" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
                <text x="415" y="94" textAnchor="end" className="font-mono text-sm font-bold fill-slate-900">a</text>
                <text x="430" y="114" textAnchor="middle" className="font-mono text-sm font-bold fill-slate-700">+</text>

                <circle cx="430" cy="270" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
                <text x="415" y="274" textAnchor="end" className="font-mono text-sm font-bold fill-slate-900">b</text>
                <text x="430" y="252" textAnchor="middle" className="font-mono text-sm font-bold fill-slate-700">−</text>

                <g transform="translate(500, 180)">
                  <circle r="28" fill="#F0F9FF" stroke="#0284C7" strokeWidth="3" />
                  <text x="0" y="-6" textAnchor="middle" className="font-mono text-sm font-bold fill-[#0284C7]">
                    +
                  </text>
                  <text x="0" y="16" textAnchor="middle" className="font-mono text-sm font-bold fill-[#0284C7]">
                    −
                  </text>
                  <text x="38" y="-2" textAnchor="start" className="font-mono text-xs font-bold fill-slate-900">
                    V_S = {vAbEquivalent} V
                  </text>
                  <text x="38" y="15" textAnchor="start" className="font-mono text-[11px] fill-slate-500">
                    Fuente combinada
                  </text>
                </g>
              </svg>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
              <span>
                En la Figura 20 de la guía: V₁ y V₂ tienen el terminal (+) arriba, mientras que V₃ está invertida (− arriba).
              </span>
              <span className="font-mono font-semibold text-emerald-700 shrink-0">
                <CheckCircle2 className="w-4 h-4 inline mr-1" />
                V_ab = {vAbEquivalent} V
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
              <h3 className="text-base font-semibold text-slate-900">
                Aplicación de la LVK (Página 7 de la Guía)
              </h3>
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs space-y-2">
                <div className="text-slate-500">Planteando LVK alrededor de los terminales a–b:</div>
                <div className="text-slate-900 font-bold">
                  −V_ab {pol1 === 1 ? '+ V₁' : '− V₁'} {pol2 === 1 ? '+ V₂' : '− V₂'} {pol3 === 1 ? '+ V₃' : '− V₃'} = 0
                </div>
                <div className="text-slate-500 pt-1">Reescribiendo para la fuente equivalente V_S:</div>
                <div className="text-[#0284C7] font-bold text-sm">
                  V_ab = V_S = ({pol1 === 1 ? '+' : '−'}{sV1}) + ({pol2 === 1 ? '+' : '−'}{sV2}) + ({pol3 === 1 ? '+' : '−'}{sV3}) = {vAbEquivalent} V
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 flex-1 space-y-4">
              <h3 className="text-base font-semibold text-slate-900">
                Configuración de las 3 Fuentes en Serie
              </h3>

              {[
                { label: 'Fuente V₁', val: sV1, setVal: setSV1, pol: pol1, setPol: setPol1 },
                { label: 'Fuente V₂', val: sV2, setVal: setSV2, pol: pol2, setPol: setPol2 },
                { label: 'Fuente V₃', val: sV3, setVal: setSV3, pol: pol3, setPol: setPol3 },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-lg border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900">
                      {item.label}: <span className="font-mono text-[#0284C7]">{item.val} V</span>
                    </span>
                    <button
                      onClick={() => item.setPol(item.pol === 1 ? -1 : 1)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors whitespace-nowrap shrink-0"
                    >
                      <ArrowUpDown className="w-3 h-3" />
                      Polaridad: {item.pol === 1 ? '(+ arriba / − abajo)' : '(− arriba / + abajo)'}
                    </button>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={25}
                    step={1}
                    value={item.val}
                    onChange={(e) => item.setVal(Number(e.target.value))}
                    className="w-full accent-[#0284C7]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
