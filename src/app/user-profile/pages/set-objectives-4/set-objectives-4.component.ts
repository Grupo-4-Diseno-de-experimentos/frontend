import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ObjectiveService } from '../../services/objective.service';

@Component({
  selector: 'app-set-objectives-4',
  templateUrl: './set-objectives-4.component.html',
  imports: [
    RouterLink
  ],
  standalone: true,
  styleUrls: ['./set-objectives-4.component.css']
})
export class SetObjectives4Component {
  constructor(private router: Router, private objectiveService: ObjectiveService) {}

  selectActivityLevel(level: string) {
    // Convertir a formato backend
    let backendLevel = '';
    switch (level) {
      case 'sedentario':
        backendLevel = 'SEDENTARIO';
        break;
      case 'ligeramente-activo':
        backendLevel = 'LIGERAMENTE_ACTIVO';
        break;
      case 'moderadamente-activo':
        backendLevel = 'MODERADAMENTE_ACTIVO';
        break;
      case 'muy-activo':
        backendLevel = 'MUY_ACTIVO';
        break;
      case 'atleta-profesional':
        backendLevel = 'ATLETA_PROFESIONAL';
        break;
      default:
        backendLevel = 'SEDENTARIO';
    }

    console.log('Nivel de actividad seleccionado (backend):', backendLevel);

    this.objectiveService.setPhysicalActivityLevel(backendLevel).subscribe(
      () => {
        this.router.navigate(['/set-objectives-5']);
      },
      (error) => {
        console.error('Error al guardar el nivel de actividad', error);
      }
    );
  }
}
