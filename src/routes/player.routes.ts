import { Router } from "express";
import { CreatePlayerFactory } from "../services/player/create/createPlayerFactory";
import { FindAllPlayersFactory } from "../services/player/findAll/findAllPlayersFactory";
import { FindPlayerByIdFactory } from "../services/player/findById/findPlayerByIdFactory";
import { UpdatePlayerFactory } from "../services/player/update/updatePlayerFactory";
import { DeletePlayerFactory } from "../services/player/delete/deletePlayerFactory";
import { UploadPlayerImageFactory } from "../services/player/uploadImage/uploadPlayerImageFactory";
import multer from "multer";
import { storage } from "../utils/config/multer/multerConfig";

const playerRoutes = Router();
const upload = multer({ storage: storage });

playerRoutes.post("/", (request, response) =>
  CreatePlayerFactory().handle(request, response)
);
playerRoutes.get("/", (request, response) =>
  FindAllPlayersFactory().handle(request, response)
);
playerRoutes.get("/:id", (request, response) =>
  FindPlayerByIdFactory().handle(request, response)
);
playerRoutes.put("/:id", (request, response) =>
  UpdatePlayerFactory().handle(request, response)
);
playerRoutes.delete("/:id", (request, response) =>
  DeletePlayerFactory().handle(request, response)
);
playerRoutes.post(
  "/:id/playerImage",
  upload.single("file"),
  (request, response) => UploadPlayerImageFactory().handle(request, response)
);

export { playerRoutes };
