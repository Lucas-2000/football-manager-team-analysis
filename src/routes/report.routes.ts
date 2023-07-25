import { Router } from "express";
import { GenerateReportPlayersFactory } from "../services/reports/pdf/generateReportPlayersFactory";

const reportRoutes = Router();

reportRoutes.get("/players/:userId/:teamId", (request, response) =>
  GenerateReportPlayersFactory().handle(request, response)
);

export { reportRoutes };
