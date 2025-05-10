import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ObjectiveService } from '../../services/objective.service'; // Importa el servicio

@Component({
  selector: 'app-set-objectives-1',
  templateUrl: './set-objectives-1.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./set-objectives-1.component.css']
})
export class SetObjectives1Component {
  constructor(private router: Router, private objectiveService: ObjectiveService) {} // Inyecta el servicio

  selectGoal(goal: string) {
    console.log('Objetivo seleccionado:', goal);
    this.objectiveService.setMainGoal(goal).subscribe( // Llama al método del servicio
      () => {
        this.router.navigate(['/set-objectives-2']);
      },
      (error) => {
        console.error('Error al guardar el objetivo principal', error);
        // Manejar el error (mostrar mensaje al usuario, etc.)
      }
    );
  }
}
