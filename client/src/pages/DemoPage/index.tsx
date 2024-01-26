import { useState } from 'react';
import { Quiz } from './components/Quiz';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { createAttemptedStatement } from './utils/demoUtils';
import { Link } from 'react-router-dom';

export default function Demo() {
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [signInPrompt, setSignInPrompt] = useState<boolean>(false);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const { currentUser, loading } = useSelector((state: RootState) => state.user);

  const startQuiz = async (quizNumber: number | null) => {
    try {
      if (!quizNumber) {
        return;
      }

      const attemptedStatement = createAttemptedStatement(currentUser, quizNumber)

      const res = await fetch('/xAPI/statement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attemptedStatement),
      });

      const data = await res.json();

      if (data.success === false) {
        return;
      }

      setQuizStarted(true);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const handleQuizStart = (quizNumber: number) => {
    if (!currentUser){
      setSignInPrompt(true);
      setSelectedQuiz(quizNumber)

      return;
    }

    startQuiz(quizNumber);
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Demo
      </h1>
      <div className="text-center mb-5">
        <p>These are short quizzes to show how an LMS interacts with an LRS.</p>
        <p>There will only be 3 multiple-choice questions per quiz.</p>
        <p>Select a quiz to start:</p>
      </div>
      <div className="text-center mb-5 flex gap-3 flex-wrap justify-center">
        {[1, 2, 3].map((quizNumber) => (
          <button
            key={quizNumber}
            className='bg-slate-700 text-white rounded-lg py-3 px-6 uppercase hover:opacity-95 disabled:opacity-80'
            onClick={() => handleQuizStart(quizNumber)}
            disabled={loading}
          >
            {loading ? 'Loading...' : `Quiz ${quizNumber}`}
          </button>
        ))}
      </div>
      {signInPrompt && (
        <p className='text-center'>
          <span>
            <Link to="/sign-in" className="text-blue-700 hover:underline">
              Sign In
            </Link>
            <span> or </span>
            <span
              onClick={() => startQuiz(selectedQuiz)}
              className="text-green-700 cursor-pointer hover:underline"
            >
              Continue as Guest
            </span>
          </span>
        </p>
      )}
      {quizStarted && <Quiz quizNumber={selectedQuiz} />}
    </div>
  );
}
