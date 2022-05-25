import { Express } from "express";
import { userRoutes } from "./user.route";

export const appRoutes = (app: Express) => {
  app.use("/api/users", userRoutes());
};
