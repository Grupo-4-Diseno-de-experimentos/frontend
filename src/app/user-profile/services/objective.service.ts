import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient

interface UserObjectives {
  objetivoPrincipal?: string;
  metodoPreferido?: string;
  nivelActividad?: string;
  dietaPreferida?: string;
  // ... otros objetivos
}

@Injectable({
  providedIn: 'root'
})
export class ObjectiveService {

  userObjectives: UserObjectives = {
    objetivoPrincipal: '',
    metodoPreferido: '',
    nivelActividad: '',
    dietaPreferida: ''
  };

  constructor(private http: HttpClient) { } // Inyecta HttpClient

  setMainGoal(goal: string): Observable<void> {
    this.userObjectives.objetivoPrincipal = goal;
    console.log('Objetivo principal guardado:', this.userObjectives.objetivoPrincipal);
    return of(void 0);
  }

  setPreferredMethod(method: string): Observable<void> {
    this.userObjectives.metodoPreferido = method;
    console.log('Método preferido guardado:', this.userObjectives.metodoPreferido);
    return of(void 0);
  }

  setPhysicalActivityLevel(level: string): Observable<void> {
    this.userObjectives.nivelActividad = level;
    console.log('Nivel de actividad guardado:', this.userObjectives.nivelActividad);
    return of(void 0);
  }

  setPreferredDiet(diet: string): Observable<void> {
    this.userObjectives.dietaPreferida = diet;
    console.log('Dieta preferida guardada:', this.userObjectives.dietaPreferida);
    return of(void 0);
  }

  getUserObjectives(): Observable<UserObjectives> {
    return of(this.userObjectives);
  }

  // Simulación de la actualización en memoria
  updateUserObjectives(updatedObjectives: UserObjectives): Observable<any> {
    this.userObjectives = { ...this.userObjectives, ...updatedObjectives };
    console.log('Objetivos actualizados localmente:', this.userObjectives);
    return of({ message: 'Objetivos actualizados con éxito localmente' }); // Simula una respuesta exitosa
  }
}
