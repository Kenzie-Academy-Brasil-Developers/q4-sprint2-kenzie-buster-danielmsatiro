import { Router } from "express";
import { verifyToken } from "../middlewares";

const routes = Router();

export const dvdRoutes = () => {
  routes.post("/register", verifyToken);
  routes.get("/");
  routes.post("/buy/:dvdId");

  return routes;
};
