import { Router } from "express";
import { CreateUserFactory } from "../services/user/create/createUserFactory";
import { FindAllUsersFactory } from "../services/user/findAll/findAllUsersFactory";
import { FindUserByIdFactory } from "../services/user/findById/findUserByIdFactory";

const userRoutes = Router();

userRoutes.post("/", (request, response) =>
  CreateUserFactory().handle(request, response)
);
userRoutes.get("/", (request, response) =>
  FindAllUsersFactory().handle(request, response)
);
userRoutes.get("/:id", (request, response) =>
  FindUserByIdFactory().handle(request, response)
);

export { userRoutes };
