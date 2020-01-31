import { Response } from 'express';

export interface iErrorMessage {
  message: string
}

export const sendError = (res: Response, err: iErrorMessage ): void => {
  res.status(500).json(err);
};
