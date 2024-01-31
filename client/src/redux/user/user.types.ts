interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  isLearner: boolean;
  createdAt: string;
}

export interface UserState {
  currentUser: User | null;
  error: string | null;
  loading: boolean;
  allUsers: User[];
}
