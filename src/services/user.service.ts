import { Request } from "express";
import { User } from "../entities/User";
import { userRepository } from "../repositories";
import * as dotenv from "dotenv";
import { sign } from "jsonwebtoken";
import { AssertsShape } from "yup/lib/object";
import { serializedCreateUserSchema } from "../schemas/user";
import { ErrorHandler } from "../errors";

dotenv.config();

interface ILogin {
  status: number;
  message: object;
}

class UserService {
  loginUser = async ({ validated }: Request): Promise<ILogin> => {
    const user: User = await userRepository.findOne({
      email: (validated as User).email,
    });

    if (!user || !(await user.comparePwd((validated as User).password))) {
      throw new ErrorHandler(401, {
        error: {
          message: "Invalid credentials",
        },
      });
    }

    const token: string = sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return {
      status: 200,
      message: { token },
    };
  };

  createUser = async (req: Request): Promise<AssertsShape<any>> => {
    if ((req.validated as User)?.isAdm) {
      if (!req.userAuth) {
        throw new ErrorHandler(401, {
          error: "missing admin permission",
        });
      } else if (!req.userAuth.isAdm) {
        throw new ErrorHandler(401, {
          error: {
            name: "JsonWebTokenError",
            message: "jwt malformed",
          },
        });
      }
    }

    const user: User = await userRepository.save(req.validated as User);

    return await serializedCreateUserSchema.validate(user, {
      stripUnknown: true,
    });
  };
}

export default new UserService();
