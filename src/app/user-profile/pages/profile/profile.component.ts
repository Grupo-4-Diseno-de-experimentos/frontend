import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ObjectiveService } from '../../services/objective.service';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // Importa FormsModule


interface UserData {
  nombre?: string;
  email?: string;
  sexo?: string;
  edad?: number;
  altura?: number;
  peso?: number;
}

interface UserObjectives {
  objetivoPrincipal?: string;
  metodoPreferido?: string;
  nivelActividad?: string;
  dietaPreferida?: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [NgIf, FormsModule],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: UserData | null = null;
  userObjectives: UserObjectives | null = null;
  isEditingProfile: boolean = false;
  editedUserData: UserData = {};

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
        this.editedUserData = { ...data };
      },
      (error) => {
        console.error('Error al cargar la información del usuario', error);
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
      }
    );
  }

  openEditProfileModal(): void {
    this.isEditingProfile = true;
  }

  closeEditProfileModal(): void {
    this.isEditingProfile = false;
    this.editedUserData = { ...this.userData! };
  }

  saveProfileChanges(): void {
    this.userService.updateUserProfile(this.editedUserData).subscribe(
      () => {
        console.log('Perfil actualizado con éxito');
        this.loadUserData();
        this.closeEditProfileModal();
      },
      (error) => {
        console.error('Error al actualizar el perfil', error);

      }
    );
  }

  navigateToStartObjectives(): void {
    this.router.navigate(['/start-objectives']);
  }



  isEditingObjectives: boolean = false;
  editedObjectives: UserObjectives = {};

  openEditObjectivesModal(): void {
    this.isEditingObjectives = true;
    this.editedObjectives = { ...this.userObjectives! };
  }

  closeEditObjectivesModal(): void {
    this.isEditingObjectives = false;
    this.editedObjectives = { ...this.userObjectives! };
  }

  saveObjectiveChanges(): void {
    console.log('Valores de editedObjectives antes de guardar:', this.editedObjectives);
    this.objectiveService.updateUserObjectives(this.editedObjectives).subscribe(
      () => {
        console.log('Objetivos actualizados con éxito');
        this.loadUserObjectives();
        this.closeEditObjectivesModal();
      },
      (error) => {
        console.error('Error al actualizar los objetivos', error);
      }
    );
  }

  getDisplayValue(key: string, value: string | undefined): string {
    if (!value) {
      return 'No especificado';
    }

    switch (key) {
      case 'objetivoPrincipal':
        switch (value) {
          case 'perder-grasa':
            return 'Perder Grasa';
          case 'ganar-musculo':
            return 'Ganar Músculo';
          case 'mantener-peso':
            return 'Mantener Peso';
          default:
            return value;
        }
      case 'metodoPreferido':
        switch (value) {
          case 'plan-nutricional':
            return 'Necesito un plan nutricional';
          case 'contar-calorias':
            return 'Necesito contar mis calorías';
          default:
            return value;
        }
      case 'nivelActividad':
        switch (value) {
          case 'sedentario':
            return 'Sedentario';
          case 'ligeramente-activo':
            return 'Ligeramente Activo';
          case 'moderadamente-activo':
            return 'Moderadamente Activo';
          case 'muy-activo':
            return 'Muy Activo';
          case 'atleta-profesional':
            return 'Atleta Profesional';
          default:
            return value;
        }
      case 'dietaPreferida':
        switch (value) {
          case 'recomendada':
            return 'Recomendada';
          case 'alta-proteinas':
            return 'Alta en Proteínas';
          case 'baja-carbohidratos':
            return 'Baja en Carbohidratos';
          case 'keto':
            return 'Keto';
          case 'baja-grasas':
            return 'Baja en Grasas';
          default:
            return value;
        }
      case 'sexo':
        switch (value) {
          case 'hombre':
            return 'Hombre';
          case 'mujer':
            return 'Mujer';
          case 'otro':
            return 'Otro';
          default:
            return value;
        }
      default:
        return value;
    }
  }

}
