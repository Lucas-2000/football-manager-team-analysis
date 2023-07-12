import { Router } from "express";
import { createTeamFactory } from "../services/team/create/createTeamFactory";

const teamRoutes = Router();

teamRoutes.post("/", (request, response) =>
  createTeamFactory().handle(request, response)
);

export { teamRoutes };
