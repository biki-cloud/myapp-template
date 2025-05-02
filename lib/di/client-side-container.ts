"use client";

import "reflect-metadata";
import { container } from "tsyringe";
import { NotificationRepository } from "@/lib/core/repositories/impl/client-notification.repository.impl";
import { ClientNotificationService } from "@/lib/core/services/impl/client-notification.service.impl";
import { NOTIFICATION_TOKENS } from "@/lib/core/constants/notification";
import type { IAuthClientService } from "@/lib/core/services/interface/auth.client.service.interface";
import { AuthClientService } from "@/lib/core/services/impl/auth.client.service.impl";

let isInitialized = false;

export function initializeContainer() {
  if (isInitialized) return;

  // Register Database
  container.registerSingleton(
    NOTIFICATION_TOKENS.REPOSITORY,
    NotificationRepository
  );
  container.registerSingleton(
    NOTIFICATION_TOKENS.SERVICE,
    ClientNotificationService
  );

  container.registerSingleton<IAuthClientService>(
    "AuthClientService",
    AuthClientService
  );

  isInitialized = true;
}

initializeContainer();

export function getAuthClientService() {
  return container.resolve<IAuthClientService>("AuthClientService");
}

export function getNotificationService() {
  return container.resolve<ClientNotificationService>(
    NOTIFICATION_TOKENS.SERVICE
  );
}
