import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ObjectiveService } from '../../services/objective.service'; // Importa el servicio

@Component({
  selector: 'app-set-objectives-2',
  templateUrl: './set-objectives-2.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./set-objectives-2.component.css']
})
export class SetObjectives2Component {
  constructor(private router: Router, private objectiveService: ObjectiveService) {} // Inyecta el servicio

  selectMethod(method: string) {
    console.log('Método seleccionado:', method);
    this.objectiveService.setPreferredMethod(method).subscribe( // Llama al método del servicio
      () => {
        this.router.navigate(['/set-objectives-3']);
      },
      (error) => {
        console.error('Error al guardar el método preferido', error);
        // Manejar el error
      }
    );
  }
}
