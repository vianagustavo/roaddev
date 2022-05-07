import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { IUserIdWithRequest } from "../domain/requestDto";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, `${process.env.USER_SECRET}`) as IPayload;
    (request as IUserIdWithRequest).user_id = sub;
    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
