import { CreateStatementProps } from "./demoUtils.types";

const generateRandomNumber = () => Math.floor(1000 + Math.random() * 9000);

export const createStatement = ({ currentUser, verb, quizNumber}: CreateStatementProps) => {
  const randomGuestNumber = generateRandomNumber();
  const guestName = `Guest${randomGuestNumber}`;
  const guestEmail = `guest${randomGuestNumber}@example.com`;

  return {
    "actor": {
      "mbox": `mailto:${currentUser?.email || guestEmail}`,
      "name": currentUser?.username || guestName,
    },
    "verb": {
      "id": `http://adlnet.gov/expapi/verbs/${verb}`,
      "display": {
        "en": verb
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
