import { Router } from "express";
import { GenerateReportPlayersFactory } from "../services/reports/pdf/generateReportPlayersFactory";
import { GenerateWorksheetFactory } from "../services/reports/excel/generateWorksheetFactory";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const reportRoutes = Router();

reportRoutes.get(
  "/players/:userId/:teamId",
  ensureAuthenticated,
  (request, response) =>
    GenerateReportPlayersFactory().handle(request, response)
);
reportRoutes.get(
  "/sheets/:userId/:teamId",
  ensureAuthenticated,
  (request, response) => GenerateWorksheetFactory().handle(request, response)
);

export { reportRoutes };
