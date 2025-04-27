import "reflect-metadata";
import { container } from "tsyringe";
import type { Database } from "@/lib/infrastructure/db/drizzle";
import type { IAuthService } from "../core/services/interface/auth.service.interface";
import { AuthService } from "../core/services/impl/auth.service.impl";
import { db } from "@/lib/infrastructure/db/drizzle";
import { UserService } from "../core/services/impl/user.service.impl";
import { UserRepository } from "../core/repositories/impl/user.repository.impl";
import { IUserService } from "../core/services/interface/user.service.interface";
import { IUserRepository } from "../core/repositories/interface/user.repository.interface";

let isInitialized = false;

export function initializeContainer() {
  if (isInitialized) return;

  // Register Database
  container.registerInstance<Database>("Database", db);

  container.registerSingleton<IAuthService>("AuthService", AuthService);

  container.registerSingleton<IUserService>("UserService", UserService);
  container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
  );

  isInitialized = true;
}

initializeContainer();

export function getDatabase() {
  return container.resolve<Database>("Database");
}

export function getAuthService() {
  return container.resolve<IAuthService>("AuthService");
}

export function getUserService() {
  return container.resolve<IUserService>("UserService");
}

export function getUserRepository() {
  return container.resolve<IUserRepository>("UserRepository");
}
