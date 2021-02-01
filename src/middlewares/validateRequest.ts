import type { ObjectSchema, ValidationErrorItem } from 'joi';
import type { Request, Response, NextFunction } from 'express';

export interface requestValidateSchema {
  headerSchema: ObjectSchema;
  querySchema: ObjectSchema;
  paramSchema: ObjectSchema;
  bodySchema: ObjectSchema;
}

const validateSchema = (schema: ObjectSchema, data: unknown) => {
  if (!schema) return [];
  const { error } = schema.validate(data, { abortEarly: false });
  const { details } = error ?? { details: [] };
  return details;
}

const formatMessages = (errors: Array<ValidationErrorItem>, types: string) => {
  const errorMessages: Array<string> = errors.map((error: ValidationErrorItem) => error.message);
  if (errorMessages.length === 0) return null;
  return {
    types,
    errorMessages: errorMessages.join(', ')
  };
}

export default function validateRequest(requestSchemas: requestValidateSchema): (req: Request, res: Response, next: NextFunction) => void {
  return function(req: Request, res: Response, next: NextFunction): void {
    const headerErrors = validateSchema(requestSchemas.headerSchema, req.headers);
    const queryErrors = validateSchema(requestSchemas.querySchema, req.query);
    const paramErrors = validateSchema(requestSchemas.paramSchema, req.params);
    const bodyErrors = validateSchema(requestSchemas.bodySchema, req.body);
    const headerMessages = formatMessages(headerErrors, 'header');
    const queryMessages = formatMessages(queryErrors, 'query');
    const paramMessages = formatMessages(paramErrors, 'param');
    const bodyMessages = formatMessages(bodyErrors, 'body');
    const errors = [
      headerMessages,
      queryMessages,
      paramMessages,
      bodyMessages
    ].filter(message => message !== null);
    if (errors.length !== 0) {
      throw new Error(JSON.stringify(errors));
    }
    next();
  }
}
