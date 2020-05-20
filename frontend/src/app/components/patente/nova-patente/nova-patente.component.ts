import { Component, OnInit } from '@angular/core';
import { PatenteService } from '../patente.service';
import { Router } from '@angular/router';
import { Patente } from '../patente.model';
import { Guid } from "guid-typescript";
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
@Component({
  selector: 'app-nova-patente',
  templateUrl: './nova-patente.component.html',
  styleUrls: ['./nova-patente.component.css']
})
export class NovaPatenteComponent implements OnInit {
  angForm: FormGroup;  
  constructor(private patenteService: PatenteService, private router: Router, private fb: FormBuilder) { 
    this.createForm();
  }
 
    patente: Patente = {
      id: Guid.create(), 
      designacao: ''
    }

   novaPatente() : void{
   /* this.patenteService.nova(this.patente).subscribe(() => {
      this.patenteService.nova(this.patente)
    this.patenteService.mostrarMensagem("Patente registada com sucesso!");
    })*/
   }
   
   createForm() {
    this.angForm = this.fb.group({
       designacao: ['', Validators.required ]
    });
  }

   cancelar() : void {
    this.router.navigate(['/patente'])
   }


  ngOnInit(): void {
    
    
  }

}
