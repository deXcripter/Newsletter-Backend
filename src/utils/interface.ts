export interface iUserModel {
  email: {};
  name: {};
  active: {};
  inactiveSince: {};
}

export interface iBody {
  email: string;
}

export interface iError extends Error {
  errno?: number;
  statusCode: number;
  status: string;
  isOperational: boolean;
  code?: number;
  keyValue?: {};
}
