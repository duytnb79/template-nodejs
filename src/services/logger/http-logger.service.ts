import { Service } from 'typedi';
import { HttpMethod } from '../../shared/http-method.enum';
import { HttpLogMetaData, LoggerService } from './logger.interface';
import { formatHTTPLoggerResponse } from './logger.utils';
import {
  getHTTPErrorResponseMessage,
  getHTTPSuccessResponseMessage,
} from './message-logger.utils';
import { httpLogger } from './winston.setup';

@Service()
export class HttpLoggerService implements LoggerService {
  info(context: HttpLogMetaData, message = '') {
    return httpLogger.info(
      message ||
        getHTTPSuccessResponseMessage(context?.req?.method as HttpMethod),
      formatHTTPLoggerResponse(context),
    );
  }

  warn(context: HttpLogMetaData, message = '') {
    return httpLogger.warn(
      message ||
        getHTTPSuccessResponseMessage(context?.req?.method as HttpMethod),
      formatHTTPLoggerResponse(context),
    );
  }

  error(context: HttpLogMetaData, message = '') {
    return httpLogger.error(
      message ||
        getHTTPErrorResponseMessage(context?.req?.method as HttpMethod),
      formatHTTPLoggerResponse(context),
    );
  }
}

export const httpLoggerService = new HttpLoggerService();
