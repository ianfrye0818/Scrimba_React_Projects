import React, { useState } from 'react';
import { fetchQuizQuestions } from '../fetchQustions';
import { FidgetSpinner } from 'react-loader-spinner';
import QuestionCard from '../components/QuestionCard';
import StartQuiz from './StartQuiz';
import { Difficulty } from '../enums/enums';
import { QuestionState, AnswerObject } from '../interfaces/interfaces';

const Quiz: React.FC = () => {
  //state variables
  const [numberOfQustions, setNumberOfQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState(Difficulty.EASY);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  //event methods

  //method to set the number of questions based on the users selection on the StartQuiz page
  function handleNumberQuestionChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setNumberOfQuestions(parseInt(event.target.value));
  }

  //method to set the difficulty based on the users selction on teh StartQuiz page
  function handleChooseDifficulty(event: React.ChangeEvent<HTMLSelectElement>) {
    setDifficulty(event.target.value as Difficulty);
  }

  //method to set the quiz either started or not started
  function handleToggleQuiz() {
    if (gameOver) {
      handleStartGame();
    } else {
      setGameOver(true);
    }
  }

  //method that will fire when then quiz is set to started
  //this will reset all state variables and gather quiz data from the API
  //It will also handle any errors that might exist and throw them.
  async function handleStartGame() {
    setLoading(true);
    try {
      const questionData = await fetchQuizQuestions(
        numberOfQustions,
        difficulty
      );
      setSubmitted(false);
      setQuestions(questionData);
      setGameOver(false);
      setScore(0);
      setUserAnswers([]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }

  //method for handling the submit answers button event.
  //it will flip the setSubmitted variable to true which will trigger the QuestionCardComponent to flip the background
  //based on the correct/incorrect answers
  function handleSubmitAnswers() {
    setSubmitted(true);
  }

  //method for checking the users answers
  //everytime a user makes a selection it will add their answer to the userAnswers state variable
  //it will also store the question and the correct answer so that it can check if the user was correct
  //also handles updating the users answer if they go back and change it.
  function checkAnswer(index: number, selectedAnswer: string) {
    if (!gameOver && !submitted) {
      const correct = selectedAnswer === questions[index].correct_answer;
      if (correct) {
        setScore((prev) => prev + 1);
      }

      const answerObj: AnswerObject = {
        question: questions[index].question,
        answer: selectedAnswer,
        correct,
        correctAnswer: questions[index].correct_answer,
      };

      setUserAnswers((prev) => {
        const updatedAnswers = [...prev];
        updatedAnswers[index] = answerObj;
        return updatedAnswers;
      });
    }
  }

  //render method
  return (
    <div>
      {/* start quiz component */}
      {gameOver && !loading && (
        <StartQuiz
          handleToggleQuiz={handleToggleQuiz}
          numberOfQustions={numberOfQustions}
          handleNumberQuestionChange={handleNumberQuestionChange}
          handleChooseDifficulty={handleChooseDifficulty}
        />
      )}
      {/* //loading fidget spinner component */}
      {loading && (
        <FidgetSpinner
          height={80}
          width={80}
          backgroundColor='green'
          ariaLabel='three dots loading'
        />
      )}
      {/* Question Card for each Question */}
      {!gameOver && questions.length > 0 && (
        <div className='quiz-page'>
          {questions.map((question, index) => (
            <QuestionCard
              key={question.question}
              questionNumber={index + 1}
              question={question.question}
              answers={question.answers}
              userAnswer={userAnswers ? userAnswers[index] : undefined}
              callback={(selectedAnswer) => checkAnswer(index, selectedAnswer)}
              submitted={submitted}
              correctAnswer={question.correct_answer}
            />
          ))}
          {/* Submit button if the game is not over - disabled until user answers all quetsions */}
          {!submitted && (
            <button
              disabled={userAnswers.length < numberOfQustions}
              className='submit-btn'
              onClick={handleSubmitAnswers}
            >
              Submit Answers
            </button>
          )}
        </div>
      )}
      {/* Score / Play again button - only displays when user has submitted */}
      {/* Could be moved to a seperate component */}
      {submitted && !gameOver && (
        <p className='score'>
          <span>
            You scored: <span style={{ color: 'green' }}>{score}</span> /{' '}
            {numberOfQustions} correct answers
          </span>
          <button onClick={handleToggleQuiz}>Play Again?</button>
        </p>
      )}
    </div>
  );
};

export default Quiz;
