export type HttpStatusCode = 200 | 400 | 401 | 404 | 429 | 501;
export type ResponseFormat = 'EXPRESS' | 'LAMBDA';
export type StatusText = 'success' | 'fail' | 'error';

export type TemplateId =
  | 'SUCCESS'
  | 'CLIENT_ERROR'
  | 'AUTHENTICATION_FAILED'
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'INVALID_TOKEN'
  | 'EXPIRED_TOKEN'
  | 'SESSION_EXPIRED'
  | 'NOT_FOUND'
  | 'TOO_MANY_REQUESTS'
  | 'INTERNAL_SERVER_ERROR';

export interface ApiResponseBody {
  code: TemplateId;
  status: StatusText;
  data?: {};
  message?: string;
}

export interface ApiResponseBodySuccess extends ApiResponseBody {
  code: TemplateId;
  status: StatusText;
  data?: object;
}

export interface ApiResponseBodyFail extends ApiResponseBody {
  code: TemplateId;
  status: StatusText;
  data?: {};
  message: string;
}

export interface LambdaResponse {
  statusCode: HttpStatusCode;
  body: string;
}
