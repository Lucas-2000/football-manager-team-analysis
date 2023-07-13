import { Router } from "express";
import { teamRoutes } from "./team.routes";
import { positionRoutes } from "./position.routes";

const routes = Router();

routes.use("/teams", teamRoutes);
routes.use("/positions", positionRoutes);

export { routes };
