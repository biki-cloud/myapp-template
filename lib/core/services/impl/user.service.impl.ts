import { injectable, inject } from "tsyringe";
import type {
  User,
  CreateUserInput,
  UpdateUserInput,
  UserWithPassword,
} from "@/lib/core/domain/user.domain";
import type { IUserRepository } from "../../repositories/interface/user.repository.interface";
import type { IUserService } from "../interface/user.service.interface";
import type { IAuthServerService } from "@/lib/core/services/interface/auth.service.interface";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,
    @inject("AuthService")
    private readonly authService: IAuthServerService
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async create(input: CreateUserInput): Promise<User> {
    const existingUser = await this.findByEmail(input.email);
    if (existingUser) {
      throw new Error("このメールアドレスは既に登録されています。");
    }
    return this.userRepository.create(input);
  }

  async update(id: number, input: UpdateUserInput): Promise<User> {
    if (input.email) {
      const existingUser = await this.findByEmail(input.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error("このメールアドレスは既に使用されています。");
      }
    }

    return this.userRepository.update(id, input);
  }

  async delete(id: number): Promise<boolean> {
    return this.userRepository.delete(id);
  }

  async validatePassword(
    email: string,
    password: string
  ): Promise<User | null> {
    const user = await this.userRepository.findByEmailWithPassword(email);
    if (!user) return null;

    const isValid = await this.authService.comparePasswords(
      password,
      user.passwordHash
    );
    return isValid ? user : null;
  }
}
