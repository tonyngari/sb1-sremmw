import { LocalNotifications } from '@nativescript/local-notifications';

export class NotificationService {
  async requestPermission(): Promise<boolean> {
    return await LocalNotifications.requestPermission();
  }

  async scheduleNotification(title: string, body: string, id: number = 1): Promise<void> {
    await LocalNotifications.schedule([{
      id,
      title,
      body,
      badge: 1,
      at: new Date()
    }]);
  }

  async cancelAllNotifications(): Promise<void> {
    await LocalNotifications.cancel(0);
  }
}