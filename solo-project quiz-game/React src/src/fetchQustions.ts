//enum import
import { Difficulty } from './enums/enums';

//interface import
import { Question, QuestionState } from './interfaces/interfaces';

//utility function import
import { shuffleArray } from './utils/utils';

export const fetchQuizQuestions = async (
  numberOfQuestions: number,
  difficulty: Difficulty
): Promise<QuestionState[]> => {
  const url = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=9&difficulty=${difficulty}&type=multiple`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error Fetching Data');
    }
    const data = await response.json();
    return data.results.map((question: Question) => {
      return {
        ...question,
        answers: shuffleArray([
          ...question.incorrect_answers,
          question.correct_answer,
        ]),
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};
