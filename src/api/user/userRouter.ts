import { Router } from "express";
import { UserController } from "./userController";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/", userController.getUsers);
userRouter.post("/", userController.createUser);
userRouter.get("/:id", userController.getUserById);

export default userRouter;
