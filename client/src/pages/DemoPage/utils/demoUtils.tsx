const generateRandomNumber = () => Math.floor(1000 + Math.random() * 9000);

interface CurrentUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
}

export const createAttemptedStatement = (currentUser: CurrentUser | null, quizNumber: number) => {
  const randomGuestNumber = generateRandomNumber();
  const guestName = `Guest${randomGuestNumber}`;
  const guestEmail = `guest${randomGuestNumber}@example.com`;

  return {
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
      "id": `http://example.com/quiz/quiz${quizNumber}`,
      "definition": {
        "type": "http://adlnet.gov/expapi/activities/course",
        "name": {
          "en": `Quiz ${quizNumber}`
        }
      }
    }
  };
};
