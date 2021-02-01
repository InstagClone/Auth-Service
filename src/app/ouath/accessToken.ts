import { getToken } from '../../services/jwtService';
import type { Request, Response } from 'express';

export default async function healthCheck(req: Request, res: Response): Promise<void> {
  const { username, password, grant_type: grantType } = req.body;
  const response = await getToken(username, password, grantType);
  res.send(response);
}
