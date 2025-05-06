import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(private router: Router) { }

  onSubmit(formData: any) {
    console.log('Datos de inicio de sesión:', formData);

    this.router.navigate(['/']);
  }
}
