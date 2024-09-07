import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environnement } from '../../environnements/environnement';
import { Observable, throwError } from 'rxjs';
import { AuthResponse } from '../model/auth-reponse.module';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }
  login(request: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environnement.ApiUrl}/login`,
      request
    );
  }

}
