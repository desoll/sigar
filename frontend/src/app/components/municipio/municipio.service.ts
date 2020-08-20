import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Municipio } from './municipio.model';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  baseUrl = 'http://127.0.0.1:3333/municipio';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  mostrarMensagem(msg: string) : void {
    this.snackBar.open(msg,'x',{
      duration:3000, // 3 segundos 
      horizontalPosition:"right",
      verticalPosition:"top"
    })
  }

  novo(municipio: Municipio): Observable<Municipio>{
    return this.http.post<Municipio>(this.baseUrl+'/novo', municipio);
  }


  listar(provincia_id: uuid): Observable<Municipio[]> {  
  let params = new HttpParams();
  params = params.append('provincia_id', provincia_id);
    return this.http.get<Municipio[]>(this.baseUrl, {params:params});
  }
}
