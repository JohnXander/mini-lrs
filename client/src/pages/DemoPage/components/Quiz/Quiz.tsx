import { quizData } from "../../data/quizData";
import { QuizProps, QuizQuestion } from "./Quiz.types";

export const Quiz = ({ quizNumber }: QuizProps) => {
  const questions = (quizData as Record<number, QuizQuestion[]>)[quizNumber];

  if (!questions) {
    return <div>No quiz found for the specified number.</div>;
  }

  return (
    <div className="p-3 max-w-lg mx-auto mb-7">
      <h1 className="text-4xl font-semibold text-center my-7">
        {`Quiz ${quizNumber}`}
      </h1>
      <form className="flex flex-col items-start gap-8">
        {questions.map((q: QuizQuestion, index: number) => (
          <div
            className="flex flex-col"
            key={index}>
            <p className="text-2xl mb-3">{`${index + 1}. ${q.question}`}</p>
            <div className="flex flex-col">
              {q.options.map((option, i) => (
                <label className="text-xl" key={i}>
                  <input
                    className="mr-2 h-4 w-4 cursor-pointer"
                    type="radio" 
                    name={`quiz${quizNumber}_question${index}`} 
                    value={option} 
                  />
                  {` ${String.fromCharCode(97 + i)}. ${option}`}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          className="self-center w-full bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
          type="submit">
            Submit
          </button>
      </form>
    </div>
  );
};
