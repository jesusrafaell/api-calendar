import pool from "../../db";
import { IUser } from "./userModel";

export class UserRepository {
  async getAllUsers(): Promise<IUser[]> {
    const result = await pool.query(`
      SELECT 
        id,
        first_name AS "firstName",
        last_name AS "lastName",
        email,
        created_at AS "createdAt"
      FROM users
    `);
    return result.rows;
  }

  async createUser(user: IUser): Promise<IUser> {
    const { firstName, lastName, email, password } = user;
    const result = await pool.query(
      `
      INSERT INTO users (first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING 
        id,
        first_name AS "firstName",
        last_name AS "lastName",
        email,
        password,
        created_at AS "createdAt"
      `,
      [firstName, lastName, email, password]
    );
    return result.rows[0];
  }

  async findById(id: string): Promise<IUser | null> {
    const result = await pool.query(
      `
      SELECT 
        id,
        first_name AS "firstName",
        last_name AS "lastName",
        email,
        password,
        created_at AS "createdAt"
      FROM users
      WHERE id = $1
      `,
      [id]
    );
    return result.rows.length ? result.rows[0] : null;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const result = await pool.query(
      `
      SELECT 
        id,
        first_name AS "firstName",
        last_name AS "lastName",
        email,
        password,
        created_at AS "createdAt"
      FROM users
      WHERE email = $1
      `,
      [email]
    );
    return result.rows.length ? result.rows[0] : null;
  }
}
