import { Injectable } from '@angular/core';
import {BaseService} from '../../public/components/base-service/base.service';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../../meal-plan/model/meal-plan.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends  BaseService<User>{
  private userSubject = new BehaviorSubject<any>(null);

  constructor(http: HttpClient) {
    super(http,`${environment.apiUrl}/users`)
    this.resourceEndpoint = '';
  }

  login(credentials: { email: string; password: string}){
    const login = `${environment.apiUrl}/users/login`;
    return this.http.post(login,credentials);
  }

}
