import Modal from "react-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { LearnerModalProps } from "./LearnerModal.types";
import { format } from 'date-fns';

export const LearnerModal = ({ learner, onRequestClose }: LearnerModalProps) => {
  const formattedDate = format(new Date(learner.createdAt), 'MMMM d, yyyy');

  return (
    <Modal
      isOpen={true}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: "1000px",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          color: "#334155",
          backgroundColor: "rgb(241, 245, 241)",
        },
      }}
    >
      <div>
        <button onClick={onRequestClose} className="float-right">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="max-w-lg mx-auto border border-gray-100 p-3">
          <h1 className="text-3xl font-semibold text-center">
            {learner.username}
          </h1>
          <div className="flex flex-col gap-4">
            <img 
              src={learner.avatar} 
              className="rounded-full h-24 w-24 object-cover self-center my-6"
            />
          </div>
          <p className="text-center">
            <span className='text-slate-700'>
              {`Joined: `}
            </span>
            <span className='text-slate-700 font-bold'>
              {formattedDate}
            </span>
          </p>
        </div>
      </div>
    </Modal>
  )
};
