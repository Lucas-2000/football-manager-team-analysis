import { Router } from "express";
import { CreateTeamFactory } from "../services/team/create/createTeamFactory";
import { FindAllTeamsFactory } from "../services/team/findAll/findAllTeamsFactory";
import { FindTeamByIdFactory } from "../services/team/findById/findTeamByIdFactory";
import { UpdateTeamFactory } from "../services/team/update/updateTeamFactory";
import { DeleteTeamFactory } from "../services/team/delete/deleteTeamFactory";
import multer from "multer";
import { storage } from "../utils/config/multer/multerConfig";
import { UploadTeamLogoFactory } from "../services/team/uploadLogo/uploadTeamLogoFactory";

const teamRoutes = Router();

const upload = multer({ storage: storage });

teamRoutes.post("/", (request, response) =>
  CreateTeamFactory().handle(request, response)
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
teamRoutes.delete("/:id", (request, response) =>
  DeleteTeamFactory().handle(request, response)
);
teamRoutes.post("/:id/logo", upload.single("file"), (request, response) =>
  UploadTeamLogoFactory().handle(request, response)
);

export { teamRoutes };
