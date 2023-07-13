import { Router } from "express";
import { CreatePositionFactory } from "../services/position/create/createPositionFactory";

const positionRoutes = Router();

positionRoutes.post("/", (request, response) =>
  CreatePositionFactory().handle(request, response)
);

export { positionRoutes };
