import { Router } from "express";
import { dvdController } from "../controllers";
import { validateSchema, verifyToken } from "../middlewares";
import { buyDvdSchema, createDvdSchema } from "../schemas/dvd";

const routes = Router();

export const dvdRoutes = () => {
  routes.post(
    "/register",
    validateSchema(createDvdSchema),
    verifyToken,
    dvdController.createDvd
  );
  routes.get("/", dvdController.listDvds);
  routes.post(
    "/buy/:dvdId",
    validateSchema(buyDvdSchema),
    verifyToken,
    dvdController.buyDvd
  );

  return routes;
};
