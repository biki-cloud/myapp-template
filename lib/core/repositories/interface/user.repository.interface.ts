import type {
  User,
  CreateUserInput,
  UpdateUserInput,
  UserWithPassword,
} from "@/lib/core/domain/user.domain";

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByEmailWithPassword(email: string): Promise<UserWithPassword | null>;
  create(input: CreateUserInput): Promise<User>;
  update(id: number, input: UpdateUserInput): Promise<User>;
  delete(id: number): Promise<boolean>;
}
