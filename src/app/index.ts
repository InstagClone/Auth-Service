import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import version from './version';
import errorHandler from '../middlewares/errorHandler';
import type { Application } from 'express';

export default function create(): Application {
  const app: Application = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/healthcheck', version);
  app.use(errorHandler);
  return app;
}
