import Express, { Router } from 'express';
import accessToken from './accessToken';

const router: Router = Express.Router();

router.post('/', accessToken);

export default router;
