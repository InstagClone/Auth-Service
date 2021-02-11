import { getToken } from '../../services/jwtService';
import type { Request, Response, NextFunction } from 'express';

export default async function(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { username, password, scopes } = req.body;
    const response = await getToken(username, password, scopes);
    res.send(response);
  } catch (err) {
    next(err);
  }
}
