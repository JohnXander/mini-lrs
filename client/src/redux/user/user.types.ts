interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  isLearner: boolean;
  createdAt: string;
  completedQuizzes: number;
}

export interface UserState {
  currentUser: {
    _id: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
    completedQuizzes: number;
  } | null;
  error: string | null;
  loading: boolean;
  allUsers: User[];
}
