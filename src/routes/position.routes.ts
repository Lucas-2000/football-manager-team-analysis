import { Router } from "express";
import { CreatePositionFactory } from "../services/position/create/createPositionFactory";
import { FindAllPositionsFactory } from "../services/position/findAll/findAllPositionsFactory";
import { FindByBasePosition } from "../services/position/findByBasePosition/findByBasePositionFactory";
import { UpdatePositionFactory } from "../services/position/update/updatePositionFactory";
import { DeletePositionFactory } from "../services/position/delete/deletePositionFactory";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const positionRoutes = Router();

positionRoutes.post("/", (request, response) =>
  CreatePositionFactory().handle(request, response)
);
positionRoutes.get("/", ensureAuthenticated, (request, response) =>
  FindAllPositionsFactory().handle(request, response)
);
positionRoutes.get("/:basePosition", ensureAuthenticated, (request, response) =>
  FindByBasePosition().handle(request, response)
);
positionRoutes.put("/:id", (request, response) =>
  UpdatePositionFactory().handle(request, response)
);
positionRoutes.delete("/:id", (request, response) =>
  DeletePositionFactory().handle(request, response)
);

export { positionRoutes };
