import pool from "../../db";
import { IEvent } from "./eventModel";

export class EventRepository {
  async addEvent(event: IEvent): Promise<IEvent> {
    const { userId, title, description, date, time } = event;
    const result = await pool.query(
      `INSERT INTO events (user_id, title, description, date, time)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [userId, title, description, date, time]
    );
    return result.rows[0];
  }

  public async findByUserAndDateRange(
    userId: string,
    startDate?: string,
    endDate?: string
  ) {
    let query = `
      SELECT * FROM events
      WHERE user_id = $1
    `;
    const params: any[] = [userId];

    if (startDate) {
      query += ` AND date >= $2`;
      params.push(startDate);
    }

    if (endDate) {
      query += ` AND date <= $3`;
      params.push(endDate);
    }

    query += ` ORDER BY date ASC`;

    const result = await pool.query(query, params);
    return result.rows;
  }

  async updateEvent(event: IEvent): Promise<IEvent> {
    const { id, title, description, date, time } = event;
    const result = await pool.query(
      `UPDATE events SET title = $1, description = $2, date = $3, time = $4
       WHERE id = $5 RETURNING *`,
      [title, description, date, time, id]
    );
    return result.rows[0];
  }

  async deleteEvent(id: string): Promise<void> {
    await pool.query(`DELETE FROM events WHERE id = $1`, [id]);
  }
}
