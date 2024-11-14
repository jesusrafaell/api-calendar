import { UserRepository } from "./userRepository";
import { IUser } from "./userModel";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public getUsers = async (): Promise<IUser[]> => {
    return this.userRepository.getAllUsers();
  };

  public addUser = async (user: IUser): Promise<IUser> => {
    return this.userRepository.createUser(user);
  };

  public findById = async (id: string): Promise<IUser | null> => {
    return this.userRepository.findById(id);
  };

  public findByEmail = async (email: string): Promise<IUser | null> => {
    return this.userRepository.findByEmail(email);
  };
}
