export interface GuestUserState {
  currentGuestUser: {
    username: string;
    email: string;
  } | null;
  error: string | null;
  loading: boolean;
}
