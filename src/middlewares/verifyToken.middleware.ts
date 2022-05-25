import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../entities";
import { userRepository } from "../repositories";

dotenv.config();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  //verifyToken can also be used in routes as optional authentication
  if (!token) {
    return next();
  }

  return verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: err });
    }

    const user: User = await userRepository.findOne({ id: (<any>decoded).id });

    req.userAuth = user;

    return next();
  });
};

export default verifyToken;
