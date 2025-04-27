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
import type { INotificationService } from "@/lib/core/services/interface/notification.service.interface";
import { NotificationService } from "../services/impl/notification.service.impl";
import { logger } from "@/lib/logger";

let isInitialized = false;

export function initializeContainer() {
  logger.info("DIコンテナを初期化中");

  // データベースの登録
  container.registerInstance<Database>("Database", db);

  // サービスとリポジトリの登録
  container.registerSingleton<IAuthService>("AuthService", AuthService);

  container.registerSingleton<IUserService>("UserService", UserService);

  container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
  );

  container.registerSingleton<INotificationService>(
    "NotificationService",
    NotificationService
  );

  isInitialized = true;
}

initializeContainer();

export function getDatabase(): Database {
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
