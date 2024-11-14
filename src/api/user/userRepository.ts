import pool from "../../db/db";
import { IUser } from "./userModel";

export class UserRepository {
  async getAllUsers(): Promise<IUser[]> {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  }

  async createUser(user: IUser): Promise<IUser> {
    console.log(user);
    const { first_name, last_name, email, password } = user;
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [first_name, last_name, email, password]
    );
    return result.rows[0];
  }

  async findById(id: string): Promise<IUser | null> {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows.length ? result.rows[0] : null;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows.length ? result.rows[0] : null;
  }
}
