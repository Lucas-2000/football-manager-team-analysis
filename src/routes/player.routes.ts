import { Router } from "express";
import { CreatePlayerFactory } from "../services/player/create/createPlayerFactory";
import { FindAllPlayersFactory } from "../services/player/findAll/findAllPlayersFactory";

const playerRoutes = Router();

playerRoutes.post("/", (request, response) =>
  CreatePlayerFactory().handle(request, response)
);
playerRoutes.get("/", (request, response) =>
  FindAllPlayersFactory().handle(request, response)
);

export { playerRoutes };
