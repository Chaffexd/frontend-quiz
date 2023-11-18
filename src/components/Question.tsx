import { FC, useState } from "react";
import { Question, Quiz } from "../models/types";
import Header from "./Header";

type QuestionComponentProps = {
  activeCategory: string;
  quizzes: Quiz[];
  question: Question;
  onAnswer: (answer: string) => void;
  totalQuestions: number;
  currentQuestion: number;
};

const Questions: FC<QuestionComponentProps> = ({
  activeCategory,
  quizzes,
  question,
  onAnswer,
  totalQuestions,
  currentQuestion,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedAnswer(option);
  };

  console.log(selectedAnswer);
  console.log(quizzes);

  const handleNextClick = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer);
    } else {
      return;
      // there is no other alternative, so no error can happen
    }
  };

  return (
    <>
      <main className="h-screen w-screen bg-slate-100">
        <Header
          category={activeCategory}
          image={quizzes.find((q) => q.title === activeCategory)?.icon}
        />
        <section className="flex justify-center items-center gap-8">
          <div className="w-1/2 pl-24 h-96">
            <h2>
              Question {currentQuestion} of {totalQuestions}
            </h2>
            <p className="text-2xl">{question.question}</p>
          </div>
          <div className="flex flex-col w-1/2 h-96 pr-24">
            <ul>
              {question.options.map((option, index) => (
                <li
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  tabIndex={0}
                  className={`bg-white rounded-lg p-4 text-left mb-4 flex items-center font-bold cursor-pointer group border-4 border-white focus:outline-none ${
                    selectedAnswer === option
                      ? "active:border-purple-500 focus:border-purple-600"
                      : ""
                  }`}
                >
                  <span
                    className={`bg-slate-200 text-slate-700 rounded-lg mr-4 w-12 h-12 flex items-center justify-center group-hover:bg-purple-300 group-hover:text-purple-700 ${
                      selectedAnswer === option
                        ? "group-focus:bg-purple-600 group-focus:text-white"
                        : ""
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </li>
              ))}
            </ul>
            {currentQuestion < totalQuestions ? (
              <button
                onClick={handleNextClick}
                className="bg-purple-600 text-white text-center rounded-lg p-6 mb-4 font-bold hover:bg-purple-400"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={() => onAnswer(selectedAnswer as string)}
                className="bg-purple-600 text-white text-center rounded-lg p-6 mb-4 font-bold hover:bg-purple-400"
              >
                Finish Quiz
              </button>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Questions;
