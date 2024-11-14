import { Request, Response } from "express";
import { AuthService } from "./authService";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const response = await this.authService.login({ email, password });

      if (!response) {
        res.status(401).json({ error: "invalid credentials" });
      }

      res.status(200).json({ data: response });
    } catch (error) {
      const _error = error as Error;
      res.status(500).json({ error: _error.message });
    }
  };

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = req.body;
      const newUser = await this.authService.register(user);

      res.status(201).json(newUser);
    } catch (error) {
      const _error = error as Error;
      res.status(500).json({ error: _error.message });
    }
  };
}
