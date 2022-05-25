import { Request, Response } from "express";
import { userService } from "../services";

class UserController {
  loginUser = async (req: Request, res: Response) => {
    try {
      const { status, message } = await userService.loginUser(req);

      return res.status(status).json(message);
    } catch (err) {
      return res.status(err.statusCode).json(err.message);
    }
  };

  createUser = async (req: Request, res: Response) => {
    const user = await userService.createUser(req);

    return res.status(201).json(user);
  };
}

export default new UserController();
