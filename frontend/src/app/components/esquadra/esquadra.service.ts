import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Esquadra } from './esquadra.model';
import { Observable } from 'rxjs';
import uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class EsquadraService {

  baseUrl = 'http://127.0.0.1:3333/esquadra';
  
  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  mostrarMensagem(msg: string) : void {
    this.snackBar.open(msg,'x', {
      duration:3000, //3 segundos
      horizontalPosition:"right",
      verticalPosition:"top"
    })
  }


  nova(esquadra: Esquadra) : Observable<Esquadra> {
    let url = this.baseUrl + '/nova';
    return this.http.post<Esquadra>(url, esquadra);
  }

  listar():Observable<object[]> {
    return this.http.get<object[]>(this.baseUrl);
  }

  carregarTodas():Observable<Esquadra[]> {
    let url = this.baseUrl+'/listar';
    return this.http.get<Esquadra[]>(url);
  }
  
  editarDados(id: uuid) : Observable<Esquadra> {
    let parametros = new HttpParams();
    parametros = parametros.append('id',id);
    let url = this.baseUrl+'/editarDados';
    return this.http.get<Esquadra>(url, {params: parametros});
  }
 
  actualizar(esquadra: Esquadra) : Observable<Esquadra> {
    let url = this.baseUrl + '/actualizar';
    return this.http.patch<Esquadra>(url, esquadra);
  }

  apagarRegisto(id: uuid): Observable<Esquadra> {
    let url = this.baseUrl + '/apagar';
    let parametros = new HttpParams();
    parametros = parametros.append('esquadra_id', id);
    return this.http.delete<Esquadra>(url ,{params: parametros});
  }

}
