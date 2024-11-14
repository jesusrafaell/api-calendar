import { Request, Response } from "express";
import { UserService } from "./userService";
import { IUser } from "./userModel";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener usuarios" });
    }
  };

  public createUser = async (req: Request, res: Response) => {
    try {
      const user: IUser = req.body;
      const newUser = await this.userService.addUser(user);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear usuario" });
    }
  };

  public getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await this.userService.findByEmail(id);
      if (!user) {
        res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener usuario" });
    }
  };
}
