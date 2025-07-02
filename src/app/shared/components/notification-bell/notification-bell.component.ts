import { Component } from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-notification-bell',
  imports: [
    NgClass,
    NgForOf,
    NgIf,
    DatePipe
  ],
  templateUrl: './notification-bell.component.html',
  styleUrl: './notification-bell.component.css'
})
export class NotificationBellComponent {
  isOpen = false;

  constructor(public notificationService: NotificationService) {}

  togglePanel() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) this.notificationService.markAllAsRead();
  }
}
