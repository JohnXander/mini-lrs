import { useState } from 'react';
import { Quiz } from './components/Quiz';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { createAttemptedStatement } from './utils/demoUtils';

export default function Demo() {
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const { currentUser, loading } = useSelector((state: RootState) => state.user);

  const startQuiz = async (quizNumber: number) => {
    try {
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

      setSelectedQuiz(quizNumber);
    } catch (error: unknown) {
      console.log(error);
    }
  };

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
      <div className="text-center mb-5">
        {[1, 2, 3].map((quizNumber) => (
          <button
            key={quizNumber}
            className='bg-slate-700 text-white rounded-lg py-3 px-6 uppercase hover:opacity-95 disabled:opacity-80 mr-3'
            onClick={() => startQuiz(quizNumber)}
            disabled={loading}
          >
            {loading ? 'Loading...' : `Quiz ${quizNumber}`}
          </button>
        ))}
      </div>
      {selectedQuiz && <Quiz quizNumber={selectedQuiz} />}
    </div>
  );
}
