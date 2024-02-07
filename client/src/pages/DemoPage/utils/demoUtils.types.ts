export interface CreateStatementProps {
  currentUser: {
      _id: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
    completedQuizzes: number;
  } | null;
  currentGuestUser: {
    username: string;
    email: string;
  } | null;
  verb: string;
  quizNumber: number;
  score: number;
}

export interface xapiStatement {
  actor: { mbox: string; name: string | undefined };
  verb: { id: string; display: { en: string } };
  object: { id: string; definition: { type: string; name: { en: string } } };
  result?: { score: { raw: number; min: number; max: number } };
}
