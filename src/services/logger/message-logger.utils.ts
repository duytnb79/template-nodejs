import { HttpMethod } from '../../shared/http-method.enum';
import { ErrorMessages, SuccessMessages } from '../../shared/response-message';

// Returns Generic HTTP Successful messages
export const getHTTPSuccessResponseMessage = (
  responseMethod: HttpMethod,
): string => {
  switch (responseMethod) {
    case HttpMethod.POST:
      return SuccessMessages.CreateSuccess;
    case HttpMethod.GET:
      return SuccessMessages.GetSuccess;
    case HttpMethod.PUT:
      return SuccessMessages.UpdateSuccess;
    case HttpMethod.PATCH:
      return SuccessMessages.UpdateSuccess;
    case HttpMethod.DELETE:
      return SuccessMessages.DeleteSuccess;
    default:
      return SuccessMessages.GenericSuccess;
  }
};

// Returns Generic HTTP Failed messages
export const getHTTPErrorResponseMessage = (
  responseMethod: HttpMethod,
): string => {
  switch (responseMethod) {
    case HttpMethod.POST:
      return ErrorMessages.CreateFail;
    case HttpMethod.GET:
      return ErrorMessages.GetFail;
    case HttpMethod.PUT:
      return ErrorMessages.UpdateFail;
    case HttpMethod.PATCH:
      return ErrorMessages.UpdateFail;
    case HttpMethod.DELETE:
      return ErrorMessages.DeleteFail;
    default:
      return ErrorMessages.Generic;
  }
};
