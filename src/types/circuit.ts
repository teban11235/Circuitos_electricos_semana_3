export type ModuleId = 'lck' | 'lvk' | 'dividers' | 'examples' | 'quiz';

export interface LckBranch {
  id: string;
  label: string;
  angleDeg: number;
  direction: 'in' | 'out';
  currentMa: number;
  color: string;
}

export interface QuizQuestion {
  id: number;
  type: 'boolean' | 'multiple';
  question: string;
  formulaHint?: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
  guideReference: string;
}
