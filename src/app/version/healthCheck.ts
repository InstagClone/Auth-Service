import type { Request, Response } from 'express';

export default async function healthCheck(req: Request, res: Response): Promise<void> {
  const response = {
    online: true
  };
  res.send(response);
}
