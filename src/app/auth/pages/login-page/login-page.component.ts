import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import {AuthService} from '../../services/auth.service';

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
    this.authService.login(formData).subscribe({
      next: (response:any) => {
        console.log('Login exitoso: ', response);
        this.router.navigate(['/']);
      },
      error: (err) =>{
        console.error('Error en login', err);
        this.errorMessage = 'Correo o contraseña incorrectos'
      }
    })

  }
}
