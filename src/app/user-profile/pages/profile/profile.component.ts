import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ObjectiveService } from '../../services/objective.service';
import {NgIf} from '@angular/common';

interface UserData {
  nombre?: string;
  email?: string;
  sexo?: string;
  edad?: number;
  altura?: number;
  peso?: number;
  // ... otros datos del usuario
}

interface UserObjectives {
  objetivoPrincipal?: string;
  metodoPreferido?: string;
  nivelActividad?: string;
  dietaPreferida?: string;
  // ... otros objetivos
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: UserData | null = null;
  userObjectives: UserObjectives | null = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private objectiveService: ObjectiveService
  ) { }

  ngOnInit(): void {
    this.loadUserData();
    this.loadUserObjectives();
  }

  loadUserData(): void {
    this.userService.getCurrentUser().subscribe(
      (data) => {
        this.userData = data;
      },
      (error) => {
        console.error('Error al cargar la información del usuario', error);
        // Manejar el error
      }
    );
  }

  loadUserObjectives(): void {
    this.objectiveService.getUserObjectives().subscribe(
      (data) => {
        this.userObjectives = data;
      },
      (error) => {
        console.error('Error al cargar los objetivos del usuario', error);
        // Manejar el error
      }
    );
  }

  editProfile(): void {
    this.router.navigate(['/user-profile/edit-profile']); // Asegúrate de tener esta ruta definida
  }

  editObjectives(): void {
    this.router.navigate(['/user-profile/edit-objectives']); // Asegúrate de tener esta ruta definida
  }
}
