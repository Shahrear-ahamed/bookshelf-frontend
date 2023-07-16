export interface IErrorResponseData {
  message: string;
  status: boolean;
  errorMessages: [
    {
      path: string;
      message: string;
    },
  ];
}

export interface IErrorResponse {
  data: IErrorResponseData;
}
