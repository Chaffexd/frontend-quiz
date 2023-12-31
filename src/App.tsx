import { useState } from "react";
import { Question, QuizData, Quiz } from "./models/types";
import quizData from "../data.json";

import "./App.css";
import Categories from "./components/Categories";
import QuestionComponent from "./components/Question";
import Score from "./components/Score";

function App() {
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  const { quizzes }: QuizData = quizData;

  const categorySelectionHandler = (category: string) => {
    setActiveCategory(category);
    setActiveQuestion(0);
    setUserAnswers({});
    setCorrectAnswers(0);
  };

  const questionAnswerHandler = (answer: string) => {
    // Update userAnswers state with the selected answer for the current question
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [activeQuestion]: answer,
    }));

    // Check if the selected answer is correct and update the correctAnswers state
    const currentQuestion: Question | undefined = quizzes.find(
      (quiz) => quiz.title === activeCategory
    )?.questions[activeQuestion];
    if (currentQuestion && answer === currentQuestion.answer) {
      setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
    }

    // Move to the next question by updating state properly
    setActiveQuestion((prevQuestion) => prevQuestion + 1);
  };

  const resetQuiz = () => {
    setActiveCategory(null);
    setActiveQuestion(0);
    setUserAnswers({});
  };

  if (!activeCategory) {
    return <Categories quizzes={quizzes} onClick={categorySelectionHandler} />;
  }

  const currentQuiz: Quiz | undefined = quizzes.find(
    (quiz) => quiz.title === activeCategory
  );

  if (!currentQuiz) {
    return <p>Something went wrong, category not found.</p>;
  }

  const currentQuestion: Question | undefined =
    currentQuiz.questions[activeQuestion];

  if (!currentQuestion) {
    return (
      <Score
        correctAnswers={correctAnswers}
        currentQuiz={currentQuiz}
        resetQuiz={resetQuiz}
      />
    );
  }

  // this is to track the scores and the quiz info
  console.log(`The selected category is: ${activeCategory}`);
  console.log(`The selected answer is: ${JSON.stringify(userAnswers)}`);
  console.log(`Score: ${correctAnswers} / ${currentQuiz?.questions.length}`);

  return (
    <>
      <QuestionComponent
        quizzes={quizzes}
        activeCategory={activeCategory}
        question={currentQuestion}
        onAnswer={questionAnswerHandler}
        totalQuestions={currentQuiz.questions.length}
        currentQuestion={activeQuestion + 1}
      />
    </>
  );
}

export default App;
