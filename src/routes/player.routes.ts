import { Router } from "express";
import { CreatePlayerFactory } from "../services/player/create/createPlayerFactory";

const playerRoutes = Router();

playerRoutes.post("/", (request, response) =>
  CreatePlayerFactory().handle(request, response)
);

export { playerRoutes };
