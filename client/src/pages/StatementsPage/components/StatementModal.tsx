import Modal from "react-modal";
import { Statement } from "../Statements.types";

interface StatementModalProps {
  statement: Statement;
  onRequestClose: () => void;
}

const StatementModal = ({ statement, onRequestClose }: StatementModalProps) => (
  <Modal
    isOpen={true} // You can manage the modal state using the 'isOpen' prop
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
        maxWidth: "600px",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      },
    }}
  >
    <div>
      <button onClick={onRequestClose} style={{ float: "right" }}>
        X
      </button>
      <pre>{JSON.stringify(statement, null, 2)}</pre>
    </div>
  </Modal>
);

export default StatementModal;
