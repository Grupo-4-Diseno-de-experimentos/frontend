import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData, UserService } from '../../services/user.service';
import { ObjectiveService } from '../../services/objective.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CustomerService} from '../../services/customer.service';

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
  isEditingObjectives: boolean = false;
  editedObjectives: UserObjectives = {};

  constructor(
    private router: Router,
    private userService: UserService,
    private objectiveService: ObjectiveService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadUserObjectives();
  }

  loadUserData(): void {
    this.userService.getFullUserData().subscribe(
      (data) => {
        this.userData = data;
        this.editedUserData = { ...data };

        if (this.userData && this.userData.id) {
          this.loadCustomerObjectives(this.userData.id);
        }
      },
      (error) => {
        console.error('Error al cargar la información del usuario', error);
      }
    );
  }

  loadUserObjectives(): void {
    this.objectiveService.getUserObjectives().subscribe(
      (data) => {
        console.log('🎯 Datos RAW desde backend:', data);
        this.userObjectives = this.normalizeObjectives(data);
        console.log('🎯 userObjectives normalizado:', this.userObjectives);
      },
      (error) => {
        console.error('Error al cargar los objetivos', error);
      }
    );
  }
  loadCustomerObjectives(userId: number): void {
    this.customerService.getCustomer(userId).subscribe(
      (data) => {
        console.log('🎯 Datos desde backend (customer):', data);
        this.userObjectives = this.normalizeObjectives(data);
      },
      (error) => {
        console.error('Error al cargar los objetivos del cliente', error);
      }
    );
  }

  normalizeObjectives(raw: any): UserObjectives {
    const normalized: UserObjectives = {};

    if (raw.goal) {
      normalized.objetivoPrincipal = raw.goal.toLowerCase();
    }
    if (raw.method) {
      normalized.metodoPreferido = raw.method.toLowerCase();
    }
    if (raw.activityLevel) {
      normalized.nivelActividad = raw.activityLevel.toLowerCase();
    }
    if (raw.dietType) {
      normalized.dietaPreferida = raw.dietType.toLowerCase();
    }

    return normalized;
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
        console.log('Perfil actualizado');
        this.loadUserData();
        this.closeEditProfileModal();
      },
      (error) => {
        console.error('Error al actualizar perfil', error);
      }
    );
  }

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
          case 'perder_grasa':
            return 'Perder Grasa';
          case 'ganar_musculo':
            return 'Ganar Músculo';
          case 'mantener_peso':
            return 'Mantener Peso';
          default:
            return value;
        }
      case 'metodoPreferido':
        switch (value) {
          case 'plan_nutricional':
            return 'Necesito un plan nutricional';
          case 'contar_calorias':
            return 'Necesito contar mis calorías';
          default:
            return value;
        }
      case 'nivelActividad':
        switch (value) {
          case 'sedentario':
            return 'Sedentario';
          case 'ligeramente_activo':
            return 'Ligeramente Activo';
          case 'moderadamente_activo':
            return 'Moderadamente Activo';
          case 'muy_activo':
            return 'Muy Activo';
          case 'atleta_profesional':
            return 'Atleta Profesional';
          default:
            return value;
        }
      case 'dietaPreferida':
        switch (value) {
          case 'recomendada':
            return 'Recomendada';
          case 'alta_proteinas':
            return 'Alta en Proteínas';
          case 'baja_carbohidratos':
            return 'Baja en Carbohidratos';
          case 'keto':
            return 'Keto';
          case 'baja_grasas':
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

  navigateToStartObjectives(): void {
    this.router.navigate(['/start-objectives']);
  }
}
