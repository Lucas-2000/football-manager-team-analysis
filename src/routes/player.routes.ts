import { Router } from "express";
import { CreatePlayerFactory } from "../services/player/create/createPlayerFactory";
import { FindAllPlayersFactory } from "../services/player/findAll/findAllPlayersFactory";
import { FindPlayerByIdFactory } from "../services/player/findById/findPlayerByIdFactory";
import { UpdatePlayerFactory } from "../services/player/update/updatePlayerFactory";
import { DeletePlayerFactory } from "../services/player/delete/deletePlayerFactory";
import { UploadPlayerImageFactory } from "../services/player/uploadImage/uploadPlayerImageFactory";
import multer from "multer";
import { storage } from "../utils/config/multer/multerConfig";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const playerRoutes = Router();
const upload = multer({ storage: storage });

playerRoutes.post("/", ensureAuthenticated, (request, response) =>
  CreatePlayerFactory().handle(request, response)
);
playerRoutes.get("/", ensureAuthenticated, (request, response) =>
  FindAllPlayersFactory().handle(request, response)
);
playerRoutes.get("/:id", ensureAuthenticated, (request, response) =>
  FindPlayerByIdFactory().handle(request, response)
);
playerRoutes.put("/:id", ensureAuthenticated, (request, response) =>
  UpdatePlayerFactory().handle(request, response)
);
playerRoutes.delete("/:id", ensureAuthenticated, (request, response) =>
  DeletePlayerFactory().handle(request, response)
);
playerRoutes.post(
  "/:id/playerImage",
  ensureAuthenticated,
  upload.single("file"),
  (request, response) => UploadPlayerImageFactory().handle(request, response)
);

export { playerRoutes };
