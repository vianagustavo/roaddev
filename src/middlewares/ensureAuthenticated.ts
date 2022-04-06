import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const authenticate = {
    dallorinho: "lindo"
  };
  const [, token] = authToken.split(" ");

  try {
    const decode = verify(token, "3dd4375b259007313f23bc7709c7b08c");
    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
