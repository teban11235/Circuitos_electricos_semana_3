import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Eye, Award } from 'lucide-react';
import { QuizQuestion } from '../types/circuit';

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    type: 'boolean',
    question:
      '1. ¿La dirección de la corriente convencional es la misma que la dirección del movimiento de los electrones?',
    options: [
      { id: 'a', text: 'a. Verdadero.' },
      { id: 'b', text: 'b. Falso.' },
    ],
    correctOptionId: 'b',
    explanation:
      'Falso. Por convención histórica, la corriente convencional se define como el flujo de cargas positivas, es decir, en dirección opuesta al movimiento real de los electrones (cargas negativas).',
    guideReference: 'Autoevaluación 1 · Pregunta 1 (Pág. 20)',
  },
  {
    id: 2,
    type: 'boolean',
    question:
      '2. Un cortocircuito se modela idealmente como un elemento con resistencia (R = 0) y voltaje (v = 0) entre sus terminales.',
    options: [
      { id: 'a', text: 'a. Verdadero.' },
      { id: 'b', text: 'b. Falso.' },
    ],
    correctOptionId: 'a',
    explanation:
      'Verdadero. Como se revisa en la sección 1.12 (Caso extremo a, Pág. 15), un cortocircuito ideal tiene resistencia nula (R = 0 Ω) y caída de potencial cero (v = i·0 = 0 V), concentrando la corriente.',
    guideReference: 'Autoevaluación 1 · Pregunta 2 (Pág. 20)',
  },
  {
    id: 3,
    type: 'boolean',
    question:
      '3. Para medir la corriente que circula por un elemento, el amperímetro debe conectarse en paralelo con dicho elemento.',
    options: [
      { id: 'a', text: 'a. Verdadero.' },
      { id: 'b', text: 'b. Falso.' },
    ],
    correctOptionId: 'b',
    explanation:
      'Falso. El amperímetro mide la corriente que lo atraviesa, por lo que debe conectarse en SERIE con el elemento (los elementos en serie comparten la misma corriente). El voltímetro es el que se conecta en paralelo.',
    guideReference: 'Autoevaluación 1 · Pregunta 3 (Pág. 20)',
  },
  {
    id: 4,
    type: 'boolean',
    question:
      '4. La Ley de Corriente de Kirchhoff (LCK) se basa en el principio de conservación de la carga.',
    options: [
      { id: 'a', text: 'a. Verdadero.' },
      { id: 'b', text: 'b. Falso.' },
    ],
    correctOptionId: 'a',
    explanation:
      'Verdadero. Tal como indica la página 2 (Sección 1.8), la LCK establece que la suma algebraica de las corrientes en un nodo es cero porque la carga eléctrica no se acumula ni se destruye en el nodo.',
    guideReference: 'Autoevaluación 1 · Pregunta 4 (Pág. 20)',
  },
  {
    id: 5,
    type: 'multiple',
    question: '5. ¿Cuál es la definición matemática de la corriente eléctrica (i)?',
    options: [
      { id: 'a', text: 'a. La variación de carga respecto al tiempo (dq / dt).' },
      { id: 'b', text: 'b. La cantidad total de carga almacenada en un conductor (q).' },
      { id: 'c', text: 'c. El producto entre voltaje y resistencia (V · R).' },
      { id: 'd', text: 'd. La razón entre potencia y voltaje (P / V).' },
    ],
    correctOptionId: 'a',
    explanation:
      'La corriente eléctrica (i) se define formalmente como la tasa de cambio o variación de la carga eléctrica respecto al tiempo: i = dq / dt, medida en Amperios (C/s).',
    guideReference: 'Autoevaluación 1 · Pregunta 5 (Pág. 20)',
  },
  {
    id: 6,
    type: 'multiple',
    question:
      '6. Si la corriente entra por la terminal positiva de un elemento, según la convención pasiva de signos, ¿qué está haciendo el elemento?',
    options: [
      { id: 'a', text: 'a. Entregando potencia.' },
      { id: 'b', text: 'b. Absorbiendo potencia.' },
      { id: 'c', text: 'c. Generando tensión.' },
      { id: 'd', text: 'd. Comportándose como una batería ideal.' },
    ],
    correctOptionId: 'b',
    explanation:
      'Según la convención pasiva de signos, cuando la corriente entra por el terminal positivo (+) y sale por el negativo (−), se produce una caída de potencial y el elemento está absorbiendo (disipando) potencia.',
    guideReference: 'Autoevaluación 1 · Pregunta 6 (Pág. 21)',
  },
  {
    id: 7,
    type: 'multiple',
    question:
      '7. ¿Qué factor geométrico provocaría una disminución en la resistencia de un conductor?',
    options: [
      { id: 'a', text: 'a. Reducir la conductividad del material.' },
      { id: 'b', text: 'b. Incrementar su longitud (L).' },
      { id: 'c', text: 'c. Aumentar su área transversal (A).' },
      { id: 'd', text: 'd. Elevar la temperatura del conductor.' },
    ],
    correctOptionId: 'c',
    explanation:
      'Por la ley de Pouillet (R = ρ · L / A), la resistencia es inversamente proporcional al área transversal (A). Al aumentar el área transversal del conductor, disminuye su resistencia eléctrica.',
    guideReference: 'Autoevaluación 1 · Pregunta 7 (Pág. 21)',
  },
  {
    id: 8,
    type: 'multiple',
    question:
      '8. En un divisor de voltaje con dos resistencias en serie, ¿dónde cae la mayor tensión?',
    options: [
      { id: 'a', text: 'a. En la resistencia de menor valor.' },
      { id: 'b', text: 'b. En la resistencia de mayor valor.' },
      { id: 'c', text: 'c. Cae igual en ambas.' },
      { id: 'd', text: 'd. Depende de la corriente.' },
    ],
    correctOptionId: 'b',
    explanation:
      'Como destaca la página 12 de la guía (Ec. 3.4: Vₙ = V_s · Rₙ / R_eq), en un circuito en serie el voltaje es directamente proporcional a la resistencia: a mayor resistencia, mayor caída de tensión.',
    guideReference: 'Autoevaluación 1 · Pregunta 8 (Pág. 21)',
  },
  {
    id: 9,
    type: 'multiple',
    question:
      '9. ¿Cuáles de las siguientes fórmulas permiten calcular la potencia (p) disipada en un resistor?',
    options: [
      { id: 'a', text: 'a. (p = v · i), (p = i² · R) y (p = v² / R).' },
      { id: 'b', text: 'b. (p = v / R), (p = i / R) y (p = v² · i).' },
      { id: 'c', text: 'c. (p = v · i²), (p = R / v) y (p = i / v).' },
      { id: 'd', text: 'd. (p = R / i), (p = v / R²) y (p = i · R²).' },
    ],
    correctOptionId: 'a',
    explanation:
      'Combinando la expresión general de potencia eléctrica (p = v · i) con la Ley de Ohm (v = i · R), se obtienen las tres expresiones equivalentes para un resistor: p = v·i = i²·R = v²/R.',
    guideReference: 'Autoevaluación 1 · Pregunta 9 (Pág. 21)',
  },
  {
    id: 10,
    type: 'multiple',
    question:
      '10. Sobre la resistencia equivalente (R_eq) de resistores en paralelo, es correcto afirmar que:',
    options: [
      { id: 'a', text: 'a. Depende únicamente del voltaje aplicado.' },
      { id: 'b', text: 'b. Es igual a la suma de todas las resistencias del circuito.' },
      { id: 'c', text: 'c. Es siempre mayor que la resistencia más grande.' },
      {
        id: 'd',
        text: 'd. Es siempre menor que la resistencia más pequeña y se calcula mediante (1 / R_eq = Σ 1 / Rₙ).',
      },
    ],
    correctOptionId: 'd',
    explanation:
      'Tal como subraya en negrita la página 15 de la guía (Ec. 3.5), la resistencia equivalente de un conjunto de resistores en paralelo siempre es menor que la resistencia del resistor individual más pequeño.',
    guideReference: 'Autoevaluación 1 · Pregunta 10 (Pág. 22)',
  },
];

const SI_MATCH_ITEMS = [
  { id: 'q', label: 'a. Carga (q)', correctUnit: '3', unitName: '3. Coulomb (C)' },
  { id: 'p', label: 'b. Potencia (P)', correctUnit: '1', unitName: '1. Watt (W)' },
  { id: 'v', label: 'c. Tensión (V)', correctUnit: '4', unitName: '4. Volt (V)' },
  { id: 'r', label: 'd. Resistencia (R)', correctUnit: '2', unitName: '2. Ohm (Ω)' },
];

export const QuizModule: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [teacherRevealAll, setTeacherRevealAll] = useState<boolean>(false);
  const [siSelections, setSiSelections] = useState<Record<string, string>>({
    q: '',
    p: '',
    v: '',
    r: '',
  });

  const handleSelectOption = (qId: number, optId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optId }));
  };

  const handleSiChange = (itemId: string, unitId: string) => {
    setSiSelections((prev) => ({ ...prev, [itemId]: unitId }));
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setSiSelections({ q: '', p: '', v: '', r: '' });
    setTeacherRevealAll(false);
  };

  // Calculate total score out of 11
  const correct1to10 = QUIZ_QUESTIONS.filter(
    (q) => selectedAnswers[q.id] === q.correctOptionId
  ).length;
  const isQ11Complete = SI_MATCH_ITEMS.every((item) => siSelections[item.id] !== '');
  const isQ11Correct = SI_MATCH_ITEMS.every(
    (item) => siSelections[item.id] === item.correctUnit
  );
  const totalCorrect = correct1to10 + (isQ11Correct ? 1 : 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
            <span>Actividad 3 de la Guía Didáctica</span>
            <span aria-hidden="true">·</span>
            <span>Páginas 20 a 22</span>
            <span aria-hidden="true">·</span>
            <span>11 Preguntas Oficiales</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Autoevaluación 1: Validación de Conocimientos en Clase
          </h1>
          <p className="text-slate-600 mt-1 max-w-3xl text-base">
            Resuelve en vivo con los estudiantes las 11 preguntas de la guía o activa el modo docente para proyectar la explicación física de cada ítem.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 font-mono text-xs font-bold text-slate-900">
            <Award className="w-4 h-4 inline mr-1.5 text-[#0284C7]" />
            Aciertos: {totalCorrect} / 11
          </div>
          <button
            onClick={() => setTeacherRevealAll(!teacherRevealAll)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
              teacherRevealAll
                ? 'bg-[#0284C7] text-white border-[#0284C7]'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            {teacherRevealAll ? 'Ocultar Solucionario Docente' : 'Modo Docente: Revelar Solucionario'}
          </button>
          <button
            onClick={resetQuiz}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reiniciar
          </button>
        </div>
      </div>

      {/* Questions 1 to 10 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {QUIZ_QUESTIONS.map((q) => {
          const userAns = selectedAnswers[q.id];
          const showFeedback = Boolean(userAns) || teacherRevealAll;
          const isCorrect = userAns === q.correctOptionId;

          return (
            <div
              key={q.id}
              className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{q.guideReference}</span>
                  {userAns && (
                    <span
                      className={`font-mono font-semibold inline-flex items-center gap-1 ${
                        isCorrect ? 'text-emerald-700' : 'text-red-600'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correcto
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" /> Revisar concepto
                        </>
                      )}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-semibold text-slate-900 leading-snug">
                  {q.question}
                </h3>

                <div className="space-y-2 pt-1">
                  {q.options.map((opt) => {
                    const isSelected = userAns === opt.id;
                    const isRightOption = opt.id === q.correctOptionId;

                    let btnStyle =
                      'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';
                    if (showFeedback) {
                      if (isRightOption) {
                        btnStyle =
                          'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                      } else if (isSelected && !isRightOption) {
                        btnStyle = 'bg-red-50 border-red-400 text-red-900';
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(q.id, opt.id)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors flex items-center justify-between gap-3 ${btnStyle}`}
                      >
                        <span className="font-mono text-xs sm:text-sm">{opt.text}</span>
                        {showFeedback && isRightOption && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {showFeedback && isSelected && !isRightOption && (
                          <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {showFeedback && (
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Justificación Física: </strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Question 11: Interactive SI Unit Matching (Page 22) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs text-slate-500">
              Autoevaluación 1 · Pregunta 11 (Página 22)
            </span>
            <h3 className="text-lg font-semibold text-slate-900 mt-0.5">
              11. Empareje la magnitud eléctrica con su unidad en el Sistema Internacional (SI)
            </h3>
          </div>
          {(isQ11Complete || teacherRevealAll) && (
            <span
              className={`font-mono text-xs font-bold ${
                isQ11Correct || teacherRevealAll ? 'text-emerald-700' : 'text-amber-700'
              }`}
            >
              {isQ11Correct
                ? '✓ Las 4 magnitudes están correctamente emparejadas'
                : 'Selecciona la unidad correcta para cada magnitud'}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SI_MATCH_ITEMS.map((item) => {
            const currentVal = teacherRevealAll
              ? item.correctUnit
              : siSelections[item.id];
            const isItemCorrect = currentVal === item.correctUnit;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-lg border space-y-3 ${
                  currentVal
                    ? isItemCorrect
                      ? 'bg-emerald-50/50 border-emerald-400'
                      : 'bg-red-50/50 border-red-300'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="font-mono text-sm font-bold text-slate-900">
                  {item.label}
                </div>
                <select
                  value={currentVal}
                  onChange={(e) => handleSiChange(item.id, e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-[#0284C7]"
                >
                  <option value="">Seleccionar unidad SI...</option>
                  <option value="1">1. Watt (W)</option>
                  <option value="2">2. Ohm (Ω)</option>
                  <option value="3">3. Coulomb (C)</option>
                  <option value="4">4. Volt (V)</option>
                </select>
                {(currentVal || teacherRevealAll) && (
                  <div className="text-xs font-mono text-slate-600">
                    Correcta: <strong className="text-slate-900">{item.unitName}</strong>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
