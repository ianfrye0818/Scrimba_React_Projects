//enums
import { Difficulty } from '../enums/enums';
//interfaces
import { StartQuizProps } from '../interfaces/interfaces';

const StartQuiz = ({
  handleToggleQuiz,
  handleNumberQuestionChange,
  handleChooseDifficulty,
  numberOfQustions,
}: StartQuizProps) => {
  //start render method
  return (
    <div className='start-quiz-page'>
      <h1>Quizzical</h1>
      <p className='subCaption'>A game to test your General Knowledge</p>
      <div className='selectOptions'>
        <p className='pickOptionsCaption'>
          Pick a difficulty level and set your number of questions
        </p>
        <p className='selectOptions--options'>
          <select onChange={handleChooseDifficulty}>
            <option value={Difficulty.EASY}>Easy</option>
            <option value={Difficulty.MEDIUM}>Medium</option>
            <option value={Difficulty.HARD}>Hard</option>
          </select>
          <input
            type='number'
            value={numberOfQustions}
            onChange={(e) => handleNumberQuestionChange(e)}
          />
        </p>
      </div>
      <button className='submit-btn' onClick={handleToggleQuiz}>
        Start Quiz
      </button>
    </div>
  );
};

export default StartQuiz;
