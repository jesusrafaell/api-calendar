import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/authMiddleware";
import { AuthController } from "./authController";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);

export default authRouter;
