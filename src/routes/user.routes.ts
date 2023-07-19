import { Router } from "express";
import { CreateUserFactory } from "../services/user/create/createUserFactory";
import { FindAllUsersFactory } from "../services/user/findAll/findAllUsersFactory";

const userRoutes = Router();

userRoutes.post("/", (request, response) =>
  CreateUserFactory().handle(request, response)
);
userRoutes.get("/", (request, response) =>
  FindAllUsersFactory().handle(request, response)
);

export { userRoutes };
