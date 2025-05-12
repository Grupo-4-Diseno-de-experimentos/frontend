import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface UserData {
  nombre?: string;
  email?: string;
  sexo?: string;
  edad?: number;
  altura?: number;
  peso?: number;
  // ... otros datos del usuario
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: UserData = {
    nombre: 'Usuario Ejemplo',
    email: 'usuario@ejemplo.com',
    sexo: 'Hombre',
    edad: 30,
    altura: 175,
    peso: 70
  };

  constructor() { }

  getCurrentUser(): Observable<UserData> {
    return of(this.currentUser);
  }

  updateUserProfile(userData: Partial<UserData>): Observable<void> {
    this.currentUser = { ...this.currentUser, ...userData };
    console.log('Perfil actualizado:', this.currentUser);
    return of(void 0); // Devuelve un Observable que se completa
  }
}
