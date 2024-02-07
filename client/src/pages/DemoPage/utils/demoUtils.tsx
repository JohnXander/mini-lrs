import { CreateStatementProps, xapiStatement } from "./demoUtils.types";

export const createStatement = ({ 
  currentUser, 
  currentGuestUser,
  verb, 
  quizNumber,
  score
}: CreateStatementProps) => {
  const username = currentUser?.username || currentGuestUser?.username;
  const email = currentUser?.email || currentGuestUser?.email;

  const statement = {
    "actor": {
      "mbox": `mailto:${email}`,
      "name": username,
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
  } as xapiStatement;

  if (score !== undefined && score !== null) {
    statement.result = {
      "score": {
        "raw": score,
        "min": 0,
        "max": 3
      }
    };
  }

  return statement;
};
