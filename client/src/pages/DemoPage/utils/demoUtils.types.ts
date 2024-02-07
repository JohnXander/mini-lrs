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
}