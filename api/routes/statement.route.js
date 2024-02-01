import express from 'express';
import { 
  getAllStatements, 
  receiveStatement, 
  deleteStatements,
  deleteAllUserStatements
} from '../controllers/statement.controller.js';

const router = express.Router();

router.post('/', receiveStatement);
router.get('/', getAllStatements);
router.delete('/', deleteStatements);
router.delete('/userStatements', deleteAllUserStatements);

export default router;
