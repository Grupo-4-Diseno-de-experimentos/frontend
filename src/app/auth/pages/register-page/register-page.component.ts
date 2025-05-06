import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  constructor(private router: Router) { }

  onSubmit(formData: any) {
    console.log('Datos de registro:', formData);
    // Ahora formData contendrá firstName, lastName, email, password, confirmPassword, terms
    this.router.navigate(['/login']);
  }
}
