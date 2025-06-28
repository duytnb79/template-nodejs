import { Logger } from 'winston';
import { HttpStatusCode } from './logger.enum';
import { Request, Response } from 'express';

export interface LoggerService {
  info(context: any, message?: string): Logger;
  error(context: any, message?: string): Logger;
}

export interface HttpLogger {
  request: HttpLoggerRequest;
  response: HttpLoggerResponse;
  error: HttpLoggerError;
  customMetaData?: any;
}

export interface HttpLoggerRequest {
  headers: any;
  host?: string;
  protocol: string;
  baseUrl: string;
  url: string;
  method: string;
  body: any;
  params: any;
  query: any;
  clientIp?: string | string[];
  requestDuration: string;
}

export interface HttpLoggerResponse {
  headers: any;
  statusCode: HttpStatusCode;
  body: any;
}

export interface HttpLoggerError {
  name: string;
  statusCode: HttpStatusCode;
  message: string;
  stackTrace: string;
}

export interface HttpLogMetaData {
  req?: ExtendedRequest;
  res?: Response;
  responseBody?: any;
  error?: HttpLoggerError;
  customMetaData?: any;
}

export interface HttpError extends Error {
  statusCode: number;
}

export interface ExtendedRequest extends Request {
  requestStartTime?: number;
}
