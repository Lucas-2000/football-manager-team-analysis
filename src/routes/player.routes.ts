import { Router } from "express";
import { CreatePlayerFactory } from "../services/player/create/createPlayerFactory";
import { FindAllPlayersFactory } from "../services/player/findAll/findAllPlayersFactory";
import { FindPlayerByIdFactory } from "../services/player/findById/findPlayerByIdFactory";

const playerRoutes = Router();

playerRoutes.post("/", (request, response) =>
  CreatePlayerFactory().handle(request, response)
);
playerRoutes.get("/", (request, response) =>
  FindAllPlayersFactory().handle(request, response)
);
playerRoutes.get("/:id", (request, response) =>
  FindPlayerByIdFactory().handle(request, response)
);

export { playerRoutes };
