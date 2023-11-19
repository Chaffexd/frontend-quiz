import { useState, useEffect } from "react";
import { Question, Quiz } from "../models/types";
import Header from "./Header";
import CurrentQuestion from "./CurrentQuestion";

type QuestionComponentProps = {
  activeCategory: string;
  quizzes: Quiz[];
  question: Question;
  onAnswer: (answer: string) => void;
  totalQuestions: number;
  currentQuestion: number;
};

const Questions = ({
  activeCategory,
  quizzes,
  question,
  onAnswer,
  totalQuestions,
  currentQuestion,
}: QuestionComponentProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedAnswer(option);
    setSubmitted(false); // Reset submitted state when a new option is selected
  };

  const handleNextClick = () => {
    if (selectedAnswer) {
      // Check if the selected answer is correct
      const isCorrect = selectedAnswer === question.answer;
      setCorrectAnswer(isCorrect ? selectedAnswer : question.answer);
      setSubmitted(true);
    } else {
      return;
      // there is no other alternative, so no error can happen
    }
  };

  const handleMoveToNextQuestion = () => {
    // Call the onAnswer callback with the selected answer
    onAnswer(selectedAnswer as string);

    // Reset states and move to the next question
    setSelectedAnswer(null);
    setSubmitted(false);
    setCorrectAnswer(null);
  };

  // Use useEffect to handle moving to the next question
  useEffect(() => {
    if (submitted && correctAnswer !== null) {
      // Show user feedback before moving to next question based on condition above
      const timeoutId = setTimeout(() => {
        handleMoveToNextQuestion();
      }, 5000);

      // Always clean up the timer
      return () => clearTimeout(timeoutId);
    }
  }, [submitted, correctAnswer]);

  

  return (
    <>
      <main className="h-screen w-screen bg-slate-100">
        <Header
          category={activeCategory}
          image={quizzes.find((q) => q.title === activeCategory)?.icon}
        />
        <section className="flex flex-col lg:flex-row lg:justify-center items-center lg:gap-8">
          <CurrentQuestion 
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
            question={question}
          />
          <div className="flex flex-col w-1/2 w-5/6 lg:h-96 lg:pr-24">
            <ul>
              {question.options.map((option, index) => (
                <li
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  tabIndex={0}
                  className={`bg-white rounded-lg p-4 text-left mb-4 flex items-center justify-between font-bold cursor-pointer group border-4 border-white focus:outline-none ${
                    selectedAnswer === option
                      ? `active:border-purple-500 focus:border-purple-600`
                      : ""
                  } ${
                    submitted && option === correctAnswer
                      ? "!border-green-500" // Correct answer
                      : submitted && option === selectedAnswer
                      ? "!border-red-500" // Incorrect answer
                      : ""
                  }`}
                >
                  <div className="flex items-center">
                    <span
                      className={`bg-slate-200 text-slate-700 rounded-lg mr-4 w-12 h-12 flex items-center justify-center group-hover:bg-purple-300 group-hover:text-purple-700 ${
                        selectedAnswer === option
                          ? "group-focus:bg-purple-600 group-focus:text-white"
                          : ""
                      }
                      ${
                        submitted && option === correctAnswer
                          ? "!bg-green-500 !text-white"
                          : submitted && option === selectedAnswer
                          ? "!bg-red-500 text-white"
                          : ""
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <p>{option}</p>
                  </div>
                  <span>
                    <img
                      src={
                        submitted && option === correctAnswer
                          ? "/images/icon-correct.svg"
                          : submitted && option === selectedAnswer
                          ? "/images/icon-incorrect.svg"
                          : ""
                      }
                    />
                  </span>
                </li>
              ))}
            </ul>
            {!submitted ? (
              <button
                onClick={handleNextClick}
                className="bg-purple-600 text-white text-center rounded-lg p-6 mb-4 font-bold hover:bg-purple-400"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleMoveToNextQuestion}
                className="bg-purple-600 text-white text-center rounded-lg p-6 mb-4 font-bold hover:bg-purple-400"
              >
                Next Question
              </button>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Questions;
