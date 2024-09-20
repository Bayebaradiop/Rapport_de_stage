import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environnement } from '../../environnements/environnement';
import { Observable, throwError } from 'rxjs';
import { AuthResponse, UserData } from '../model/auth-reponse.module';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  redirectUrl: string='/login';
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

  

  registration(request: any):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(
      `${environnement.ApiUrl}/SingIn`,
      request
    );
  }

  AjoutAgent(request: any):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(
      `${environnement.ApiUrl}/AjoutAgent`,
      request
    );
  }
  DetailleAgent(id:number):Observable<AuthResponse>{
    return this.http.get<AuthResponse>(
      `${environnement.ApiUrl}/getAgentByAgent/id=`+id
    );
  }

  getAllAgents(): Observable<UserData[]> {
    return this.http.get<UserData[]>(
      `${environnement.ApiUrl}/getAllAgent`,
    );
}

  UpdateAgent(request:any):Observable<AuthResponse>{
    return this.http.put<AuthResponse>(
      `${environnement.ApiUrl}/updateAgent/`+request.id,request
    );
  }

  ArchiverAgent(id:any):Observable<AuthResponse>{
    return this.http.put<AuthResponse>(
      `${environnement.ApiUrl}/ArchiverAgent/`+id,{}
    );
  }

}
