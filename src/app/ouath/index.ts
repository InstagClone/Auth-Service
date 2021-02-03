import Express, { Router } from 'express';
import { accessTokenValidation } from './validations';
import validateRequest from '../../middlewares/validateRequest';
import accessToken from './accessToken';

const router: Router = Express.Router();

router.post('/', validateRequest(accessTokenValidation), accessToken);

export default router;
