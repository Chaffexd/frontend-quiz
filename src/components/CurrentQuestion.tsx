import { Question } from "../models/types";

type CurrentQuestionProps = {
  currentQuestion: number;
  totalQuestions: number;
  question: Question;
};

const CurrentQuestion = ({
  currentQuestion,
  totalQuestions,
  question
}: CurrentQuestionProps) => {
  // this calculates the width of the progress bar
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  return (
    <>
      <div className="w-1/2 lg:pl-24 lg:h-96 flex flex-col justify-between w-5/6 lg:pb-0 pb-12">
        <div className="mb-4">
          <h2 className="italic">
            Question {currentQuestion} of {totalQuestions}
          </h2>
          <p className="text-2xl">{question.question}</p>
        </div>
        <div className="rounded-lg bg-purple-300 h-2 -mb-4">
          <div
            className="bg-purple-600 h-full rounded-lg"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default CurrentQuestion;
