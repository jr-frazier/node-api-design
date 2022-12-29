import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
// import type { User } from "../../types/user";
import type { Request, Response, NextFunction } from "express";
import prisma from "../db";
import { User } from "@prisma/client";

export const comparePasswords = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};

export const createJWT = (user: User): string => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET as string
  );
  return token;
};

export const authHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    // @ts-ignore
    req.user = user;
    next();
  } catch (e) {
    console.log("Error: ", e);
    res.status(401).send({ message: "Unauthorized" });
    return;
  }
};
