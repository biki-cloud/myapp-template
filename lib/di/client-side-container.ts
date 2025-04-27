"use client";

import "reflect-metadata";
import { container } from "tsyringe";
import type { INotificationService } from "@/lib/core/services/interface/notification.service.interface";
import { NotificationService } from "@/lib/core/services/impl/notification.service.impl";

let isInitialized = false;

export function initializeContainer() {
  if (isInitialized) return;

  // Register Database
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
