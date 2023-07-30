import { Router } from "express";
import { CreateTeamFactory } from "../services/team/create/createTeamFactory";
import { FindAllTeamsFactory } from "../services/team/findAll/findAllTeamsFactory";
import { FindTeamByIdFactory } from "../services/team/findById/findTeamByIdFactory";
import { UpdateTeamFactory } from "../services/team/update/updateTeamFactory";
import { DeleteTeamFactory } from "../services/team/delete/deleteTeamFactory";
import multer from "multer";
import { storage } from "../utils/config/multer/multerConfig";
import { UploadTeamLogoFactory } from "../services/team/uploadLogo/uploadTeamLogoFactory";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { FindTeamByUserIdFactory } from "../services/team/findByUserId/findTeamByUserIdFactory";

const teamRoutes = Router();

const upload = multer({ storage: storage });

teamRoutes.post("/", ensureAuthenticated, (request, response) =>
  CreateTeamFactory().handle(request, response)
);
teamRoutes.get("/", ensureAuthenticated, (request, response) =>
  FindAllTeamsFactory().handle(request, response)
);
teamRoutes.get("/:id", ensureAuthenticated, (request, response) =>
  FindTeamByIdFactory().handle(request, response)
);
teamRoutes.get("/user/:id", ensureAuthenticated, (request, response) =>
  FindTeamByUserIdFactory().handle(request, response)
);
teamRoutes.put("/:id", ensureAuthenticated, (request, response) =>
  UpdateTeamFactory().handle(request, response)
);
teamRoutes.delete("/:id", ensureAuthenticated, (request, response) =>
  DeleteTeamFactory().handle(request, response)
);
teamRoutes.post(
  "/:id/logo",
  ensureAuthenticated,
  upload.single("file"),
  (request, response) => UploadTeamLogoFactory().handle(request, response)
);

export { teamRoutes };
