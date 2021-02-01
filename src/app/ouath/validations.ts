import Joi from 'joi';
import type { requestValidateSchema } from '../../middlewares/validateRequest';

const accessTokenValidation: requestValidateSchema = {
  headerSchema: Joi.object().keys(),
  querySchema: Joi.object().keys(),
  paramSchema: Joi.object().keys(),
  bodySchema: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    grant_type: Joi.string().required()
  })
}

export {
  accessTokenValidation
}
