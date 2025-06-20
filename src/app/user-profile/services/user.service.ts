import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface UserData {
  nombre?: string;
  email?: string;
  sexo?: string;
  edad?: number;
  altura?: number;
  peso?: number;
  role?: string;
  // ... otros datos del usuario
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userId: number = 1;

  currentUser: UserData = {
    nombre: 'Daniel Rodrigo Chirinos Arevalo',
    email: 'Daniel-741@hotmail.com',
    sexo: 'Hombre',
    edad: 30,
    altura: 175,
    role: 'nutritionist',
    peso: 70
  };

  constructor() { }

  getCurrentUser(): Observable<UserData> {
    return of(this.currentUser);
  }

  setUserId(id:number): void{
    this.userId = id;
  }

  setRole(role: 'client' | 'nutritionist'): void {
    this.currentUser.role = role;
  }

  getUserId(): number {
    return this.userId;
  }
  isNutricionist(): boolean {
    return this.currentUser.role === 'nutritionist';
  }

  updateUserProfile(userData: Partial<UserData>): Observable<void> {
    this.currentUser = { ...this.currentUser, ...userData };
    console.log('Perfil actualizado:', this.currentUser);
    return of(void 0); // Devuelve un Observable que se completa
  }
}
