import type { NextFunction, Request, Response } from 'express';

interface HttpException {
  status?: number;
  stack?: string;
}

export default function errorHandler(err: HttpException, _req: Request, res: Response, next: NextFunction): void {
  const error = {
    status: err?.status ?? 500,
    message: err?.stack ?? 'Internal Server Error'
  }
  res.status(error.status).send({ message: error.message });
}
