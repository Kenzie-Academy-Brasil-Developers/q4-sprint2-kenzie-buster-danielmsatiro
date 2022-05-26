import { Router } from "express";

const routes = Router();

export const cartRoutes = () => {
  routes.put("/pay");

  return routes;
};
