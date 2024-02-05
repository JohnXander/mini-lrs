export interface QuizProps {
  quizNumber: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}
