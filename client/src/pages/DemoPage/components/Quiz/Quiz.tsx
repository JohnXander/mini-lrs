import { useState } from "react";
import { quizData } from "../../data/quizData";
import { QuizProps, QuizQuestion } from "./Quiz.types";
import { createStatement } from "../../utils/demoUtils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { updateUserFailure, updateUserStart, updateUserSuccess } from "../../../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export const Quiz = ({ quizNumber }: QuizProps) => {
  const questions = (quizData as Record<number, QuizQuestion[]>)[quizNumber];
  const [formData, setFormData] = useState({ 1: '', 2: '', 3: '' });
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { currentGuestUser } = useSelector((state: RootState) => state.guestUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isEmptyAnswers = Object.values(formData).some(answer => answer === '');

  const handleChange = (option: string, index: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [index + 1]: option,
    }));
  };

  const completeQuiz = async (e: React.FormEvent) => {
    e.preventDefault();

    const correctAnswers = questions.map((q) => q.correctAnswer);
    const submittedAnswers = Object.values(formData);
    const score = correctAnswers.filter((answer, index) => answer === submittedAnswers[index]).length;

    const completedStatement = createStatement({
      currentUser,
      currentGuestUser,
      verb: 'completed', 
      quizNumber,
      score,
    });

    const res = await fetch('/xAPI/statement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(completedStatement),
    });

    const data = await res.json();

    if (data.success === false) {
      return;
    }

    updateCompletedQuizzes();
    navigate('/');
  }

  const updateCompletedQuizzes = async () => {
    try {
      if (!currentUser) {
        throw new Error('User is not authenticated.');
      }

      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completedQuizzes: currentUser.completedQuizzes + 1 }),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));

        return;
      }

      dispatch(updateUserSuccess(data));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(updateUserFailure(error.message));
      } else {
        console.error('Unexpected error:', error);
      }
    }

  }

  if (!questions) {
    return <div>No quiz found for the specified number.</div>;
  }

  return (
    <div className="p-0 lg:p-3 max-w-lg mx-auto mb-7">
      <h1 className="text-2xl lg:text-4xl font-semibold text-center my-7">
        {`Quiz ${quizNumber}`}
      </h1>
      <form 
        className="flex flex-col items-start gap-8"
        onSubmit={completeQuiz}>
        {questions.map((q: QuizQuestion, index: number) => (
          <div
            className="flex flex-col"
            key={index}>
            <p className="text-md lg:text-2xl mb-3">{`${index + 1}. ${q.question}`}</p>
            <div className="flex flex-col">
              {q.options.map((option, i) => (
                <label className="text-sm lg:text-xl" key={i}>
                  <input
                    className="mr-2 h-4 w-4 cursor-pointer"
                    type="radio" 
                    name={`quiz${quizNumber}_question${index}`} 
                    value={option} 
                    onChange={() => handleChange(option, index)}
                  />
                  {` ${String.fromCharCode(97 + i)}. ${option}`}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          className="self-center w-fit bg-slate-700 text-white rounded-lg py-3 px-6 lg:px-12 uppercase hover:opacity-95 disabled:opacity-80 text-sm sm:text-base"
          type="submit"
          disabled={isEmptyAnswers}>
            Submit
          </button>
      </form>
    </div>
  );
};
