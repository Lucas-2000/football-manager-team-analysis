import { Router } from "express";
import { CreatePlayerFactory } from "../services/player/create/createPlayerFactory";
import { FindAllPlayersFactory } from "../services/player/findAll/findAllPlayersFactory";
import { FindPlayerByIdFactory } from "../services/player/findById/findPlayerByIdFactory";
import { UpdatePlayerFactory } from "../services/player/update/updatePlayerFactory";
import { DeletePlayerFactory } from "../services/player/delete/deletePlayerFactory";

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
playerRoutes.put("/:id", (request, response) =>
  UpdatePlayerFactory().handle(request, response)
);
playerRoutes.delete("/:id", (request, response) =>
  DeletePlayerFactory().handle(request, response)
);

export { playerRoutes };
