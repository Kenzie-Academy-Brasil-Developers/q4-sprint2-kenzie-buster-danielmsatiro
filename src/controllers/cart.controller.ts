import { Request, Response } from "express";
import { cartService } from "../services";

class CartController {
  payCart = async (req: Request, res: Response) => {
    const carts = await cartService.payCarts(req);

    return res.status(201).json(carts);
  };
}

export default new CartController();
