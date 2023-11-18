import { Quiz } from "../models/types";

type Score = {
  correctAnswers: number;
  currentQuiz: Quiz | undefined;
  resetQuiz: () => void;
};

const Score = ({ correctAnswers, currentQuiz, resetQuiz }: Score) => {
  return (
    <main className="h-screen w-screen flex justify-center items-center bg-slate-100 gap-8">
      <div className="w-1/2 pl-24 h-96">
        <h2 className="text-7xl font-thin">Quiz completed</h2>
        <h3 className="text-7xl">You scored...</h3>
      </div>
      <div className="w-1/2 pr-24 h-96">
        <p className="bg-white flex flex-col justify-center items-center rounded-lg h-4/6 mb-6 text-center font-bold text-5xl">
          {correctAnswers} <br /> <span className="font-thin text-base">out of {currentQuiz?.questions.length}</span>
        </p>
        <button onClick={resetQuiz} className="bg-purple-600 text-white text-center rounded-lg p-6 mb-4 font-bold hover:bg-purple-400 w-full">Play Again</button>
      </div>
    </main>
  );
};

export default Score;
