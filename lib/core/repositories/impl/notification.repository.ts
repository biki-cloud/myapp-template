import type { INotificationRepository } from "../interface/notification.repository.interface";

export class NotificationRepository implements INotificationRepository {
  async testNotification(title: string, options?: NotificationOptions) {
    const reg = await navigator.serviceWorker.getRegistration(
      "/service-worker.js"
    );
    if (!reg) throw new Error("Service Worker未登録");
    reg.showNotification(title, options);
  }
}
