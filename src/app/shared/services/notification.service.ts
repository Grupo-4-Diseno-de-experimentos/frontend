// src/app/shared/services/notification.service.ts

  import { Injectable } from '@angular/core';
  export interface Notification {
    id: number;
    message: string;
    read: boolean;
    timestamp: Date;
  }

  @Injectable({
    providedIn: 'root'
  })
  export class NotificationService {
    private notifications: Notification[] = [];
    private idCounter = 0;
    private maxNotificaciones = 5;

    getAll() {
      return this.notifications;
    }

    getUnreadCount() {
      return this.notifications.filter(n => !n.read).length;
    }

    add(message: string) {
      this.notifications.unshift({
        id: this.idCounter++,
        message,
        read: false,
        timestamp: new Date()
      });
    }

    markAsRead(id: number) {
      const notif = this.notifications.find(n => n.id === id);
      if (notif && !notif.read) {
        notif.read = true;
        setTimeout(() => this.removeReadNotifications(), 10000);
      }
    }

    markAllAsRead() {
      let anyUnread = false;
      this.notifications.forEach(n => {
        if (!n.read) {
          n.read = true;
          anyUnread = true;
        }
      });
      if (anyUnread) {
        setTimeout(() => this.removeReadNotifications(), 10000);
      }
    }

    private removeReadNotifications() {
      this.notifications = this.notifications.filter(n => !n.read);
    }
  }
