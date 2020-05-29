import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provincia } from './provincia.model';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {
  baseUrl = 'http://127.0.0.1:3333/provincia'
  constructor(private snackBar: MatSnackBar, private http:HttpClient) { }

  mostrarMensagem(msg: string) : void {
    this.snackBar.open(msg,'x',{
      duration:3000, // 3 segundos 
      horizontalPosition:"right",
      verticalPosition:"top"
    })
  }

  nova(provincia: Provincia): Observable<Provincia>{
       return this.http.post<Provincia>(this.baseUrl+'/nova',provincia)
  }

}
