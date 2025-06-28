import { NextFunction, Response } from 'express';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { Service } from 'typedi';
import { httpLoggerService } from '../services/logger/http-logger.service';
import { ExtendedRequest } from '../services/logger/logger.interface';
import { HttpStatusCode } from '../shared/http-status-code.enum';

@Service()
@Middleware({ type: 'after' })
export class ResponseInterceptor implements ExpressMiddlewareInterface {
  use(req: ExtendedRequest, res: Response, next: NextFunction): void {
    // used to calculate time between request and the response
    req.requestStartTime = Date.now();

    // Save the original response method
    const originalSend = res.send;

    // Create a flag to track whether the response has been sent
    let responseSent = false;

    // Override the response method
    res.send = function (responseBody: any): Response {
      // Log the response body or any other data you want to track
      // responseSent is used to block the same request from been sent twice
      if (!responseSent) {
        // Failed requests are logged from global middleware exception handler
        if (res.statusCode < HttpStatusCode.BadRequest) {
          httpLoggerService.info({ req, res, responseBody });
        }
        responseSent = true;
      }

      // Call the original response method
      return originalSend.call(this, responseBody);
    };

    // Continue processing the request
    next();
  }
}

export const responseInterceptor = new ResponseInterceptor().use;
