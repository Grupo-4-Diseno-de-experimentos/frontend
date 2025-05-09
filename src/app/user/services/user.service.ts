import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private mockUser = {
    id: 1,
    role: 'nutricionist',
    name: 'Jorge',
  };

  constructor() {}

  getUser() {
    return this.mockUser;
  }

  getUserId(): number {
    return this.mockUser.id;
  }

  getUserRole(): string {
    return this.mockUser.role;
  }

  isNutricionist(): boolean {
    return this.mockUser.role === 'nutricionist';
  }

  isCustomer(): boolean {
    return this.mockUser.role === 'customer';
  }
}
