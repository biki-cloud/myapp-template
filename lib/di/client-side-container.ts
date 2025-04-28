"use client";

import "reflect-metadata";
import { container } from "tsyringe";
import type { INotificationService } from "@/lib/core/services/interface/notification.service.interface";
import { NotificationService } from "@/lib/core/services/impl/notification.service.impl";
import type { INotificationRepository } from "@/lib/core/repositories/interface/notification.repository.interface";
import { NotificationRepository } from "@/lib/core/repositories/impl/notification.repository";

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

  isInitialized = true;
}

initializeContainer();

export function getNotificationService() {
  return container.resolve<INotificationService>("NotificationService");
}

export function getNotificationRepository() {
  return container.resolve<INotificationRepository>("NotificationRepository");
}
