export interface ICommonHttpResponse<T = any> {
  data?: T;
  error?: {
    statusCode: number;
    timestamp: string;
    path: string;
    message: any;
  };
}
