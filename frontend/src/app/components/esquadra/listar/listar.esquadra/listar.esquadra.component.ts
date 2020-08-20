import { Component, OnInit, ViewChild } from '@angular/core';
import { EsquadraService } from '../../esquadra.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApagarComponent } from 'src/app/views/dialog/apagar/apagar.component';

@Component({
  selector: 'app-listar.esquadra',
  templateUrl: './listar.esquadra.component.html',
  styleUrls: ['./listar.esquadra.component.css']
})
export class ListarEsquadraComponent implements OnInit {

  items;

  columnDefinitions = [
    { def: 'id',           label: 'Id Esquadra',  hide: true},
    { def: 'provincia_id', label: 'Id Provincia', hide: true},
    { def: 'municipio_id', label: 'Id municipio', hide: true},
    { def: 'bairro_id', label: 'Id bairro', hide: true},
    { def: 'rua_id', label: 'Id rua', hide: true},

    { def: 'esquadra' , label: 'Esquadra', hide: false},
    { def: 'provincia', label: 'Província', hide: false},
    { def: 'municipio', label: 'Municipio', hide: false},
    { def: 'bairro'   , label: 'Bairro', hide: false},
    { def: 'rua'      , label: 'Rua', hide: false},
    { def: 'accao'    , label: 'Acção', hide: false}
  ]
  dataSource;

  constructor(private esquadraService: EsquadraService, public dialog: MatDialog, private router: Router) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.listar();
  }

  getDisplayedColumns():string[] {
    return this.columnDefinitions.filter(cd=>!cd.hide).map(cd=>cd.def);
  }

  listar(){
    this.esquadraService.listar().subscribe(resp => {
    this.items = resp
    this.dataSource = new MatTableDataSource(this.items['data'])
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;
    
    });
  }

  filtrarTabela(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  apagar(id)  {
    
    let dialogRef = this.dialog.open(ApagarComponent, {
        width: '300px',
        //height:'200px'
    });
    dialogRef.componentInstance.mensagem = 'Deseja apagar a linha selecionada?';
      
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(!dialogResult){
        this.apagarRegisto(id);
      }
      else{
       
      }
    })

  }

  apagarRegisto(id)
  {
    var mensagem = '';
     if(id != null)
       this.esquadraService.apagarRegisto(id).subscribe(resp => {
          mensagem = resp['message'].sucess;
          this.router.navigate(['/esquadra']);
          this.listar();
          this.esquadraService.mostrarMensagem(mensagem);
        },
        (err) => {
           mensagem = err.error.message.error;
           this.esquadraService.mostrarMensagem(mensagem);
        });
  }

}
