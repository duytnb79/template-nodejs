import { Request, Response } from 'express';
import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from 'routing-controllers';
import { Service } from 'typedi';
import { httpLoggerService } from '../services/logger/http-logger.service';
import { ErrorMessages } from '../shared/response-message';

@Service()
@Middleware({ type: 'after' })
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, req: Request, res: Response): void {
    const statusCode = error.statusCode || 500;
    const message = error.message || ErrorMessages.Generic;

    httpLoggerService.error({ req, res, error });
    res.status(statusCode).send({ statusCode, message });
  }
}
