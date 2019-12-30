import { JsonResBuilder } from './lib/json-res-builder';
import {
  TemplateId,
  HttpStatusCode,
  ResponseFormat,
  ApiResponseBody,
  LambdaResponse
} from './lib/interfaces';

interface IExpressResponse {
  json: (json: object) => void;
  status: (number: number) => any;
}

export class JsonRes {
  private _envelope: boolean;
  private _format: ResponseFormat;

  constructor(
      format?: ResponseFormat,
      envelope?: boolean
    ) {

    // get the template from templateName
    this._envelope = envelope === false ? false : true;
    this._format = format === 'LAMBDA' ? 'LAMBDA' : 'EXPRESS';
  }

  public set envelope(value: boolean) {
    this._envelope = value;
  }

  public get envelope(): boolean {
    return this._envelope;
  }

  public set format(value: ResponseFormat) {
    this._format = value;
  }

  public get format(): ResponseFormat {
    return this._format;
  }

  public send = (
      res: IExpressResponse,
      templateId: TemplateId,
      data?: object,
      message?: string
    ): void | LambdaResponse => {

    const jsonResBuilder = new JsonResBuilder(templateId, data, message);

    if (this._format === 'LAMBDA') {
      return {
        statusCode: jsonResBuilder.status,
        body: JSON.stringify(jsonResBuilder.body)
      };
    } else {
      res.status(jsonResBuilder.status).json(jsonResBuilder.body);
    }
  }

  public createJsonResonse = (
    templateId: TemplateId,
    data?: {},
    message?: string
  ): JsonResBuilder => {
    return new JsonResBuilder(templateId, data, message);
  }

  public create = (
      templateId: TemplateId,
      data?: {},
      message?: string
    ): ApiResponseBody | LambdaResponse => {
    let jsonResBuilder = new JsonResBuilder(templateId, data, message);
    // let status = jRes.status;
    // let body = jRes.body;

    if (this._format === 'LAMBDA') {
      return {
        statusCode: jsonResBuilder.status,
        body: JSON.stringify(jsonResBuilder.body)
      };
    } else {
      return jsonResBuilder.body;
    }
  }
}

const jsonResInstance = new JsonRes();

export const jsonRes = jsonResInstance;
