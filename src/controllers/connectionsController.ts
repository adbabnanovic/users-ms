import { Request, Response } from 'express';
import { User } from '../models/userModel';
import { sendError } from '../utils/sendError';

export const getUserConnections = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.user_id);
    if (!user) {
      sendError(res, { message: 'User not found' })
      return;
    };

    const userConnections = await User.find({
      _id: { $in: user.connections },
    });

    res.json({
      message: 'User connections retrieved',
      data: userConnections,
    });
  } catch (err) {
    sendError(res, err);
  }
};

export const createConnection = async (req: Request, res: Response) => {
  try {
    const { firstUserId, secondUserId } = req.body;

    const userA = await User.findById(firstUserId);
    const userB = await User.findById(secondUserId);
    if (!userA || !userB) {
      sendError(res, { message: 'User not found' });
      return;
    };

    await userA.update({ $addToSet: { connections: userB } });
    await userB.update({ $addToSet: { connections: userA } });

    res.json({
      message: 'Connection created',
    });
  } catch (err) {
    sendError(res, err);
  }
};
