import prisma from "../db";
import { Request, Response } from "express";
import { hashPassword, createJWT, comparePasswords } from "../modules/auth";
import { compare } from "bcrypt";

export const createNewUser = async (req: Request, res: Response) => {
  await prisma.user
    .create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    })
    .then((user) => {
      const token = createJWT(user);
      res.json({ token });
    })
    .catch((err) => {
      res.status(400);
      res.json({ message: "Unable to create user" });
    });
};

export const signin = async (req: Request, res: Response) => {
  const user = await prisma.user
    .findUnique({
      where: {
        username: req.body.username,
      },
    })
    .then(async (user) => {
      if (!user) {
        res.status(401).send({ message: "User Not Found" });
        return;
      }

      const isValid = await comparePasswords(req.body.password, user.password);

      if (!isValid) {
        res.status(401).send({ message: "Invalid Password" });
        return;
      }
      const token = createJWT(user);
      res.json({ token });
    })
    .catch((err) => {
      res.status(400);
      res.json({ message: "Could not find user" });
    });

  // if (!user) {
  //   res.status(401).send({ message: "User Not Found" });
  //   return;
  // }

  // const isValid = await comparePasswords(req.body.password, user.password);

  // if (!isValid) {
  //   res.status(401).send({ message: "Invalid Password" });
  //   return;
  // }

  // const token = createJWT(user);
  // res.json({ token });
};
