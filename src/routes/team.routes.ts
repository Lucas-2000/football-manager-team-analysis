import { Router } from "express";
import { createTeamFactory } from "../services/team/create/createTeamFactory";
import { FindAllTeamsFactory } from "../services/team/findAll/findAllTeamsFactory";
import { FindTeamByIdFactory } from "../services/team/findById/findTeamByIdFactory";
import { UpdateTeamFactory } from "../services/team/update/updateTeamFactory";

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
teamRoutes.put("/:id", (request, response) =>
  UpdateTeamFactory().handle(request, response)
);

export { teamRoutes };
