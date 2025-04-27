import "reflect-metadata";
import { container } from "tsyringe";
import type { Database } from "@/lib/infrastructure/db/drizzle";
import type { IAuthService } from "../core/services/interface/auth.service.interface";
import { AuthService } from "../core/services/impl/auth.service.impl";
import { db } from "@/lib/infrastructure/db/drizzle";
import { UserService } from "../core/services/impl/user.service.impl";
import { UserRepository } from "../core/repositories/impl/user.repository.impl";

let isInitialized = false;

export function initializeContainer() {
  if (isInitialized) return;

  // Register Database
  container.registerInstance<Database>("Database", db);

  container.registerSingleton<IAuthService>("AuthService", AuthService);

  container.registerSingleton("UserService", UserService);
  container.registerSingleton("UserRepository", UserRepository);

  isInitialized = true;
}

// 初期化を即時実行
initializeContainer();

export function getContainer() {
  return container;
}

export function getDatabase() {
  return container.resolve<Database>("Database");
}

export function getAuthService() {
  return container.resolve<IAuthService>("AuthService");
}

export function getUserService() {
  return container.resolve<UserService>("UserService");
}

export function getUserRepository() {
  return container.resolve<UserRepository>("UserRepository");
}
