export interface INotificationRepository {
  testNotification(title: string, options?: NotificationOptions): Promise<void>;
}
