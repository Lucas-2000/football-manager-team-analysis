import { Router } from "express";
import { teamRoutes } from "./team.routes";

const routes = Router();

routes.use("/teams", teamRoutes);

export { routes };
