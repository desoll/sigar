import { Component, OnInit, ViewChild } from '@angular/core';
import { RuaService } from '../rua.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ApagarComponent } from 'src/app/views/dialog/apagar/apagar.component';

@Component({
  selector: 'app-listar-endereco',
  templateUrl: './listar-endereco.component.html',
  styleUrls: ['./listar-endereco.component.css']
})

export class ListarEnderecoComponent implements OnInit {
  items;

  columnDefinitions = [
    { def: 'provincia_id', label: 'Id Provincia', hide: true},
    { def: 'municipio_id', label: 'Id municipio', hide: true},
    { def: 'bairro_id', label: 'Id bairro', hide: true},
    { def: 'rua_id', label: 'Id rua', hide: true},

    { def: 'provincia', label: 'Província', hide: false},
    { def: 'municipio', label: 'Municipio', hide: false},
    { def: 'bairro', label: 'Bairro', hide: false},
    { def: 'rua', label: 'Rua', hide: false},
    { def: 'accao', label: 'Acção', hide: false}
  ]
  dataSource;

  constructor(private enderecoService:RuaService, public dialog: MatDialog) { }

     @ViewChild(MatPaginator) paginator: MatPaginator;
     @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.listar();
  }

  getDisplayedColumns():string[] {
    return this.columnDefinitions.filter(cd=>!cd.hide).map(cd=>cd.def);
}

  listar(){
    this.enderecoService.listarEndereco().subscribe(resp => {
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

  abrirDialog() : void {
    let dialogRef = this.dialog.open(ApagarComponent, {
        width: '300px',
        //height:'200px'
    });
    dialogRef.componentInstance.mensagem = 'Deseja apagar a linha selecionada?';
      
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(!dialogResult){
        console.log('Apagar')
      }
      else{
        console.log('N apaga.')
      }
    })

  }

}
