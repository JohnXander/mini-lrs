import Statement from '../models/statement.model.js';
import { errorHandler } from '../utils/error.js';
import { validateStatement } from '../utils/validateStatement.js';

export const receiveStatement = async (req, res, next) => {
  try {
    const statement = req.body;

    if (!validateStatement(statement)) {
      return next(errorHandler(400, 'Invalid xAPI statement format.'));
    }

    const savedStatement = await Statement.create(statement);

    res.status(201).json(savedStatement);
  } catch (error) {
    next(error);
  }
};
