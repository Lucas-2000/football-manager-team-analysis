import { Router } from "express";
import { CreatePositionFactory } from "../services/position/create/createPositionFactory";
import { FindAllPositionsFactory } from "../services/position/findAll/findAllPositionsFactory";
import { FindByBasePosition } from "../services/position/findByBasePosition/findByBasePositionFactory";

const positionRoutes = Router();

positionRoutes.post("/", (request, response) =>
  CreatePositionFactory().handle(request, response)
);
positionRoutes.get("/", (request, response) =>
  FindAllPositionsFactory().handle(request, response)
);
positionRoutes.get("/:basePosition", (request, response) =>
  FindByBasePosition().handle(request, response)
);

export { positionRoutes };
