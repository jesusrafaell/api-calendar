import { UserRepository } from "./userRepository";
import { IUser } from "./userModel";
import { log } from "console";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public getUsers = (): Promise<IUser[]> => {
    return this.userRepository.getAllUsers();
  };

  public addUser = async (user: IUser): Promise<IUser> => {
    return this.userRepository.createUser(user);
  };

  async findById(id: string): Promise<IUser | null> {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.userRepository.findByEmail(email);
  }
}
