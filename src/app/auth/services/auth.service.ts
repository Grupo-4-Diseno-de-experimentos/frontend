import { Injectable } from '@angular/core';
import { BaseService } from '../../public/components/base-service/base.service';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../meal-plan/model/meal-plan.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<User> {
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/users`);
    this.resourceEndpoint = '';
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.userSubject.next(JSON.parse(savedUser));
    }
  }

  login(credentials: { email: string; password: string }) {
    const loginUrl = `${environment.apiUrl}/users/login`;
    return this.http.post<{ user: User }>(loginUrl, credentials).pipe(
      tap(response => {
        this.setUser(response.user);
      })
    );
  }

  register(data: any) {
    // ✅ Usar endpoint correcto
    const registerUrl = `${environment.apiUrl}/users`;

    // ✅ Limpiar antes de registrar
    this.logout();

    return this.http.post<User>(registerUrl, data).pipe(
      tap(user => {
        this.setUser(user);
      })
    );
  }

  get currentUser() {
    return this.userSubject.asObservable();
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }

  public setUser(user: User): void {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }
}
