import { User } from "../entities/User";

declare global {
  namespace Express {
    interface Request {
      validated: User;
      userAuth: User;
    }
  }
}
