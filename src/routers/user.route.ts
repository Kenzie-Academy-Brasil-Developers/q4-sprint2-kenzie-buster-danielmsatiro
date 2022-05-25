import { Router } from "express";
import { userController } from "../controllers";
import { validateSchema, verifyToken, verifyUserExists } from "../middlewares";
import { createUserSchema, loginUserSchema } from "../schemas";

const routes = Router();

export const userRoutes = () => {
  routes.post(
    "/login",
    validateSchema(loginUserSchema),
    userController.loginUser
  );
  routes.post(
    "/register",
    validateSchema(createUserSchema),
    verifyUserExists,
    verifyToken,
    userController.createUser
  );

  return routes;
};
