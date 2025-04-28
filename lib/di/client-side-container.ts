"use client";

import "reflect-metadata";
import { container } from "tsyringe";
import type { INotificationService } from "@/lib/core/services/interface/notification.service.interface";
import { NotificationService } from "@/lib/core/services/impl/notification.service.impl";
import type { INotificationRepository } from "@/lib/core/repositories/interface/notification.repository.interface";
import { NotificationRepository } from "@/lib/core/repositories/impl/notification.repository";
import type { IAuthService } from "@/lib/core/services/interface/auth.client.service.interface";
import { AuthService } from "@/lib/core/services/impl/auth.client.service.impl";

let isInitialized = false;

export function initializeContainer() {
  if (isInitialized) return;

  // Register Database
  container.registerSingleton<INotificationRepository>(
    "NotificationRepository",
    NotificationRepository
  );

  container.registerSingleton<INotificationService>(
    "NotificationService",
    NotificationService
  );

  container.registerSingleton<IAuthService>("AuthService", AuthService);

  isInitialized = true;
}

initializeContainer();

export function getNotificationService() {
  return container.resolve<INotificationService>("NotificationService");
}

export function getAuthService() {
  return container.resolve<IAuthService>("AuthService");
}
