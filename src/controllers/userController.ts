import { Request, Response } from 'express';
import { User } from '../models/userModel';
import { sendError } from '../utils/sendError';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});

    res.json({
      message: 'Retrieved users',
      data: users
    });
  } catch(err) {
    sendError(res, err);
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User();
    user.name = req.body.name ? req.body.name : user.name;
    user.email = req.body.email;

    await user.save();

    res.json({
      message: 'New User created!',
      data: user,
    });
  } catch (err) {
    sendError(res, err);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.user_id);
    res.json({
      message: 'User details loading..',
      data: user,
    });
  } catch (err) {
    sendError(res, err);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.user_id, {
      name: req.body.name,
      email: req.body.email,
    });

    res.json({
      message: 'User Info updated',
      data: user,
    });
  } catch (err) {
    sendError(res, err);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndRemove(req.params.user_id);

    res.json({
      status: 'success',
      message: 'User deleted',
    });
  } catch(err) {
    sendError(res, err);
  }
};
