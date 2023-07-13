import { Router } from "express";
import { createTeamFactory } from "../services/team/create/createTeamFactory";
import { FindAllTeamsFactory } from "../services/team/findAll/findAllTeamsFactory";

const teamRoutes = Router();

teamRoutes.post("/", (request, response) =>
  createTeamFactory().handle(request, response)
);
teamRoutes.get("/", (request, response) =>
  FindAllTeamsFactory().handle(request, response)
);

export { teamRoutes };
