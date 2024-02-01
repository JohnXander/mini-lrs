import { User } from "../Learners.types";

export interface LearnerModalProps {
  learner: User;
  onRequestClose: () => void;
}
