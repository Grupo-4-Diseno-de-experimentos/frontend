import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any = null;

  constructor() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  setUser(user: any): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    return this.user;
  }

  getUserId(): number {
    return this.user?.id;
  }

  getUserRole(): string {
    return this.user?.role;
  }

  isNutricionist(): boolean {
    return this.getUserRole() === 'nutricionist';
  }

  isUser(): boolean {
    return this.getUserRole() === 'user';
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }
}
