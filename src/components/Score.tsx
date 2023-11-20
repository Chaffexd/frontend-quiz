import { Quiz } from "../models/types";

type Score = {
  correctAnswers: number;
  currentQuiz: Quiz | undefined;
  resetQuiz: () => void;
};

const Score = ({ correctAnswers, currentQuiz, resetQuiz }: Score) => {
  console.log(currentQuiz);
  return (
    <main className="h-screen w-screen flex flex-col lg:flex-row justify-center items-center bg-slate-100 lg:gap-8">
      <div className="md:w-1/2 lg:w-1/2 lg:pl-24 lg:h-96 px-4">
        <h2 className="text-7xl font-thin">Quiz completed</h2>
        <h3 className="text-7xl">You scored...</h3>
      </div>
      <div className="md:w-1/2 lg:w-1/2 lg:pr-24 lg:h-96 h-2/5 pt-8 w-full px-4">
        <div className="bg-white rounded-lg h-4/6 mb-4">
          <div className="flex items-center justify-center pt-8 pb-4">
            <img src={currentQuiz?.icon} alt={currentQuiz?.title} />
            <p>{currentQuiz?.title}</p>
          </div>
          <p className="flex flex-col justify-center items-center mb-6 text-center font-bold text-5xl">
            {correctAnswers} <br />{" "}
            <span className="font-thin text-base">
              out of {currentQuiz?.questions.length}
            </span>
          </p>
        </div>
        <button
          onClick={resetQuiz}
          className="bg-purple-600 text-white text-center rounded-lg p-6 mb-4 font-bold hover:bg-purple-400 w-full"
        >
          Play Again
        </button>
      </div>
    </main>
  );
};

export default Score;
