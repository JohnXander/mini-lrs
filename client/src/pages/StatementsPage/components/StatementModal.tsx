import Modal from "react-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { StatementModalProps } from "./StatementModal.types";

export const StatementModal = ({ statement, onRequestClose }: StatementModalProps) => (
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
        height: "60%",
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
      <pre>{JSON.stringify(statement, null, 2)}</pre>
    </div>
  </Modal>
);
