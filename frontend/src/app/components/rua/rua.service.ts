import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rua } from './rua.model';
import uuid from 'uuid';

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

  nova(rua: Rua): Observable<Rua>{
    let url = this.baseUrl +'/nova';
    return this.http.post<Rua>(url, rua)
  }
 
  listarEndereco(): Observable<object[]> {   
      return this.http.get<object[]>(this.baseUrl+'/enderecos');
  }
  
  listarPorId(id: uuid): Observable<Rua> {

    let parametros = new HttpParams();
    parametros = parametros.append('id', id);
    return this.http.get<Rua>(this.baseUrl ,{params: parametros});
  }

  listarPorBairro(bairro_id: uuid): Observable<Rua[]> {  
    let params = new HttpParams();
    params = params.append('bairro_id', bairro_id);
      return this.http.get<Rua[]>(this.baseUrl+'/listarPorBairro', {params:params});
    }

  actualizar(rua: Rua): Observable<Rua> {
    let url = this.baseUrl +'/actualizar';
    return this.http.patch<Rua>(url, rua);
  }

  apagarRegisto(id: uuid): Observable<Rua> {
    let url = this.baseUrl +'/apagar';
    let parametros = new HttpParams();
    parametros = parametros.append('rua_id', id);
    return this.http.delete<Rua>(url ,{params: parametros});
  }

}
