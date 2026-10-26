import React, { useState, useMemo } from 'react';
import { RotateCcw, ArrowRightLeft, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';
import { LckBranch } from '../types/circuit';

const INITIAL_BRANCHES: LckBranch[] = [
  { id: 'i1', label: 'i₁', angleDeg: 225, direction: 'in', currentMa: 8, color: '#DC2626' },
  { id: 'i2', label: 'i₂', angleDeg: 160, direction: 'out', currentMa: 11, color: '#16A34A' },
  { id: 'i3', label: 'i₃', angleDeg: 90, direction: 'in', currentMa: 9, color: '#2563EB' },
  { id: 'i4', label: 'i₄', angleDeg: 35, direction: 'in', currentMa: 6, color: '#DB2777' },
  { id: 'i5', label: 'i₅', angleDeg: 320, direction: 'out', currentMa: 12, color: '#0284C7' },
];

export const LckModule: React.FC = () => {
  const [branches, setBranches] = useState<LckBranch[]>(INITIAL_BRANCHES);
  const [solveForId, setSolveForId] = useState<string>('i5');
  const [autoBalance, setAutoBalance] = useState<boolean>(true);

  const computedBranches = useMemo(() => {
    if (!autoBalance) return branches;

    // Calculate what solveForId must be so that sum(in) - sum(out) = 0
    // Convention: entering (+) / leaving (-)
    let algebraicSumOthers = 0;
    branches.forEach((b) => {
      if (b.id !== solveForId) {
        algebraicSumOthers += b.direction === 'in' ? b.currentMa : -b.currentMa;
      }
    });

    return branches.map((b) => {
      if (b.id !== solveForId) return b;
      // For total sum = 0: algebraicSumOthers + (sign * b.currentMa) = 0
      // => b.currentMa = -algebraicSumOthers / sign
      const sign = b.direction === 'in' ? 1 : -1;
      const solvedVal = -algebraicSumOthers / sign;
      return { ...b, currentMa: Number(solvedVal.toFixed(1)) };
    });
  }, [branches, solveForId, autoBalance]);

  const sumIn = useMemo(
    () =>
      computedBranches
        .filter((b) => b.direction === 'in')
        .reduce((acc, b) => acc + b.currentMa, 0),
    [computedBranches]
  );

  const sumOut = useMemo(
    () =>
      computedBranches
        .filter((b) => b.direction === 'out')
        .reduce((acc, b) => acc + b.currentMa, 0),
    [computedBranches]
  );

  const netResidual = Number((sumIn - sumOut).toFixed(1));
  const solvedBranch = computedBranches.find((b) => b.id === solveForId);

  const handleCurrentChange = (id: string, value: number) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, currentMa: value } : b))
    );
  };

  const toggleDirection = (id: string) => {
    setBranches((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, direction: b.direction === 'in' ? 'out' : 'in' }
          : b
      )
    );
  };

  const resetGuideDefaults = () => {
    setBranches(INITIAL_BRANCHES);
    setSolveForId('i5');
    setAutoBalance(true);
  };

  const inLabels = computedBranches
    .filter((b) => b.direction === 'in')
    .map((b) => b.label);
  const outLabels = computedBranches
    .filter((b) => b.direction === 'out')
    .map((b) => b.label);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
            <span>Sección 1.8</span>
            <span aria-hidden="true">·</span>
            <span>Figura 18 de la Guía Didáctica</span>
            <span aria-hidden="true">·</span>
            <span>Conservación de la Carga Eléctrica</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Ley de Corrientes de Kirchhoff (LCK / KCL)
          </h1>
          <p className="text-slate-600 mt-1 max-w-3xl text-base">
            La suma algebraica de todas las corrientes que entran o salen de un nodo es igual a cero. Por convención, se asigna signo positivo (+) a la corriente que entra al nodo y negativo (−) a la que sale.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setAutoBalance(!autoBalance)}
            className={`px-4 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
              autoBalance
                ? 'bg-[#0284C7] text-white border-[#0284C7]'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            {autoBalance ? 'Modo: Despejar Incógnita Automática' : 'Modo: Exploración Libre de Nodo'}
          </button>
          <button
            onClick={resetGuideDefaults}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restaurar datos de la guía
          </button>
        </div>
      </div>

      {/* Two-Zone Sandbox Layout (65% Left Interactive Stage / 35% Right Control & Equations) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Zone: Interactive SVG Node Diagram (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Diagrama Interactivo del Nodo (Figura 18)
              </h2>
              <p className="text-xs text-slate-500">
                Haz clic en cualquier rama para invertir su flecha (Entra ↔ Sale) o elige cuál corriente despejar.
              </p>
            </div>
            <div className="text-right font-mono text-xs">
              {Math.abs(netResidual) < 0.05 ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  ✓ EQUILIBRIO LCK: Σi = 0 mA
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-amber-700 font-semibold">
                  <AlertTriangle className="w-4 h-4" />
                  ▲ DESBALANCE: Σi = {netResidual > 0 ? `+${netResidual}` : netResidual} mA
                </span>
              )}
            </div>
          </div>

          {/* Interactive SVG Canvas */}
          <div className="relative w-full h-[400px] rounded-lg border border-slate-200 engineering-grid flex items-center justify-center overflow-hidden">
            <svg
              viewBox="0 0 600 400"
              className="w-full h-full select-none"
              aria-label="Simulador de Nodo LCK Figura 18"
            >
              <defs>
                {computedBranches.map((b) => (
                  <marker
                    key={`arrow-${b.id}`}
                    id={`arrow-${b.id}`}
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 10 5 L 0 9 z" fill={b.color} />
                  </marker>
                ))}
              </defs>

              {/* Concentric subtle reference circles */}
              <circle
                cx="300"
                cy="200"
                r="145"
                fill="none"
                stroke="#E2E8F0"
                strokeDasharray="4 4"
              />
              <circle
                cx="300"
                cy="200"
                r="75"
                fill="none"
                stroke="#E2E8F0"
                strokeDasharray="3 3"
              />

              {/* Branches */}
              {computedBranches.map((b) => {
                const rad = (b.angleDeg * Math.PI) / 180;
                const outerR = 160;
                const innerR = 18;
                const outerX = 300 + outerR * Math.cos(rad);
                const outerY = 200 + outerR * Math.sin(rad);
                const innerX = 300 + innerR * Math.cos(rad);
                const innerY = 200 + innerR * Math.sin(rad);

                // Assigned arrow direction
                const startX = b.direction === 'in' ? outerX : innerX;
                const startY = b.direction === 'in' ? outerY : innerY;
                const endX = b.direction === 'in' ? innerX : outerX;
                const endY = b.direction === 'in' ? innerY : outerY;

                // Physical particle direction flips if currentMa < 0
                const isNegative = b.currentMa < 0;
                const labelR = 115;
                const labelX = 300 + labelR * Math.cos(rad) + (Math.sin(rad) * 28);
                const labelY = 200 + labelR * Math.sin(rad) - (Math.cos(rad) * 28);

                const isSolvedTarget = autoBalance && solveForId === b.id;

                return (
                  <g
                    key={b.id}
                    onClick={() => toggleDirection(b.id)}
                    className="cursor-pointer group"
                  >
                    {/* Base wire */}
                    <line
                      x1={startX}
                      y1={startY}
                      x2={endX}
                      y2={endY}
                      stroke={b.color}
                      strokeWidth={isSolvedTarget ? 4.5 : 3}
                      strokeOpacity={0.28}
                    />
                    {/* Animated current particles */}
                    {Math.abs(b.currentMa) > 0.05 && (
                      <line
                        x1={startX}
                        y1={startY}
                        x2={endX}
                        y2={endY}
                        stroke={b.color}
                        strokeWidth={isSolvedTarget ? 4 : 3}
                        markerEnd={`url(#arrow-${b.id})`}
                        className={
                          isNegative
                            ? 'animate-current-reverse'
                            : 'animate-current-forward'
                        }
                      />
                    )}
                    {Math.abs(b.currentMa) <= 0.05 && (
                      <line
                        x1={startX}
                        y1={startY}
                        x2={endX}
                        y2={endY}
                        stroke={b.color}
                        strokeWidth={2.5}
                        markerEnd={`url(#arrow-${b.id})`}
                      />
                    )}

                    {/* Branch Label Box */}
                    <g transform={`translate(${labelX}, ${labelY})`}>
                      <rect
                        x="-54"
                        y="-22"
                        width="108"
                        height="44"
                        rx="6"
                        fill="#FFFFFF"
                        stroke={isSolvedTarget ? '#0F172A' : b.color}
                        strokeWidth={isSolvedTarget ? '2' : '1.25'}
                      />
                      <text
                        x="0"
                        y="-4"
                        textAnchor="middle"
                        className="font-mono text-xs font-bold"
                        fill={b.color}
                      >
                        {b.label} = {b.currentMa} mA
                      </text>
                      <text
                        x="0"
                        y="12"
                        textAnchor="middle"
                        className="font-sans text-[10px] font-medium"
                        fill="#475569"
                      >
                        {b.direction === 'in' ? '→ ENTRA (+)' : '← SALE (−)'}
                        {isSolvedTarget ? ' [Incógnita]' : ''}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Central Node */}
              <circle
                cx="300"
                cy="200"
                r="14"
                fill="#0F172A"
                stroke="#FFFFFF"
                strokeWidth="3"
              />
              <text
                x="300"
                y="204"
                textAnchor="middle"
                fill="#FFFFFF"
                className="font-mono text-[10px] font-bold"
              >
                N
              </text>
            </svg>
          </div>

          {/* Negative Sign Interpretation Banner (Page 4 of Guide) */}
          {solvedBranch && solvedBranch.currentMa < 0 ? (
            <div className="mt-4 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-950 text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">
                  Interpretación Física del Resultado Negativo ({solvedBranch.label} = {solvedBranch.currentMa} mA):
                </p>
                <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                  Tal como explica la sección 1.8.1 de la guía: cuando una corriente calculada da negativa, <strong>no es un error automático</strong>, sino que indica que el sentido físico real de la corriente es <strong>opuesto al de la flecha asignada</strong> originalmente en el diagrama. Observa cómo las partículas en la rama {solvedBranch.label} se mueven en sentido contrario a la punta de la flecha.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs flex items-center justify-between gap-4">
              <span>
                <strong>Tip para la clase:</strong> Aumenta una corriente de salida hasta que la incógnita sea menor que 0 mA para demostrar qué significa un resultado negativo en LCK.
              </span>
              <span className="font-mono text-slate-900 shrink-0">
                Ec. 3.1: Σ iₙ = 0
              </span>
            </div>
          )}
        </div>

        {/* Right Zone: Parameter Controls & Live Mathematical Formulation (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Live Equation Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="text-base font-semibold text-slate-900 mb-3">
              Planteamiento Algebraico en Tiempo Real
            </h3>

            <div className="space-y-3 text-sm">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs space-y-1.5">
                <div className="text-slate-500">
                  1. Suma algebraica en el nodo (Entra +, Sale −):
                </div>
                <div className="text-slate-900 font-semibold break-words">
                  {computedBranches
                    .map((b, idx) => {
                      const sign = b.direction === 'in' ? '+' : '−';
                      return `${idx === 0 && sign === '+' ? '' : ` ${sign} `}${b.label}`;
                    })
                    .join('')}{' '}
                  = 0
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs space-y-1.5">
                <div className="text-slate-500">
                  2. Forma práctica equivalente (Σ i_entran = Σ i_salen):
                </div>
                <div className="text-slate-900 font-semibold">
                  {inLabels.length > 0 ? inLabels.join(' + ') : '0'} ={' '}
                  {outLabels.length > 0 ? outLabels.join(' + ') : '0'}
                </div>
                <div className="text-[#0284C7] font-semibold pt-1 border-t border-slate-200">
                  {sumIn.toFixed(1)} mA (Entran) = {sumOut.toFixed(1)} mA (Salen)
                </div>
              </div>
            </div>
          </div>

          {/* Sliders Control Deck */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-slate-900">
                  Control de Ramas Conectadas al Nodo
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  N = 5 ramas
                </span>
              </div>

              <div className="space-y-4">
                {computedBranches.map((b) => {
                  const isSolved = autoBalance && solveForId === b.id;
                  return (
                    <div
                      key={b.id}
                      className={`p-3 rounded-lg border transition-colors ${
                        isSolved
                          ? 'bg-sky-50/60 border-[#0284C7]'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="font-mono text-sm font-bold"
                            style={{ color: b.color }}
                          >
                            Rama {b.label}: {b.currentMa} mA
                          </span>
                          <button
                            onClick={() => toggleDirection(b.id)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors whitespace-nowrap shrink-0"
                            title="Invertir sentido de la flecha"
                          >
                            <ArrowRightLeft className="w-3 h-3" />
                            {b.direction === 'in' ? 'Entra (+)' : 'Sale (−)'}
                          </button>
                        </div>

                        {autoBalance && (
                          <button
                            onClick={() => setSolveForId(b.id)}
                            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                              isSolved
                                ? 'bg-[#0F172A] text-white'
                                : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                            }`}
                          >
                            {isSolved ? 'Incógnita activa' : 'Despejar esta'}
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min={0}
                          max={25}
                          step={0.5}
                          disabled={isSolved}
                          value={Math.max(0, Math.min(25, b.currentMa))}
                          onChange={(e) =>
                            handleCurrentChange(b.id, parseFloat(e.target.value))
                          }
                          aria-label={`Corriente ${b.label} en miliamperios`}
                          className="w-full accent-[#0284C7] disabled:opacity-40 cursor-pointer"
                        />
                        <span className="font-mono text-xs text-slate-500 w-16 text-right shrink-0">
                          {isSolved ? 'Calculada' : '0–25 mA'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-500">
              <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
              <span>
                En la Figura 18 original de la guía entran i₁, i₃, i₄ y salen i₂, i₅, cumpliendo i₁ + i₃ + i₄ = i₂ + i₅.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
