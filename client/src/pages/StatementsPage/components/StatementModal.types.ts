import { Statement } from "../Statements.types";

export interface StatementModalProps {
  statement: Statement;
  onRequestClose: () => void;
}
