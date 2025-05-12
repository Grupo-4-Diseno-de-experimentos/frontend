import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { User } from '../../../meal-plan/model/meal-plan.entity';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  standalone: true,
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  constructor(private router: Router, private authService: AuthService) { }

  onSubmit(formData: any) {
    console.log('Datos de registro:', formData);

    const user: User = {
      id: 0,
      name: formData.firstName, // Asegúrate de que el nombre del campo coincida con tu formulario
      lastName: formData.lastName, // Asegúrate de que el nombre del campo coincida con tu formulario
      email: formData.email,
      password: formData.password,
      role: 'USER',
      created_at: new Date().toISOString()
    };
    this.authService.create(user).subscribe({
      next: () => {
        console.log('Usuario registrado');
        this.router.navigate(['/set-objectives']); // Redirige a la pantalla de objetivos
      },
      error: (err) => {
        console.error('Error al registrar un usuario', err);
      }
    });
  }
}
