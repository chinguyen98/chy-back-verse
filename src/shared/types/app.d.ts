import { Request, Response } from 'express';
import type { User } from 'src/auth/user.model';
import { RefreshToken } from 'src/refresh-token/refresh-token.model';

export type UserRequestData = {
  data?: User;
  refreshToken?: RefreshToken;
};

export type AppRequest = Request & {
  user?: UserRequestData;
};

export type AppResponse = Response;
