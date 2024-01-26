import { useState } from 'react';
import { Quiz } from './components/Quiz';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function Demo() {
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const { currentUser, loading } = useSelector((state: RootState) => state.user);

  const generateRandomNumber = () => Math.floor(1000 + Math.random() * 9000);
  const guestName = `Guest${generateRandomNumber()}`;
  const guestEmail = `guest${generateRandomNumber()}@example.com`;

  const attemptedStatement = {
    "actor": {
      "mbox": `mailto:${currentUser?.email || guestEmail}`,
      "name": currentUser?.username || guestName,
    },
    "verb": {
      "id": "http://adlnet.gov/expapi/verbs/attempted",
      "display": {
        "en": "attempted"
      }
    },
    "object": {
      "id": "http://example.com/quiz/course-id",
      "definition": {
        "type": "http://adlnet.gov/expapi/activities/course",
        "name": {
          "en": "Quiz"
        }
      }
    }
  }

  const startQuiz = async (quizNumber: number) => {
    try {
      attemptedStatement.object.id = `http://example.com/quiz/quiz${quizNumber}`;
      attemptedStatement.object.definition.name.en = `Quiz ${quizNumber}`;

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
