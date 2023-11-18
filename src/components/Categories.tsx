import { Quiz } from "../models/types";
import CategoryItem from "./CategoryItem";

type CategoryProps = {
  quizzes: Quiz[];
  onClick: (category: string) => void;
};

const Categories = ({ quizzes, onClick }: CategoryProps) => {
  return (
    <main className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="w-1/2 pl-24 h-96">
        <h1 className="text-6xl font-thin mb-8">
          Welcome to the <br /> <span className="font-bold">Frontend Quiz!</span>
        </h1>
        <p>Pick a subject to get started.</p>
      </div>
      <div className="flex flex-col w-1/2 h-96 pr-24">
        {quizzes.map((quiz) => (
          <CategoryItem
            key={quiz.title}
            title={quiz.title}
            image={quiz.icon}
            onClick={() => onClick(quiz.title)}
          />
        ))}
      </div>
    </main>
  );
};

export default Categories;
