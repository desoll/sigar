import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rua } from './rua.model';

@Injectable({
  providedIn: 'root'
})
export class RuaService {
  
  baseUrl = 'http://127.0.0.1:3333/rua';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }
  
  mostrarMensagem(msg: string) : void {
    this.snackBar.open(msg,'x',{
      duration:3000, // 3 segundos 
      horizontalPosition:"right",
      verticalPosition:"top"
    })
  }

  nova(rua:Rua): Observable<Rua>{
    return this.http.post<Rua>(this.baseUrl+'/nova', rua)
  }
 
  listarEndereco(): Observable<object[]> {   
      return this.http.get<object[]>(this.baseUrl+'/enderecos');
  }

}
