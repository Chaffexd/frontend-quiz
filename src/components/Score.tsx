import { Quiz } from "../models/types";

type Score = {
    correctAnswers: number;
    currentQuiz: Quiz | undefined;
    resetQuiz: () => void;
}

const Score = ({ correctAnswers, currentQuiz, resetQuiz }: Score) => {
  return (
    <div>
        <div>
          <h2>Quiz completed</h2>
          <h3>You scored...</h3>
        </div>
        <div>
          <p>{correctAnswers} <br /> out of {currentQuiz?.questions.length}</p>
          <button onClick={resetQuiz}>Play Again</button>
        </div>
      </div>
  )
}

export default Score