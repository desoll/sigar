import { Component, OnInit } from '@angular/core';
import { ProvinciaService } from '../provincia.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Provincia } from '../provincia.model';

@Component({
  selector: 'app-nova-provincia',
  templateUrl: './nova-provincia.component.html',
  styleUrls: ['./nova-provincia.component.css']
})
export class NovaProvinciaComponent implements OnInit {
   form: FormGroup;

  constructor(private provinciaService: ProvinciaService, private router: Router, private fb: FormBuilder) {
     this.validarCampos();
  }
   provincia: Provincia = {
     id: '',
     designacao: ''
   }

   novaProvincia(): void {
    const data = this.form.getRawValue();
  
    var mensagem = '';
    if (this.form.valid == true)
    {
       this.provinciaService.nova(this.provincia).subscribe(resp => {
          this.provinciaService.nova(this.provincia)
          mensagem = resp['message'].sucess;
         this.provinciaService.mostrarMensagem(mensagem);
         this.router.navigate(['/provincia'])
      },
      (err)=>{
        mensagem = err.error.message.error;
        console.log('Erro: ',err)
        this.provinciaService.mostrarMensagem(mensagem);
      })
   }  
   else{
      this.provinciaService.mostrarMensagem("preenchimento de campos obrigatorio!");
   }
   }

   validarCampos() {
    this.form = this.fb.group({
       designacao: ['', Validators.required ]
    });
  }

  cancelar() : void {
    this.router.navigate(['/'])
   }

  ngOnInit(): void {
  }

}
