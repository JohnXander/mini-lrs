import { useState } from 'react';
import { Quiz } from './components/Quiz';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function Demo() {
  const [quizStarted, setQuizStarted] = useState(false);
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

  const startQuiz = async () => {
    try {
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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Demo
      </h1>
      {!quizStarted ? (
        <div className="text-center">
          <p className="mb-5">
            This is a short quiz to show how an LMS interacts with an LRS.
            There will only be 3 multiple-choice questions.
          </p>
          <button
            className="bg-slate-700 text-white rounded-lg py-3 px-6 uppercase hover:opacity-95 disabled:opacity-80"
            onClick={startQuiz}
            disabled={loading}>
            { loading ? 'Loading...' : 'Start Quiz' }
          </button>
        </div>
      ) : (
        <Quiz />
      )}
    </div>
  );
}
