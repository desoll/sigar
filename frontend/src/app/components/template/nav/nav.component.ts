import { Component, OnInit, ViewChild } from '@angular/core';
//import { MatMenuTrigger } from '@angular/material/menu';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 animate_utilizador = false;
 animate_endereco = false;
 animate_esquadra = false;
 
  constructor() { }
  
  ngOnInit(): void {
    //this.toggleAnimate();
  }

   toggleUsuario() {
    this.animate_utilizador = !this.animate_utilizador;
  }

  toggleEndereco() {
    this.animate_endereco = !this.animate_endereco;
  }

  toggleEsquadra() {
    this.animate_esquadra = !this.animate_esquadra;
  }

  desabilitarUsuario(){
    this.animate_utilizador = false;
  }
  desabilitarEndereco(){
    this.animate_endereco = false;
  }
  desabilitarEsquadra(){
    this.animate_esquadra = false;
  }

}
