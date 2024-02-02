import { quizData } from "../data/quizData";

interface QuizProps {
  quizNumber: number;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export const Quiz = ({ quizNumber }: QuizProps) => {
  const questions = (quizData as Record<number, QuizQuestion[]>)[quizNumber];

  if (!questions) {
    return <div>No quiz found for the specified number.</div>;
  }

  return (
    <div>
      <h2>{`Quiz ${quizNumber}`}</h2>
      <form>
        {questions.map((q: QuizQuestion, index: number) => (
          <div key={index}>
            <p>{`${index + 1}. ${q.question}`}</p>
            <div>
              {q.options.map((option, i) => (
                <label key={i}>
                  <input type="radio" name={`quiz${quizNumber}_question${index}`} value={option} />
                  {` ${String.fromCharCode(97 + i)}. ${option}`}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
