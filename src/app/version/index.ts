import Express, { Router } from 'express';
import healthCheck from './healthCheck';

const router: Router = Express.Router();

router.get('/', healthCheck);

export default router;
