import { HttpHeader } from '../../shared/http-header.enum';
import { SensitiveKeys } from '../../shared/sensitive-keys.enum';
import { SpecialMessages } from '../../shared/special-message.enum';
import { HttpStatusCode } from './logger.enum';
import { HttpLogMetaData, HttpLogger } from './logger.interface';

export const formatHTTPLoggerResponse = (
  context: HttpLogMetaData,
): HttpLogger => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  let requestDuration = '.';

  if (context.req?.requestStartTime) {
    const endTime = Date.now() - context.req.requestStartTime;
    requestDuration = `${endTime / 1000}s`;
  }

  return {
    request: {
      headers: context?.req?.headers,
      host: context?.req?.headers.host,
      protocol: context?.req?.protocol as string,
      baseUrl: context?.req?.baseUrl as string,
      url: context?.req?.url as string,
      method: context?.req?.method as string,
      body: formatResponseBody(context?.req?.body),
      params: context?.req?.params,
      query: context?.req?.query,
      clientIp:
        context.req?.headers[HttpHeader.ForwardedFor] ??
        context.req?.socket.remoteAddress,
      requestDuration,
    },
    response: {
      headers: context?.res?.getHeaders(),
      statusCode:
        context?.error?.statusCode ??
        (context?.res?.statusCode as HttpStatusCode),
      body: formatResponseBody(context.responseBody),
    },
    error: {
      name: context?.error?.name as string,
      statusCode: context?.error?.statusCode as HttpStatusCode,
      message: context?.error?.message as string,
      stackTrace: isDevelopment
        ? (context?.error?.stackTrace as string)
        : ({} as string),
    },
    customMetaData: context?.customMetaData,
  };
};

const sensitiveKeysList = Object.values(SensitiveKeys) as string[];
const formatResponseBody = (data: any): any => {
  // to avoid calling redact function on native Mongoose/MongoDB model
  // we check if !data.constructor.name.startsWith('model')
  if (
    typeof data === 'object' &&
    data !== null &&
    !data.constructor.name.startsWith('model')
  ) {
    if (Array.isArray(data)) {
      return data.map((item) => formatResponseBody(item));
    }

    const _data: any = {};

    for (const key in data) {
      if (sensitiveKeysList.includes(key)) {
        _data[key] = SpecialMessages.Sensitive;
      } else {
        _data[key] = formatResponseBody(data[key]);
      }
    }

    return _data;
  }
  return data;
};
