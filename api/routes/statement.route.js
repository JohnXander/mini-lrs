import express from 'express';
import { receiveStatement } from '../controllers/statement.controller.js';

const router = express.Router();

router.post('/', receiveStatement);

export default router;
