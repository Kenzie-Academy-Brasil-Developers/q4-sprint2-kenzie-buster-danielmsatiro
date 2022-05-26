import { Router } from "express";
import { dvdController } from "../controllers";
import { validateSchema, verifyToken } from "../middlewares";
import { createDvdSchema } from "../schemas/dvd/createDvd.schema";

const routes = Router();

export const dvdRoutes = () => {
  routes.post(
    "/register",
    validateSchema(createDvdSchema),
    verifyToken,
    dvdController.createDvd
  );
  routes.get("/", dvdController.listDvds);
  routes.post("/buy/:dvdId");

  return routes;
};
