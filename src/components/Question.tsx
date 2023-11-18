import { FC, useState } from 'react';
import { Question } from '../models/types';

type QuestionComponentProps = {
  question: Question;
  onAnswer: (answer: string) => void;
  totalQuestions: number;
  currentQuestion: number;
};

const Questions: FC<QuestionComponentProps> = ({
  question,
  onAnswer,
  totalQuestions,
  currentQuestion,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleNextClick = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer);
    } else {
      return;
      // there is no other alternative, so no error can happen
    }
  };

  return (
    <div>
      <h2>{question.question}</h2>
      <ul>
        {question.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionClick(option)}
            style={{ cursor: 'pointer', backgroundColor: selectedAnswer === option ? 'lightblue' : 'white' }}
          >
            {option}
          </li>
        ))}
      </ul>
      <p>
        Question {currentQuestion} of {totalQuestions}
      </p>
      {currentQuestion < totalQuestions ? (
        <button onClick={handleNextClick}>Next Question</button>
      ) : (
        <button onClick={() => onAnswer(selectedAnswer as string)}>Finish Quiz</button>
      )}
    </div>
  );
};

export default Questions;
