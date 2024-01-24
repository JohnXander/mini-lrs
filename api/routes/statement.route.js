import express from 'express';
import { getAllStatements, receiveStatement } from '../controllers/statement.controller.js';

const router = express.Router();

router.post('/', receiveStatement);
router.get('/', getAllStatements);

export default router;
