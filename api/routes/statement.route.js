import express from 'express';
import { 
  getAllStatements, 
  receiveStatement, 
  deleteStatements 
} from '../controllers/statement.controller.js';

const router = express.Router();

router.post('/', receiveStatement);
router.get('/', getAllStatements);
router.delete('/', deleteStatements);

export default router;
