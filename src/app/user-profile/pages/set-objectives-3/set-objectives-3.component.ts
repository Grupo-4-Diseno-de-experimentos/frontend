import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-set-objectives-3',
  templateUrl: './set-objectives-3.component.html',
  imports: [
    FormsModule,
    RouterLink,
    NgIf
  ],
  standalone: true,
  styleUrls: ['./set-objectives-3.component.css']
})
export class SetObjectives3Component {
  sexo: string = '';
  edad: number | null = null;
  altura: number | null = null;
  peso: number | null = null;

  constructor(private router: Router, private userService: UserService) {}

  continue() {
    if (this.sexo && this.edad !== null && this.altura !== null && this.peso !== null) {
      console.log('Información del perfil:', {
        sexo: this.sexo,
        edad: this.edad,
        altura: this.altura,
        peso: this.peso
      });

      this.userService.updateUserProfile({
        sexo: this.sexo,
        edad: this.edad,
        altura: this.altura,
        peso: this.peso
      }).subscribe(
        () => {
          this.router.navigate(['/set-objectives-4']);
        },
        (error) => {
          console.error('Error al guardar la información del perfil', error);
        }
      );
    } else {
      console.log('Por favor, completa todos los campos correctamente.');
    }
  }
}
