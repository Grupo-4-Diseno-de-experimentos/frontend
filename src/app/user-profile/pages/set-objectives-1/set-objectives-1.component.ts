import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ObjectiveService } from '../../services/objective.service'; // Aquí sí se usa para guardar en memoria

@Component({
  selector: 'app-set-objectives-1',
  templateUrl: './set-objectives-1.component.html',
  imports: [
    RouterLink
  ],
  standalone: true,
  styleUrls: ['./set-objectives-1.component.css']
})
export class SetObjectives1Component {
  constructor(private router: Router, private objectiveService: ObjectiveService) {}

  selectGoal(goal: string) {
    let backendGoal = '';
    switch (goal) {
      case 'perder-grasa':
        backendGoal = 'PERDER_GRASA';
        break;
      case 'ganar-musculo':
        backendGoal = 'GANAR_MUSCULO';
        break;
      case 'mantener-peso':
        backendGoal = 'MANTENER_PESO';
        break;
      default:
        backendGoal = 'PERDER_GRASA';
    }

    console.log('Objetivo seleccionado (backend):', backendGoal);

    this.objectiveService.setMainGoal(backendGoal).subscribe(
      () => {
        // Luego de guardar, navegar al siguiente paso
        this.router.navigate(['/set-objectives-2']);
      },
      (error) => {
        console.error('Error al guardar el objetivo principal', error);
      }
    );
  }
}
