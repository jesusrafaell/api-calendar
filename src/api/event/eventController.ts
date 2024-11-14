import { Request, Response } from "express";
import { EventService } from "./eventService";
import { IEvent } from "./eventModel";

export class EventController {
  private eventService = new EventService();

  public createEvent = async (req: Request, res: Response) => {
    try {
      const body: IEvent = req.body;
      const event = await this.eventService.addEvent({
        ...body,
        userId: req.user.id,
      });
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ error: "Error creating event" });
    }
  };

  public getEventsByUserId = async (req: Request, res: Response) => {
    try {
      const { startDate, endDate } = req.query;
      const userId = req.user.id;

      const events = await this.eventService.getEventsByUser(
        userId,
        startDate as string,
        endDate as string
      );
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Error fetching events" });
    }
  };

  public updateEvent = async (req: Request, res: Response) => {
    try {
      const updatedEvent = await this.eventService.updateEvent(req.body);
      res.json(updatedEvent);
    } catch (error) {
      res.status(500).json({ error: "Error updating event" });
    }
  };

  public deleteEvent = async (req: Request, res: Response) => {
    try {
      await this.eventService.deleteEvent(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Error deleting event" });
    }
  };
}
