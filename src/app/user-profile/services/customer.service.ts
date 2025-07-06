import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface CustomerRequest {
  goal: string;
  method: string;
  sexo: string;
  edad: number;
  altura: number;
  peso: number;
  activityLevel: string;
  dietType: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  createCustomer(userId: number, customerData: CustomerRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/customer/${userId}`, customerData);
  }
}
