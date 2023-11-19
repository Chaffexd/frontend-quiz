import { useState, useEffect } from "react";
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
      }, 2000);

      // Always clean up the timer
      return () => clearTimeout(timeoutId);
    }
  }, [submitted, correctAnswer]);

  // this calculates the width of the progress bar
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <>
      <main className="h-screen w-screen bg-slate-100">
        <Header
          category={activeCategory}
          image={quizzes.find((q) => q.title === activeCategory)?.icon}
        />
        <section className="flex justify-center items-center gap-8">
          <div className="w-1/2 pl-24 h-96 flex flex-col justify-between">
            <div className="">
              <h2 className="italic">
                Question {currentQuestion} of {totalQuestions}
              </h2>
              <p className="text-2xl">{question.question}</p>
            </div>
            <div className="rounded-lg bg-purple-300 h-2">
              <div
                className="bg-purple-600 h-full rounded-lg"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
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
                      ? `active:border-purple-500 focus:border-purple-600`
                      : ""
                  } ${
                    submitted && option === correctAnswer
                      ? "bg-green-200" // Correct answer
                      : submitted && option === selectedAnswer
                      ? "bg-red-200" // Incorrect answer
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
