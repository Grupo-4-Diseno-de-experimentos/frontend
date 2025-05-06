import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentRole: 'client' | 'nutritionist' = 'client';

}
