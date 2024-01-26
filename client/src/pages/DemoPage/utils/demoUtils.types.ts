export interface CreateStatementProps {
  currentUser: {
      _id: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
  } | null;
  verb: string;
  quizNumber: number;
}