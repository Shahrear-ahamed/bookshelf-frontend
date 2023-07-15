export interface IData {
  email: string;
  accessToken: string;
}

export interface LoginSignUpResponse {
  statusCode: number;
  status: boolean;
  message: string;
  data: IData;
}
