import { Component, OnInit } from '@angular/core';
import { RuaService } from '../rua.service';

@Component({
  selector: 'app-listar-endereco',
  templateUrl: './listar-endereco.component.html',
  styleUrls: ['./listar-endereco.component.css']
})
export class ListarEnderecoComponent implements OnInit {

  constructor(private enderecoService:RuaService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.enderecoService.listarEndereco().subscribe(resp => {
       console.log('Dados: ',resp)
    });
  }

}
