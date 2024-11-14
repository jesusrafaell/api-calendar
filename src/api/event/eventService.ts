import { EventRepository } from "./eventRepository";
import { IEvent } from "./eventModel";

export class EventService {
  private eventRepository = new EventRepository();

  async addEvent(event: IEvent) {
    return await this.eventRepository.addEvent(event);
  }

  public getEventsByUser = async (
    userId: string,
    startDate?: string,
    endDate?: string
  ) => {
    return this.eventRepository.findByUserAndDateRange(
      userId,
      startDate,
      endDate
    );
  };

  async updateEvent(event: IEvent) {
    return await this.eventRepository.updateEvent(event);
  }

  async deleteEvent(id: string) {
    await this.eventRepository.deleteEvent(id);
  }
}
