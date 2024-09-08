import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environnement } from '../../environnements/environnement';
import { Observable, throwError } from 'rxjs';
import { AuthResponse } from '../model/auth-reponse.module';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  redirctUrl: string='/login';
  isAuth (): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }
  constructor(private http: HttpClient) { }

  login(request: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environnement.ApiUrl}/login`,
      request
    );
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(
      `${environnement.ApiUrl}/logout`,
      {},
      { headers }
    );
  }
}
