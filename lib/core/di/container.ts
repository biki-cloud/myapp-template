import "reflect-metadata";
import { container } from "tsyringe";
import type { Database } from "@/lib/infrastructure/db/drizzle";
import { db } from "@/lib/infrastructure/db/drizzle";
import type { IAuthService } from "@/lib/core/services/interface/auth.service.interface";
import { AuthService } from "../services/impl/auth.service.impl";
import type { IUserRepository } from "../repositories/interface/user.repository.interface";
import { UserRepository } from "../repositories/impl/user.repository.impl";
import type { IUserService } from "../services/interface/user.service.interface";
import { UserService } from "../services/impl/user.service.impl";

export function initializeContainer() {
  // データベースの登録
  if (typeof window !== "undefined") {
    if (!container.isRegistered("Database")) {
      container.registerInstance<Database>("Database", db);
    }
  }

  // サービスとリポジトリの登録
  if (!container.isRegistered("AuthService")) {
    container.registerSingleton<IAuthService>("AuthService", AuthService);
  }

  if (!container.isRegistered("UserService")) {
    container.registerSingleton<IUserService>("UserService", UserService);
  }

  if (!container.isRegistered("UserRepository")) {
    container.registerSingleton<IUserRepository>(
      "UserRepository",
      UserRepository
    );
  }
}

export function getDatabase(): Database {
  if (!container.isRegistered("Database")) {
    container.registerInstance<Database>("Database", db);
  }
  return container.resolve<Database>("Database");
}

export function getAuthService(): IAuthService {
  return container.resolve<IAuthService>("AuthService");
}

export function getUserService(): IUserService {
  return container.resolve<IUserService>("UserService");
}

export function getUserRepository(): IUserRepository {
  return container.resolve<IUserRepository>("UserRepository");
}
