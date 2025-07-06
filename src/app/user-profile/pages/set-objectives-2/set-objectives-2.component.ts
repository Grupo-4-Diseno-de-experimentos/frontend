import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ObjectiveService } from '../../services/objective.service'; // Importa el servicio

@Component({
  selector: 'app-set-objectives-2',
  templateUrl: './set-objectives-2.component.html',
  imports: [
    RouterLink
  ],
  standalone: true,
  styleUrls: ['./set-objectives-2.component.css']
})
export class SetObjectives2Component {
  constructor(private router: Router, private objectiveService: ObjectiveService) {}

  selectMethod(method: string) {
    let backendMethod = '';
    switch (method) {
      case 'plan-nutricional':
        backendMethod = 'PLAN_NUTRICIONAL';
        break;
      case 'contar-calorias':
        backendMethod = 'CONTAR_CALORIAS';
        break;
      default:
        backendMethod = 'PLAN_NUTRICIONAL';
    }

    console.log('Método seleccionado (backend):', backendMethod);

    // Guardar en memoria usando ObjectiveService
    this.objectiveService.setPreferredMethod(backendMethod).subscribe(
      () => {
        this.router.navigate(['/set-objectives-3']);
      },
      (error) => {
        console.error('Error al guardar el método preferido', error);
      }
    );
  }
}
