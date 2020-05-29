import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patente } from './patente.model';


@Injectable({
  providedIn: 'root'
})
export class PatenteService {

  baseUrl= 'http://127.0.0.1:3333/patente'

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  mostrarMensagem(msg: string) : void {
    this.snackBar.open(msg,'x',{
      duration:3000, // 3 segundos 
      horizontalPosition:"right",
      verticalPosition:"top"
    })
  }

  nova(patente: Patente): Observable<Patente>{
     return this.http.post<Patente>(this.baseUrl+'/nova', patente)
  }
  
  listar(): Observable<Patente[]>{
    return this.http.get<Patente[]>(this.baseUrl);
  }

}
