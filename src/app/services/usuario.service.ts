import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, map } from 'rxjs';
import { Usuario } from '../auth/pages/login/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 
  constructor(
    private http: HttpClient,
  ) { }


  // getUserByUsername(username: string) {
  //   return this.http.get<Usuario>(`${environment.urlBack}usuarios/${username}`);
  // }

}
