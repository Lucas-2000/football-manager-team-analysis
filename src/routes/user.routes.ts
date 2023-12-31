import { GeneratePasswordResetFactory } from "./../services/passwordReset/generate/generatePasswordResetFactory";
import { Router } from "express";
import { CreateUserFactory } from "../services/user/create/createUserFactory";
import { FindAllUsersFactory } from "../services/user/findAll/findAllUsersFactory";
import { FindUserByIdFactory } from "../services/user/findById/findUserByIdFactory";
import { UpdateUserFactory } from "../services/user/update/updateUserFactory";
import { DeleteUserFactory } from "../services/user/delete/deleteUserFactory";
import multer from "multer";
import { storage } from "../utils/config/multer/multerConfig";
import { UploadUserAvatarFactory } from "../services/user/uploadAvatar/uploadUserAvatarFactory";
import { AuthUserFactory } from "../services/user/auth/authUserFactory";
import { EmailSendFactory } from "../services/email/emailSendFactory";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { FindPasswordResetByTokenFactory } from "../services/passwordReset/findByToken/findPasswordResetByTokenFactory";

const userRoutes = Router();
const upload = multer({ storage: storage });

userRoutes.post("/", (request, response) =>
  CreateUserFactory().handle(request, response)
);
userRoutes.get("/", (request, response) =>
  FindAllUsersFactory().handle(request, response)
);
userRoutes.get("/:id", (request, response) =>
  FindUserByIdFactory().handle(request, response)
);
userRoutes.put("/:id", (request, response) =>
  UpdateUserFactory().handle(request, response)
);
userRoutes.delete("/:id", ensureAuthenticated, (request, response) =>
  DeleteUserFactory().handle(request, response)
);
userRoutes.post(
  "/:id/avatar",
  ensureAuthenticated,
  upload.single("file"),
  (request, response) => UploadUserAvatarFactory().handle(request, response)
);
userRoutes.post("/auth", (request, response) =>
  AuthUserFactory().handle(request, response)
);
userRoutes.post("/reset-password", (request, response) =>
  GeneratePasswordResetFactory().handle(request, response)
);
userRoutes.get("/find-by-token/:token", (request, response) =>
  FindPasswordResetByTokenFactory().handle(request, response)
);
userRoutes.post("/email", (request, response) =>
  EmailSendFactory().handle(request, response)
);

export { userRoutes };
