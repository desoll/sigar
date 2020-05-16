import { Component, OnInit } from '@angular/core';
import { PatenteService } from '../patente.service';
import { Router } from '@angular/router';
import { Patente } from '../patente.model';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-nova-patente',
  templateUrl: './nova-patente.component.html',
  styleUrls: ['./nova-patente.component.css']
})
export class NovaPatenteComponent implements OnInit {

  constructor(private patenteService: PatenteService, private router: Router) { }

    patente: Patente = {
      id: Guid.create(),
      designacao: ''
    }

   novaPatente() : void{
    this.patenteService.nova(this.patente).subscribe(() => {
      this.patenteService.nova(this.patente)
    this.patenteService.mostrarMensagem("Patente registada com sucesso!");
    })
   }
   
   cancelar() : void {
    this.router.navigate(['/patente'])
   }


  ngOnInit(): void {
  }

}
