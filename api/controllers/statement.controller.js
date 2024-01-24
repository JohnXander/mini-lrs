import Statement from '../models/statement.model.js';
import { errorHandler } from '../utils/error.js';
import { validateStatement } from '../utils/validateStatement.js';

export const receiveStatement = async (req, res, next) => {
  try {
    const statement = req.body;

    if (!validateStatement(statement)) {
      return next(errorHandler(400, 'Invalid xAPI statement format!'));
    }

    const savedStatement = await Statement.create(statement);

    res.status(201).json(savedStatement);
  } catch (error) {
    next(error);
  }
};

export const getAllStatements = async (req, res, next) => {
  try {
    const allStatements = await Statement.find();

    if(allStatements.length === 0){
      return next(errorHandler(404, 'No statements found in the database!'));
    }

    res.status(200).json(allStatements);
  } catch (error) {
    next(error);
  }
}