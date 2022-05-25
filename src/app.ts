import express from "express";
import { appRoutes } from "./routers";

const app = express();

app.use(express.json());

appRoutes(app);

export default app;
