import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  standalone: true,
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  errorMessage: string | null = null;
  constructor(private router: Router, private authService: AuthService) { }

  onSubmit(formData: any) {
    console.log('Datos de inicio de sesión:', formData);

    this.authService.login(formData).subscribe({
      next: (response: any) => {
        console.log('Login exitoso: ', response);

        if (formData.affiliateCode) {
          console.log('Código de afiliado:', formData.affiliateCode);
          this.router.navigate(['/meal_plan']).then(() => {
            console.log('Navegación exitosa');
          });
        } else {
          this.router.navigate(['/meal_plan']).then(() => {
            console.log('Navegación exitosa');
          });
        }
      },
      error: (err) => {
        console.error('Error en login', err);
        this.errorMessage = 'Correo o contraseña incorrectos';
      }
    });
  }
}
