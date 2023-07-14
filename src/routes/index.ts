import { Router } from "express";
import { teamRoutes } from "./team.routes";
import { positionRoutes } from "./position.routes";
import { playerRoutes } from "./player.routes";

const routes = Router();

routes.use("/teams", teamRoutes);
routes.use("/positions", positionRoutes);
routes.use("/players", playerRoutes);

export { routes };
