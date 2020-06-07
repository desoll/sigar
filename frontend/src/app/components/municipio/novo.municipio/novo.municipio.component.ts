import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ProvinciaService } from '../../provincia/provincia.service';
import { Provincia } from '../../provincia/provincia.model';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Municipio } from '../municipio.model';
import { MunicipioService } from '../municipio.service';
import { Router } from '@angular/router';
  
@Component({
  selector: 'app-novo.municipio',
  templateUrl: './novo.municipio.component.html',
  styleUrls: ['./novo.municipio.component.css']
})

export class NovoMunicipioComponent implements OnInit, AfterViewInit, OnDestroy {
 
  public provincias: Provincia[];
  public provinciaCtrl: FormControl = new FormControl();
  public ProvinciaFiltroCtrl: FormControl = new FormControl();
  public provinciasFiltradas: ReplaySubject<Provincia[]> = new ReplaySubject<Provincia[]>(1);

  @ViewChild("singleSelect", { static: true }) singleSelect: MatSelect;
  protected _onDestroy = new Subject<void>(); 
  form: FormGroup;

  constructor(private provinciaService: ProvinciaService, private fb: FormBuilder, private municipioService: MunicipioService, private router: Router) { 
    this.validarCampos();
  }

municipio: Municipio = {
  id: '',
  designacao:'',
  provincia: {}
  
}

  ngOnInit(): void {
    this.carregarProvincias();
    this.provinciaCtrl.setValue(this.provincias);


    this.ProvinciaFiltroCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
           this.filtro();
        })


  }
  
  carregarProvincias(){
      this.provinciaService.listar().subscribe(provincias =>
      {
        this.provincias = provincias
        this.provinciasFiltradas.next(this.provincias['data'].slice());
      });
  }

  ngAfterViewInit(){
    this.setInitialValue();
  }

  ngOnDestroy(){
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  
  protected setInitialValue(){
       this.provinciasFiltradas
           .pipe(take(1), takeUntil(this._onDestroy))
           .subscribe(() =>{
              this.singleSelect.compareWith = (a: Provincia, b: Provincia) => a && b && a.id === b.id;
           });
  }
 

  protected filtro(){
    if(!this.provincias['data']){
       return;
    }

    let buscar = this.ProvinciaFiltroCtrl.value;
    
    if(!buscar) {
        this.provinciasFiltradas.next(this.provincias['data'].slice());
        return;
    }
    else{
       buscar = buscar.toLowerCase();
    }
    this.provinciasFiltradas.next(
      this.provincias['data'].filter(provincia => provincia.designacao.toLowerCase().indexOf(buscar) > -1)
    );
  }

  validarCampos(){
    this.form = this.fb.group({
      designacao: ['',Validators.required]
    });
  }
  
  novoMunicipio(): void {
   const data = this.form.getRawValue();
    var mensagem = '';
    if (this.form.valid == true)
    {
      this.municipioService.novo(this.municipio).subscribe(resp => {
        mensagem = resp['message'].sucess;
        this.municipioService.mostrarMensagem(mensagem);
        this.router.navigate(['/'])
      },
      (err) => {
        mensagem = err.error.message.error;
        this.municipioService.mostrarMensagem(mensagem);
      });
    }
    else{
      this.municipioService.mostrarMensagem("preenchimento de campos obrigatorio!");
    }
    console.log('Dados municipio: ', this.municipio)
  }
  
  /*selected(event: MatSelectChange) {
   const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    console.log('dados s', selectedData)
      
}*/


}
