import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ObjectiveService } from '../../services/objective.service'; // Importa el servicio

@Component({
  selector: 'app-set-objectives-4',
  templateUrl: './set-objectives-4.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./set-objectives-4.component.css']
})
export class SetObjectives4Component {
  constructor(private router: Router, private objectiveService: ObjectiveService) {} // Inyecta el servicio

  selectActivityLevel(level: string) {
    console.log('Nivel de actividad seleccionado:', level);
    this.objectiveService.setPhysicalActivityLevel(level).subscribe( // Llama al método del servicio
      () => {
        this.router.navigate(['/set-objectives-5']);
      },
      (error) => {
        console.error('Error al guardar el nivel de actividad', error);
        // Manejar el error
      }
    );
  }
}
