import {Component, OnInit} from '@angular/core';
import {LayoutComponent} from './public/components/layout/layout.component';
import {RouterOutlet} from '@angular/router';
import {NotificationBellComponent} from './shared/components/notification-bell/notification-bell.component';
import {NotificationService} from './shared/services/notification.service';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent, RouterOutlet, NotificationBellComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'app-frontend';
  private mensajes = [
    '¿Sabías que puedes personalizar tus objetivos de salud en tu perfil?',
    '¡Activa el plan Premium y accede a recetas exclusivas!',
    'Recuerda beber agua, tu cuerpo lo agradecerá.',
    'Aprovecha el día para caminar al menos 30 minutos.',
    '¿Ya revisaste tu plan de comidas de hoy?',
    'Duerme bien para mejorar tu rendimiento y recuperación.'
  ];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.programarNotificacionAleatoria();
  }

  private programarNotificacionAleatoria() {
    const delay = this.obtenerTiempoAleatorio(15000, 45000);
    setTimeout(() => {
      const mensajeAleatorio = this.obtenerMensajeAleatorio();
      this.notificationService.add(mensajeAleatorio);
      this.programarNotificacionAleatoria();
    }, delay);
  }

  private obtenerMensajeAleatorio(): string {
    const index = Math.floor(Math.random() * this.mensajes.length);
    return this.mensajes[index];
  }

  private obtenerTiempoAleatorio(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
