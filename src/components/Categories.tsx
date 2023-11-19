import { Quiz } from "../models/types";
import CategoryItem from "./CategoryItem";

type CategoryProps = {
  quizzes: Quiz[];
  onClick: (category: string) => void;
};

const Categories = ({ quizzes, onClick }: CategoryProps) => {
  return (
    <main className="h-screen w-screen flex lg:flex-row lg:justify-center lg:items-center flex-col justify-center items-center bg-slate-100">
      <div className="md:w-1/2 lg:w-1/2 px-4 lg:pl-24 lg:h-96 pb-12">
        <h1 className="text-6xl font-thin mb-8">
          Welcome to the <br /> <span className="font-bold">Frontend Quiz!</span>
        </h1>
        <p>Pick a subject to get started.</p>
      </div>
      <div className="flex flex-col md:w-1/2 lg:w-1/2 px-4 w-full lg:h-96 lg:pr-24">
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
