//libraries
import React, { useState } from 'react';
import { decode } from 'html-entities';

//interfaces
import { QuestionCardProps } from '../interfaces/interfaces';

const QuestionCard: React.FC<QuestionCardProps> = (props) => {
  //state variables
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(
    props.userAnswer?.answer || null
  );

  //event methods
  const handleRadioButtonChange = (index: number) => {
    setSelectedAnswer(props.answers[index]);
    props.callback(props.answers[index]);
  };

  //render method
  return (
    <div>
      <h2>
        {props.questionNumber}. {decode(props.question)}
      </h2>
      <ul className="answer-list">
        {props.answers.map((answer, index) => (
          <li key={answer}>
            <label
              htmlFor={answer}
              className={`
              answer-list-item 
              ${selectedAnswer === answer && 'selected'} ${
                props.correctAnswer === answer && props.submitted && 'correct'
              } ${
                props.correctAnswer !== answer &&
                props.submitted &&
                selectedAnswer === answer &&
                'incorrect'
              } `}
            >
              <input
                id={answer}
                type="radio"
                name={`question-${props.questionNumber}`}
                value={answer}
                checked={selectedAnswer === answer}
                onChange={() => handleRadioButtonChange(index)}
                disabled={props.submitted}
              />
              {decode(answer)}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
