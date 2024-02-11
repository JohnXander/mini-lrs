import Modal from "react-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { LearnerModalProps } from "./LearnerModal.types";
import { format } from 'date-fns';
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export const LearnerModal = ({ learner, onRequestClose }: LearnerModalProps) => {
  const formattedDate = format(new Date(learner.createdAt), 'MMMM d, yyyy');
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <Modal
      isOpen={true}
      onRequestClose={onRequestClose}
      className='w-max sm:w-4/12'
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "1000px",
          height: "40%",
          padding: "20px 40px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          color: "#334155",
          backgroundColor: "rgb(241, 245, 241)",
        },
      }}
    >
      <div className="flex flex-col h-full relative">
        <button onClick={onRequestClose} className="absolute top-0 right-0">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="flex-grow flex items-center justify-center">
          <div>
            <h1 className="text-xl lg:text-3xl font-semibold text-center">
              <span>{learner.username} </span>
              <span>{currentUser?._id === learner._id && '(you)'}</span>
            </h1>
            <div className="flex flex-col gap-4">
              <img 
                src={learner.avatar} 
                className="rounded-full h-24 w-24 object-cover self-center my-6"
              />
            </div>
            <p className="text-center text-sm lg:text-base">
              <span className='text-slate-700'>
                {`Joined: `}
              </span>
              <span className='text-slate-700 font-bold'>
                {formattedDate}
              </span>
            </p>
            <p className="text-center text-sm lg:text-base">
              <span className='text-slate-700'>
                {`Completed Quizzes: `}
              </span>
              <span className='text-slate-700 font-bold'>
                {learner.completedQuizzes}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  )
};
