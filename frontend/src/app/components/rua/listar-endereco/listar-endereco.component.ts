import { Component, OnInit, ViewChild } from '@angular/core';
import { RuaService } from '../rua.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listar-endereco',
  templateUrl: './listar-endereco.component.html',
  styleUrls: ['./listar-endereco.component.css']
})
export class ListarEnderecoComponent implements OnInit {
  items;
  //displayedColumns = ['provincia_id']
  //]
  //displayedColumns =['provincia_id']
  //,'municipio_id','bairro_id','rua_id','provincia','municipio','bairro','rua']

  /*columnDefinitions = [
    { def: 'id', label: 'ID', hide: this.id.value},
    { def: 'description', label: 'Description', hide: this.description.value}
  ]*/
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

  constructor(private enderecoService:RuaService) { }

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
       console.log('Dados: ', this.dataSource)

       this.dataSource.paginator = this.paginator;
       this.dataSource.sort      = this.sort;
    });
  }

  filtrarTabela(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
