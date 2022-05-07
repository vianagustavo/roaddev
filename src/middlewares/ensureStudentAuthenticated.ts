import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { IStudentIdWithRequest } from "../domain/requestDto";

interface IPayload {
  sub: string;
}

export function ensureStudentAuthenticated(
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
    const { sub } = verify(token, `${process.env.STUDENT_SECRET}`) as IPayload;
    (request as IStudentIdWithRequest).student_id = sub;
    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
