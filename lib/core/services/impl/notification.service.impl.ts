import { injectable, inject } from "tsyringe";
import type { INotificationService } from "../interface/notification.service.interface";
import type { INotificationRepository } from "@/lib/core/repositories/interface/notification.repository.interface";

@injectable()
export class NotificationService implements INotificationService {
  constructor(
    @inject("NotificationRepository")
    private readonly notificationRepository: INotificationRepository
  ) {}

  async testNotification() {
    await this.notificationRepository.testNotification("テスト通知", {
      body: "これはテスト通知です。",
      icon: "/icon512_rounded.png",
      badge: "/icon512_maskable.png",
      data: { url: "/" },
    });
  }
}
