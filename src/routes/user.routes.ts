import { Router } from "express";
import { CreateUserFactory } from "../services/user/create/createUserFactory";

const userRoutes = Router();

userRoutes.post("/", (request, response) =>
  CreateUserFactory().handle(request, response)
);

export { userRoutes };
