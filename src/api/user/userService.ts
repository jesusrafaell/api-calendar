import { UserRepository } from "./userRepository";
import { IUser } from "./userModel";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async getUsers(): Promise<IUser[]> {
    return this.userRepository.getAllUsers();
  }

  public async addUser(user: IUser): Promise<IUser> {
    return this.userRepository.createUser(user);
  }

  public async findById(id: string): Promise<IUser | null> {
    return this.userRepository.findById(id);
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return this.userRepository.findByEmail(email);
  }
}
