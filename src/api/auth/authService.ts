import { generateToken } from "../../common/utils/token";
import { UserRepository } from "../user/userRepository";
import { ILogin, ILoginResponse, IRegister } from "./authModel";
import bcrypt from "bcrypt";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public login = async (payload: ILogin): Promise<ILoginResponse> => {
    try {
      const email = payload.email.trim();
      const password = payload.password.trim();

      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new Error("user not found");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("invalid credentials");
      }

      const token = generateToken(user.id, user.email);

      const { password: _, ...userRes } = user;

      return {
        ...userRes,
        token,
      };
    } catch (error) {
      throw error;
    }
  };

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePassword(password: string): boolean {
    return password.length >= 8;
  }

  public async register(data: IRegister): Promise<any> {
    const { first_name, last_name, email, password } = data;

    if (!first_name || !last_name || !email || !password) {
      throw new Error("All fields are required");
    }

    if (!this.validateEmail(email)) {
      throw new Error("Invalid email format");
    }

    if (!this.validatePassword(password)) {
      throw new Error("Password must be at least 8 characters long");
    }

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email is already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userRepository.createUser({
      id: "",
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    return newUser;
  }
}
