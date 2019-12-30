// tslint:disable: interface-name
import {
  HttpStatusCode,
  TemplateId,
  ResponseFormat,
  ApiResponseBody,
  StatusText
} from './interfaces';

interface JsonResBuilderTemplate {
  status: HttpStatusCode;
  statusText: StatusText;
  name: TemplateId;
  httpStatusCode: HttpStatusCode;
  defaultMessage?: string;
}

const responseTemplate = (templateId: TemplateId): JsonResBuilderTemplate => {
  switch (templateId) {
    case 'SUCCESS':
      return {
        name: 'SUCCESS',
        status: 200,
        httpStatusCode: 200,
        statusText: 'success'
      };
    case 'CLIENT_ERROR':
      return {
        name: 'CLIENT_ERROR',
        status: 400,
        httpStatusCode: 400,
        statusText: 'fail',
        defaultMessage: 'Client error'
      };
    case 'AUTHENTICATION_FAILED':
      return {
        name: 'AUTHENTICATION_FAILED',
        status: 400,
        httpStatusCode: 400,
        statusText: 'fail',
        defaultMessage: 'Authentication Failed'
      };
    case 'BAD_REQUEST':
      return {
        name: 'BAD_REQUEST',
        status: 400,
        httpStatusCode: 400,
        statusText: 'fail',
        defaultMessage: 'Malformed request'
      };
    case 'SESSION_EXPIRED':
      return {
        name: 'SESSION_EXPIRED',
        status: 401,
        httpStatusCode: 401,
        statusText: 'fail',
        defaultMessage: 'Session has expired'
      };
    case 'UNAUTHORIZED':
      return {
        name: 'UNAUTHORIZED',
        status: 401,
        httpStatusCode: 401,
        statusText: 'fail',
        defaultMessage: 'Unauthorized action'
      };
    case 'EXPIRED_TOKEN':
      return {
        name: 'EXPIRED_TOKEN',
        status: 401,
        httpStatusCode: 401,
        statusText: 'fail',
        defaultMessage: 'Expired Token'
      };
    case 'INVALID_TOKEN':
      return {
        name: 'INVALID_TOKEN',
        status: 401,
        httpStatusCode: 401,
        statusText: 'fail',
        defaultMessage: 'Invalid Token'
      };
    case 'NOT_FOUND':
      return {
        name: 'NOT_FOUND',
        status: 404,
        httpStatusCode: 404,
        statusText: 'fail',
        defaultMessage: 'Resource not found'
      };
    case 'TOO_MANY_REQUESTS':
      return {
        name: 'TOO_MANY_REQUESTS',
        status: 429,
        httpStatusCode: 429,
        statusText: 'fail'
      };
    case 'INTERNAL_SERVER_ERROR':
      return {
        name: 'INTERNAL_SERVER_ERROR',
        status: 501,
        httpStatusCode: 501,
        statusText: 'error',
        defaultMessage: 'Internal Server Error'
      };
    default:
      throw new Error('Invalid JsonRes template name');
  }
};

export class JsonResBuilder {
  private _defaults: JsonResBuilderTemplate;
  private _httpStatusCode: HttpStatusCode;
  private _responseBody: ApiResponseBody;

  constructor(
    templateId: TemplateId,
    data?: object,
    message?: string) {

    // Generate template from templateName
    this._defaults = responseTemplate(templateId);
    this._httpStatusCode = this._defaults.httpStatusCode;

    // Create response body
    this._responseBody = {
      code: this._defaults.name,
      status: this._defaults.statusText,
      data: undefined,
      message: this._defaults.defaultMessage,
    };

    // Only add data to response body if populated
    if (data && Object.keys(data).length !== 0 && data.constructor === Object) {
      this._responseBody.data = data;
    }

    // Only add message to response body if populated
    if (message) {
      this._responseBody.message = message;
    }
  }

  get status(): HttpStatusCode {
    return this._httpStatusCode;
  }

  get httpStatusCode(): HttpStatusCode {
    return this._httpStatusCode;
  }

  get httpCode(): HttpStatusCode {
    return this._httpStatusCode;
  }

  get body(): ApiResponseBody {
    return this._responseBody;
  }
}
