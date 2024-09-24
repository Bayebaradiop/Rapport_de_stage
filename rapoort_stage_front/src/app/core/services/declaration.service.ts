import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environnement } from '../../environnements/environnement';
import { Declaration, DeclarationResponse } from '../model/declaration.model';
import { AuthResponse } from '../model/auth-reponse.module';

@Injectable({
  providedIn: 'root'
})
export class DeclarationService {


  
  constructor(private http:HttpClient) { }


  isAuth(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // retourne true si un token est présent
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({
        'Authorization':` Bearer ${token}`
      });
    } else {
      throw new Error('Token non disponible');
    }
  }
  


  getall():Observable<Declaration[]>{
        const headers=this.getAuthHeaders();
    return this.http.get<Declaration[]>(`${environnement.ApiUrl}/declarations`, {headers,});
  }

  getallbystruc():Observable<Declaration[]>{
    const headers=this.getAuthHeaders();
    return this.http.get<Declaration[]>(`${environnement.ApiUrl}/declarationsbystruc`, {headers,});
  }

 
  
  
  addDeclaration(declaration: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${environnement.ApiUrl}/declarations`, declaration, { headers });
  }
  


  deleteDeclaration(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${environnement.ApiUrl}/declarations/${id}`, { headers });
  }

// pour changer l'etat de la declaration
  updateEtatDeclaration(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${environnement.ApiUrl}/declarations/${id}/updateEtat`, {}, { headers });
  }
  
  //perte

  ajouterDeclarationPerte(response:any):Observable<AuthResponse>{
    const headers = this.getAuthHeaders();
    return this.http.post<AuthResponse>(`${environnement.ApiUrl}/declarationPerte`, response, { headers });
  }

  getallDeclarePerte():Observable<Declaration[]>{
    const headers=this.getAuthHeaders();
    return this.http.get<Declaration[]>(`${environnement.ApiUrl}/getDeclarePerte`);
  }

  getAllPerteOnStruc():Observable<any>{
    const headers=this.getAuthHeaders();
    return this.http.get<any>(`${environnement.ApiUrl}/indexbystrucPerteDoc`,{ headers });
  }

  getPerteById(id:number):Observable<any>{
    const headers=this.getAuthHeaders();
    return this.http.get<any>(`${environnement.ApiUrl}/getDeclaration/`+id,{ headers });
  }

  updateLostDoc(request:any):Observable<any>{
    const headers=this.getAuthHeaders();
    return this.http.put<any>(`${environnement.ApiUrl}/updateLostDoc/`+request.id, request,{ headers });
  }

  updateDeclarationsFound(request:any):Observable<any>{
    const headers=this.getAuthHeaders();
    return this.http.put<any>(`${environnement.ApiUrl}/updateDeclarationDocFound/`+request.id, request,{ headers });
 
  }

  declarationByEmail():Observable<any>{
    const headers=this.getAuthHeaders();
    return this.http.get<any>(`${environnement.ApiUrl}/getDeclarByEmail`,{headers});
  }
  getpiecesimilaire():Observable<any>{
    const headers=this.getAuthHeaders();
    return this.http.get<any>(`${environnement.ApiUrl}/getpiecesimilaire`,{headers});
    
  }
}