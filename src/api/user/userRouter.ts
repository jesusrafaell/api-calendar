import { Router } from "express";
import { UserController } from "./userController";
import { authMiddleware } from "../../common/middlewares/authMiddleware";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/", authMiddleware, userController.getUsers);
userRouter.post("/", authMiddleware, userController.createUser);
userRouter.get("/:id", authMiddleware, userController.getUserById);

userRouter.get("/data", authMiddleware, userController.getUserById);

export default userRouter;
