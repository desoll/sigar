import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { Provincia } from '../../provincia/provincia.model';
import { Municipio } from '../../municipio/municipio.model';
import { Bairro } from '../../bairro/bairro.model';
import { Rua } from '../../rua/rua.model';
import { ProvinciaService } from '../../provincia/provincia.service';
import { MunicipioService } from '../../municipio/municipio.service';
import { BairroService } from '../../bairro/bairro.service';
import { RuaService } from '../../rua/rua.service';
import { EsquadraService } from '../../esquadra/esquadra.service';

import { uuid } from 'uuid';

import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Form, NgModel, Validators } from '@angular/forms';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Esquadra } from '../esquadra.model';
import { takeUntil, take } from 'rxjs/operators';
import { MatOption } from '@angular/material/core';
@Component({
  selector: 'app-nova.esquadra',
  templateUrl: './nova.esquadra.component.html',
  styleUrls: ['./nova.esquadra.component.css']
})
export class NovaEsquadraComponent implements OnInit, AfterViewInit, OnDestroy {

  
  public provincias: Provincia[];
  public municipios: Municipio[];
  public bairros: Bairro[];
  public ruas: Rua[];
  
  public provinciaCtrl: FormControl = new FormControl();
  public municipioCtrl: FormControl = new FormControl();
  public bairroCtrl: FormControl = new FormControl();
  public ruaCtrl: FormControl = new FormControl();

  public ProvinciaFiltroCtrl: FormControl = new FormControl();
  public MunicipioFiltroCtrl: FormControl = new FormControl();
  public BairroFiltroCtrl:    FormControl = new FormControl();
  public RuaFiltroCtrl:       FormControl = new FormControl();
  
  evento: MatSelectChange;
  form: FormGroup;
  public provinciasFiltradas: ReplaySubject<Provincia[]> = new ReplaySubject<Provincia[]>(1);
  public municipiosFiltrados: ReplaySubject<Municipio[]> = new ReplaySubject<Municipio[]>(1);
  public bairrosFiltrados:    ReplaySubject<Bairro[]>    = new ReplaySubject<Bairro[]>(1);
  public ruasFiltrados:       ReplaySubject<Rua[]>       = new ReplaySubject<Rua[]>(1);
  titulo:string;
  id;
  @ViewChild("singleSelect", { static: true }) singleSelect: MatSelect;
  @Output() onSelectionChange: EventEmitter<any> = new EventEmitter<any>();

  protected _onDestroy = new Subject<void>();
  private _changeSubscription: Subscription = null;

  constructor(private provinciaService: ProvinciaService, private municipioService: MunicipioService, private bairroService: BairroService, private ruaService: RuaService, private esquadraService: EsquadraService,private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    
  }

    
   esquadra: Esquadra = {
    id: '',
    designacao: '',
    rua:[]
   }

   ngOnInit(): void {
    this.validarCampos();
    this.id = this.route.snapshot.paramMap.get('id');
    this.carregarProvincias();
    this.carregarMunicipios('');
    this.carregarBairros('');
    this.carregarRuas('');
    this.activarFiltroProvincia();
    this.activarFiltroMunicipio();
    this.activarFiltroBairro();
    this.activarFiltroRua();
    this.editarDados(this.id);
  }
  
  activarFiltroProvincia(){
    this.provinciaCtrl.setValue(this.provincias);
    this.ProvinciaFiltroCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarProvincias();
      });
  }
  
  activarFiltroMunicipio(){
    this.municipioCtrl.setValue(this.municipios);
    this.MunicipioFiltroCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarMunicipios();
      });
  }
  
  activarFiltroBairro(){
    this.bairroCtrl.setValue(this.bairros);

    this.BairroFiltroCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarBairros();
      });
  }

  activarFiltroRua(){
    this.ruaCtrl.setValue(this.ruas);

    this.RuaFiltroCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarRuas();
      });
  }

  editarDados(id){
    this.titulo = 'Actualizar Dados';
    this.esquadraService.editarDados(id).subscribe( resp => {
      this.esquadra.id = resp['data']['0'].id;
      this.esquadra.designacao = resp['data']['0'].esquadra;
        
        this.form.get("provinciaCtrl").setValue(resp['data']['0'].provincia_id);
        this.carregarMunicipios(resp['data']['0'].provincia_id);
        this.form.get("municipioCtrl").setValue(resp['data']['0'].municipio_id);
        
        this.carregarBairros(resp['data']['0'].municipio_id);
        this.form.get("bairroCtrl").setValue(resp['data']['0'].bairro_id);
        
        this.carregarRuas(resp['data']['0'].bairro_id);
        this.form.get("ruaCtrl").setValue(resp['data']['0'].rua_id);
        
    });

  }

  carregarProvincias() {
    this.provinciaService.listar().subscribe(provincias => {
      this.provincias = provincias
      this.provinciasFiltradas.next(this.provincias['data'].slice());
    });
  }

  carregarMunicipios(provincia_id: uuid.v4) {
    this.municipioService.listar(provincia_id).subscribe(municipios => {
      this.municipios = municipios
      this.municipiosFiltrados.next(this.municipios['data'].slice());
    });
  }
  carregarBairros(municipio_id: uuid.v4) {
    this.bairroService.listar(municipio_id).subscribe(bairros => {
      this.bairros = bairros
      this.bairrosFiltrados.next(this.bairros['data'].slice());
    });
  }

  carregarRuas(bairro_id: uuid.v4) {
    this.ruaService.listarPorBairro(bairro_id).subscribe(ruas => {
      this.ruas = ruas
      this.ruasFiltrados.next(this.ruas['data'].slice());
    });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();

    if (this._changeSubscription !== null) {
      this._changeSubscription.unsubscribe();
    }
  }

  setInitialValue() {


    this.provinciasFiltradas.next(this.provincias['data'].slice());
  
    this.provinciasFiltradas
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: Provincia, b: Provincia) => a && b && a.id === b.id;
      });
      
    this.municipiosFiltrados.next(this.municipios['data'].slices());
    this.municipiosFiltrados
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (m: Municipio, n: Municipio) => m && n && m.id === n.id;
      });

    this.bairrosFiltrados.next(this.bairros['data'].slices());
    this.bairrosFiltrados
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (m: Bairro, n: Bairro) => m && n && m.id === n.id;
      });

      this.ruasFiltrados.next(this.ruas['data'].slices());
      this.ruasFiltrados
        .pipe(take(1), takeUntil(this._onDestroy))
        .subscribe(() => {
          this.singleSelect.compareWith = (m: Rua, n: Rua) => m && n && m.id === n.id;
        });
  }

  filtrarProvincias() {
    if (!this.provincias['data']) {
      return;
    }

    let buscar = this.ProvinciaFiltroCtrl.value;

    if (!buscar) {
      this.provinciasFiltradas.next(this.provincias['data'].slice());
      return;
    }
    else {
      buscar = buscar.toLowerCase();
    }
    this.provinciasFiltradas.next(
      this.provincias['data'].filter(provincia => provincia.designacao.toLowerCase().indexOf(buscar) > -1)
    );
  }

  filtrarMunicipios() {
    if (!this.municipios['data']) {
      return;
    }

    let buscar = this.MunicipioFiltroCtrl.value;

    if (!buscar) {
      this.municipiosFiltrados.next(this.municipios['data'].slice());
      return;
    }
    else {
      buscar = buscar.toLowerCase();
    }
    this.municipiosFiltrados.next(
      this.municipios['data'].filter(municipio => municipio.designacao.toLowerCase().indexOf(buscar) > -1)
    );
  }

  filtrarBairros() {
    if (!this.bairros['data']) {
      return;
    }

    let buscar = this.BairroFiltroCtrl.value;

    if (!buscar) {
      this.bairrosFiltrados.next(this.bairros['data'].slice());
      return;
    }
    else {
      buscar = buscar.toLowerCase();
    }
    this.bairrosFiltrados.next(
      this.bairros['data'].filter(bairro => bairro.designacao.toLowerCase().indexOf(buscar) > -1)
    );
  }
  
  filtrarRuas() {
    if (!this.ruas['data']) {
      return;
    }

    let buscar = this.RuaFiltroCtrl.value;

    if (!buscar) {
      this.ruasFiltrados.next(this.ruas['data'].slice());
      return;
    }
    else {
      buscar = buscar.toLowerCase();
    }
    this.ruasFiltrados.next(
      this.ruas['data'].filter(rua => rua.designacao.toLowerCase().indexOf(buscar) > -1)
    );
  }

  selectedProvincia(event: MatSelectChange){
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    this.carregarMunicipios(selectedData.value);

  }

  selectedMunicipio(event: MatSelectChange) {
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    this.carregarBairros(selectedData.value);

  }

  selectedBairro(event: MatSelectChange) {
    
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    this.carregarRuas(selectedData.value);

  }

  validarCampos() {

    this.form = this.fb.group({
      designacao: ['', Validators.required],
      provinciaCtrl: ['', Validators.required],
      municipioCtrl: ['', Validators.required],
      bairroCtrl: ['', Validators.required],
      ruaCtrl: ['', Validators.required]

    });

  }
 
  enviarDados(): void {
    if(this.id){
      this.actualizarDados();
    }
    else{
       this.salvarDados();
    }

  }

  salvarDados(){
   
    var mensagem = '';

    if(this.form.valid){
      this.esquadraService.nova(this.esquadra).subscribe(resp => {
         mensagem = resp['message'].sucess;
         this.esquadraService.mostrarMensagem(mensagem);
         this.router.navigate(['/esquadra'])
      },
      (err) =>{
        mensagem = err.error.message.error;
        this.esquadraService.mostrarMensagem(mensagem);
        
      });
    }
    else{
      this.esquadraService.mostrarMensagem("preencha os campos obrigatório!")
    }
  }

  actualizarDados(){
   
    var mensagem = '';

    if(this.form.valid){
      this.esquadraService.actualizar(this.esquadra).subscribe(resp => {
         mensagem = resp['message'].sucess;
         this.esquadraService.mostrarMensagem(mensagem);
         this.router.navigate(['/esquadra'])
      },
      (err) =>{
        console.log('Erro:',err)
        mensagem = err.error.message.error;
        this.esquadraService.mostrarMensagem(mensagem);
        
      });
    }
    else{
      this.esquadraService.mostrarMensagem("preencha os campos obrigatório!")
    }
  }

  cancelar(): void {
    this.router.navigate(['/'])
  }

}
