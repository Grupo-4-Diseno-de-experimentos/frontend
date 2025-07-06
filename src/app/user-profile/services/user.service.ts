import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, switchMap, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { Customer, User } from '../../meal-plan/model/meal-plan.entity';

export interface UserData {
  id?: number;
  _id?: number;
  nombre?: string;
  email?: string;
  sexo?: string;
  edad?: number;
  altura?: number;
  peso?: number;
  role?: string;
  name?: string;
  lastname?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.apiUrl}/users`;

  private extendedDataSubject = new BehaviorSubject<UserData | null>(null);

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    const saved = localStorage.getItem('extendedUserData');
    if (saved) {
      this.extendedDataSubject.next(JSON.parse(saved));
    }

    console.log('[UserService][constructor] authService.userValue:', this.authService.userValue);
  }

  /**
   * Método combinado para traer datos de User y Customer
   */
  getFullUserData(): Observable<UserData> {
    const currentUser = this.authService.userValue;
    if (!currentUser) {
      throw new Error('Usuario no autenticado o sin ID');
    }

    const userObj = (currentUser as any).user ?? currentUser;
    const userId = userObj.id ?? userObj._id;
    if (!userId) {
      throw new Error('Usuario no autenticado o sin ID');
    }

    // Llamamos a /users/{id}
    return this.http.get<UserData>(`${this.baseUrl}/${userId}`).pipe(
      switchMap((user) =>
        // Luego llamamos a /customer/{id} y combinamos
        this.http.get<any>(`${environment.apiUrl}/customer/${userId}`).pipe(
          map((customer) => ({
            id: user.id,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            role: user.role,
            sexo: customer.sexo,
            edad: customer.edad,
            altura: customer.altura,
            peso: customer.peso
          }))
        )
      ),
      tap((fullData) => {
        this.extendedDataSubject.next(fullData);
        localStorage.setItem('extendedUserData', JSON.stringify(fullData));
      })
    );
  }

  /**
   * Actualizar perfil extendido
   */
  updateUserProfile(userData: Partial<UserData>): Observable<Customer> {
    const currentUser = this.authService.userValue;
    if (!currentUser) {
      throw new Error('Usuario no autenticado o sin ID');
    }

    const userObj = (currentUser as any).user ?? currentUser;
    const userId = userObj.id ?? userObj._id;
    if (!userId) {
      throw new Error('Usuario no autenticado o sin ID');
    }

    return this.http.post<Customer>(`${environment.apiUrl}/customer/${userId}`, userData);
  }

  /**
   * Observable para datos extendidos
   */
  getExtendedData(): Observable<UserData | null> {
    return this.extendedDataSubject.asObservable();
  }

  isNutritionist(): boolean {
    const currentUser = this.authService.userValue;

    // Si tu backend devuelve anidado, usa:
    const userObj = (currentUser as any).user ?? currentUser;
    console.log('[UserService][isNutritionist] currentUser:', currentUser);
    console.log('[UserService][isNutritionist] userObj:', userObj);

    return userObj?.role?.toUpperCase() === 'NUTRICIONIST';
  }

  getUserId(): number {
    const currentUser = this.authService.userValue;
    if (!currentUser) {
      throw new Error('Usuario no autenticado o sin ID');
    }

    const userObj = (currentUser as any).user ?? currentUser;
    const userId = userObj.id ?? userObj._id;
    if (!userId) {
      throw new Error('Usuario no autenticado o sin ID');
    }

    return userId;
  }
}
