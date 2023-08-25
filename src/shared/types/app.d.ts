import { Request, Response } from 'express';
import type { User } from 'src/auth/user.model';

export type AppRequest = Request & {
  user?: User;
};

export type AppResponse = Response;
