import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
  res.json({
    message: 'Hello world!'
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id){
    return next(errorHandler(401, 'You can only update your own account!'))
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
        isLearner: req.body.isLearner,
        completedQuizzes: req.body.completedQuizzes,
      }
    }, {new: true});

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only delete your own account!'))
  };

  try {
    await User.findByIdAndDelete(req.params.id);
    
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  };
}

export const getAllLearners = async (req, res, next) => {
  try {
    const allLearners = await User.find({ isLearner: true });

    if(allLearners.length === 0){
      return next(errorHandler(404, 'No users found in the database!'));
    }

    res.status(200).json(allLearners);
  } catch (error) {
    next(error);
  }
};

export const deleteManyUsers = async (req, res, next) => {
  try {
    const userIdsToDelete = req.body.userIds;

    if (!userIdsToDelete || !Array.isArray(userIdsToDelete)) {
      return next(errorHandler(400, 'The userIds field must be an array!'));
    }

    const deletedUsers = await User.deleteMany({ _id: { $in: userIdsToDelete } });

    if (deletedUsers.deletedCount === 0) {
      return next(errorHandler(404, 'No users found with the provided userIds!'));
    }

    res.status(200).json(deletedUsers);
  } catch (error) {
    next(error);
  }
};
