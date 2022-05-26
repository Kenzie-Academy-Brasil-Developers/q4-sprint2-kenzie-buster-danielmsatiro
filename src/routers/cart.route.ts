import { Router } from "express";
import { cartController } from "../controllers";
import { verifyToken } from "../middlewares";

const routes = Router();

export const cartRoutes = () => {
  routes.put("/pay", verifyToken, cartController.payCart);

  return routes;
};
