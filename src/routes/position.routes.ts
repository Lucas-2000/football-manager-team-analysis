import { Router } from "express";
import { CreatePositionFactory } from "../services/position/create/createPositionFactory";
import { FindAllPositionsFactory } from "../services/position/findAll/findAllPositionsFactory";

const positionRoutes = Router();

positionRoutes.post("/", (request, response) =>
  CreatePositionFactory().handle(request, response)
);
positionRoutes.get("/", (request, response) =>
  FindAllPositionsFactory().handle(request, response)
);

export { positionRoutes };
