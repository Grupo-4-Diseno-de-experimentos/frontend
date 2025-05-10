import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ObjectiveService } from '../../services/objective.service'; // Importa el servicio

@Component({
  selector: 'app-set-objectives-5',
  templateUrl: './set-objectives-5.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./set-objectives-5.component.css']
})
export class SetObjectives5Component {
  constructor(private router: Router, private objectiveService: ObjectiveService) {} // Inyecta el servicio

  selectDiet(diet: string) {
    console.log('Dieta seleccionada:', diet);
    this.objectiveService.setPreferredDiet(diet).subscribe( // Llama al método del servicio
      () => {
        this.router.navigate(['/user-profile/profile']); // Redirige al perfil al finalizar
      },
      (error) => {
        console.error('Error al guardar la dieta preferida', error);
        // Manejar el error
      }
    );
  }
}
