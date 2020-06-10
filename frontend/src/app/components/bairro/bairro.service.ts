import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Bairro } from './bairro.model';
import { Observable } from 'rxjs';
import uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class BairroService {

  baseUrl = 'http://127.0.0.1:3333/bairro';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }
  
  mostrarMensagem(msg: string) : void {
    this.snackBar.open(msg,'x',{
      duration:3000, // 3 segundos 
      horizontalPosition:"right",
      verticalPosition:"top"
    })
  }

  novo(bairro: Bairro): Observable<Bairro>{
     return this.http.post<Bairro>(this.baseUrl+'/novo', bairro)
  } 
  
  listar(municipio_id: uuid): Observable<Bairro[]> {
    let parametros = new HttpParams();
    parametros = parametros.append('municipio_id', municipio_id);
    return this.http.get<Bairro[]>(this.baseUrl, {params:parametros});

  }

}
