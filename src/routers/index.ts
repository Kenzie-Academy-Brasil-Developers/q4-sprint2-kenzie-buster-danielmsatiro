import { Express } from "express";
import { Router } from "express";
import { dvdRoutes } from "./dvd.route";
import { userRoutes } from "./user.route";
import { cartRoutes } from "./cart.route";

const route = Router();

export const appRoutes = (app: Express) => {
  route.use("/users", userRoutes());
  route.use("/dvds", dvdRoutes());
  route.use("/carts", cartRoutes());

  app.use("/api", route);
};
