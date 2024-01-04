//enum import
import { Difficulty } from '../enums/enums';

export interface Question {
  type: string;
  difficulty: Difficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuestionState extends Question {
  answers: string[];
}

export interface AnswerObject {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

export interface StartQuizProps {
  handleToggleQuiz: React.MouseEventHandler;
  numberOfQustions: number;
  handleNumberQuestionChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleChooseDifficulty: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface QuestionCardProps {
  questionNumber: number;
  question: string;
  answers: string[];
  userAnswer?: {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
  };
  callback: (selectedAnswer: string) => void;
  submitted: boolean;
  correctAnswer: string;
}
