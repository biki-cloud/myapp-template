import type { INotificationService } from "../interface/notification.service.interface";

export class NotificationService implements INotificationService {
  async testNotification() {
    const reg = await navigator.serviceWorker.getRegistration(
      "/service-worker.js"
    );
    if (!reg) throw new Error("Service Worker未登録");
    reg.showNotification("テスト通知", {
      body: "これはテスト通知です。",
      icon: "/icon512_rounded.png",
      badge: "/icon512_maskable.png",
      data: { url: "/" },
    });
  }
}
