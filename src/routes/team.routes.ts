import { Router } from "express";
import { createTeamFactory } from "../services/team/create/createTeamFactory";
import { FindAllTeamsFactory } from "../services/team/findAll/findAllTeamsFactory";
import { FindTeamByIdFactory } from "../services/team/findById/findTeamByIdFactory";

const teamRoutes = Router();

teamRoutes.post("/", (request, response) =>
  createTeamFactory().handle(request, response)
);
teamRoutes.get("/", (request, response) =>
  FindAllTeamsFactory().handle(request, response)
);
teamRoutes.get("/:id", (request, response) =>
  FindTeamByIdFactory().handle(request, response)
);

export { teamRoutes };
