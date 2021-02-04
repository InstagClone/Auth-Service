import type { Request, Response, NextFunction } from 'express';

interface HttpException {
  status?: number;
  message?: string;
}

export default function errorHandler(err: HttpException, _req: Request, res: Response, next: NextFunction): void {
  const error = {
    status: err?.status ?? 500,
    message: err?.message ?? 'Internal Server Error'
  }
  res.status(error.status).send({ message: error.message });
}
