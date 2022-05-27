import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { userRepository } from "../repositories";

const verifyUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const foundUser: User = await userRepository.findOne({
    email: (req.validated as User).email,
  });

  if (foundUser) {
    return res.status(409).json({
      error: `Key (email)=(${(req.validated as User).email}) already exists.`,
    });
  }

  return next();
};

export default verifyUserExists;
