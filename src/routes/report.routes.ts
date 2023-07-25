import { Router } from "express";
import { GenerateReportPlayersFactory } from "../services/reports/pdf/generateReportPlayersFactory";
import { GenerateWorksheetFactory } from "../services/reports/excel/generateWorksheetFactory";

const reportRoutes = Router();

reportRoutes.get("/players/:userId/:teamId", (request, response) =>
  GenerateReportPlayersFactory().handle(request, response)
);
reportRoutes.get("/sheets/:userId/:teamId", (request, response) =>
  GenerateWorksheetFactory().handle(request, response)
);

export { reportRoutes };
