import { User } from "../entities";

interface IDvdCreate {
  name: string;
  duration: string;
  quantity: number;
  price: number;
}

interface IDvdCreateList {
  dvds: IDvdCreate[];
}

declare global {
  namespace Express {
    interface Request {
      validated: User | IDvdCreateList;
      userAuth: User;
    }
  }
}
