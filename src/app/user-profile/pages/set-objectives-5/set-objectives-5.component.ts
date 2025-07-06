import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ObjectiveService } from '../../services/objective.service';
import { CustomerService, CustomerRequest } from '../../services/customer.service';
import { UserService, UserData } from '../../services/user.service';

@Component({
  selector: 'app-set-objectives-5',
  templateUrl: './set-objectives-5.component.html',
  imports: [RouterLink],
  standalone: true,
  styleUrls: ['./set-objectives-5.component.css']
})
export class SetObjectives5Component {
  constructor(
    private router: Router,
    private objectiveService: ObjectiveService,
    private customerService: CustomerService,
    private userService: UserService
  ) {}

  selectDiet(diet: string) {
    console.log('Dieta seleccionada:', diet);

    this.objectiveService.setPreferredDiet(diet).subscribe(() => {
      this.userService.getFullUserData().subscribe({
        next: (userData: UserData) => {
          const userObjectives = this.objectiveService.userObjectives;

          const customerRequest: CustomerRequest = {
            goal: userObjectives.objetivoPrincipal?.toUpperCase() || 'PERDER_GRASA',
            method: userObjectives.metodoPreferido?.toUpperCase() || 'PLAN_NUTRICIONAL',
            sexo: userData.sexo || 'M',
            edad: userData.edad || 25,
            altura: userData.altura || 170,
            peso: userData.peso || 70,
            activityLevel: userObjectives.nivelActividad?.toUpperCase() || 'SEDENTARIO',
            dietType: diet.toUpperCase()
          };

          console.log('Enviando datos finales:', customerRequest);

          // ✅ Usar el id que ya viene en userData
          const userId = userData.id || userData._id;
          if (!userId) {
            console.error('No se encontró el ID de usuario');
            return;
          }

          this.customerService.createCustomer(userId, customerRequest).subscribe({
            next: (response) => {
              console.log('Customer creado:', response);
              this.router.navigate(['/profile']);
            },
            error: (error) => {
              console.error('Error al crear customer:', error);
            }
          });
        },
        error: (error) => {
          console.error('Error al obtener datos completos del usuario:', error);
        }
      });
    });
  }
}
