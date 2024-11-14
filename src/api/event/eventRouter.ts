import { Router } from "express";
import { EventController } from "./eventController";
import { authMiddleware } from "../../common/middlewares/authMiddleware";

const eventRouter = Router();
const eventController = new EventController();

eventRouter.post("/", authMiddleware, eventController.createEvent);
eventRouter.get("/user", authMiddleware, eventController.getEventsByUserId);
eventRouter.put("/", authMiddleware, eventController.updateEvent);
eventRouter.delete("/:id", authMiddleware, eventController.deleteEvent);

export default eventRouter;
