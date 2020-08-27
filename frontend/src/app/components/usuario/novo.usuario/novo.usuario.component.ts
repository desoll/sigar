import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import  * as _ from 'lodash';
import { PatenteService } from '../../patente/patente.service';
import { Patente } from '../../patente/patente.model';
import { Observable, ReplaySubject, Subject, Subscription } from 'rxjs';
import { Provincia } from '../../provincia/provincia.model';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { ProvinciaService } from '../../provincia/provincia.service';
import { takeUntil, take } from 'rxjs/operators';
import { MatOption } from '@angular/material/core';
import { Municipio } from '../../municipio/municipio.model';
import { Bairro } from '../../bairro/bairro.model';
import { MunicipioService } from '../../municipio/municipio.service';
import { BairroService } from '../../bairro/bairro.service';
import { uuid } from 'uuid';
import { Rua } from '../../rua/rua.model';
import { RuaService } from '../../rua/rua.service';
import { Usuario } from '../usuario.model';
import { Esquadra } from '../../esquadra/esquadra.model';
import { EsquadraService } from '../../esquadra/esquadra.service';
import * as CryptoJS from 'crypto-js';
import { stringify } from 'querystring';

@Component({
  selector: 'app-novo.usuario',
  templateUrl: './novo.usuario.component.html',
  styleUrls: ['./novo.usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {
  panelOpenState = false;
  hide = true;
  form: FormGroup;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  public patentes: Patente[];
  public provincias: Provincia[];
  public municipios: Municipio[];
  public bairros: Bairro[];
  public ruas: Rua[];
  public esquadras: Esquadra[];
  

  public patenteCtrl: FormControl = new FormControl();
  public provinciaCtrl: FormControl = new FormControl();
  public municipioCtrl: FormControl = new FormControl();
  public bairroCtrl: FormControl = new FormControl();
  public ruaCtrl: FormControl = new FormControl();
  public esquadraCtrl: FormControl = new FormControl();

  public PatenteFiltroCtrl: FormControl = new FormControl();
  public ProvinciaFiltroCtrl: FormControl = new FormControl();
  public MunicipioFiltroCtrl: FormControl = new FormControl();
  public BairroFiltroCtrl: FormControl = new FormControl();
  public RuaFiltroCtrl:       FormControl = new FormControl();
  public EsquadraFiltroCtrl:       FormControl = new FormControl();

  evento: MatSelectChange;
  public patentesFiltradas: ReplaySubject<Patente[]> = new ReplaySubject<Patente[]>(1);
  public provinciasFiltradas: ReplaySubject<Provincia[]> = new ReplaySubject<Provincia[]>(1);
  public municipiosFiltrados: ReplaySubject<Municipio[]> = new ReplaySubject<Municipio[]>(1);
  public bairrosFiltrados: ReplaySubject<Bairro[]> = new ReplaySubject<Bairro[]>(1);
  public ruasFiltrados:       ReplaySubject<Rua[]>       = new ReplaySubject<Rua[]>(1);
  public esquadrasFiltradas:       ReplaySubject<Esquadra[]>       = new ReplaySubject<Esquadra[]>(1);

  @ViewChild("singleSelect", { static: true }) singleSelect: MatSelect;
  @Output() onSelectionChange: EventEmitter<any> = new EventEmitter<any>();

  protected _onDestroy = new Subject<void>();
  private _changeSubscription: Subscription = null;
  minPw = 8;
  constructor(private provinciaService: ProvinciaService,  private municipioService: MunicipioService, private bairroService: BairroService, private ruaService: RuaService, private formBuilder: FormBuilder, private patenteService: PatenteService, private esquadraService: EsquadraService) { }
 
  usuario: Usuario = {
    id: '',
    nome: '',
    senha: '',
    telefone: '',
    email: '',
    rua: [],
    esquadra: [],
    patente: [],
    foto:null
  }
 
  ngOnInit(): void {
    this.validar();
    this.carregarPatentes();
    this.carregarProvincias();
    this.carregarMunicipios('');
    this.carregarBairros('');
    this.carregarRuas('');
    this.carregarEsquadras();
    this.activarFiltroProvincia();
    this.activarFiltroMunicipio();
    this.activarFiltroBairro();
    this.activarFiltroRua();
    this.activarFiltroPatente();
    this.activarFiltroEsquadra();
  }

  
   
  validar(){
    this.form = this.formBuilder.group({
       nome: ['',Validators.required],
       telefone: ['',Validators.required],
       email: ['',Validators.required],
       senha: ['', Validators.required],
       foto: ['',Validators.required],
       confSenha:['',Validators.required],
       patenteCtrl: ['', Validators.required],
       provinciaCtrl: ['', Validators.required],
       municipioCtrl: ['', Validators.required],
       bairroCtrl: ['', Validators.required],
       ruaCtrl: ['', Validators.required],
       esquadraCtrl: ['', Validators.required],
    }, {validator: this.passwordMatchValidator});
  }
    removeImage() {
      this.cardImageBase64 = null;
      this.isImageSaved = false;
    }
    fileChangeEvent(fileInput: any) {

      
      this.imageError = null;
      if (fileInput.target.files && fileInput.target.files[0]) {
          // Size Filter Bytes
          const max_size = 20971520;
          const allowed_types = ['image/png', 'image/jpeg'];
          const max_height = 15200;
          const max_width = 25600;

          if (fileInput.target.files[0].size > max_size) {
              this.imageError =
                  'Maximum size allowed is ' + max_size / 1000 + 'Mb';

              return false;
          }

          if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
              this.imageError = 'Only Images are allowed ( JPG | PNG )';
              return false;
          }
          const reader = new FileReader();
          reader.onload = (e: any) => {
              const image = new Image();
              image.src = e.target.result;
              image.onload = rs => {
                  const img_height = rs.currentTarget['height'];
                  const img_width = rs.currentTarget['width'];

                  console.log(img_height, img_width);


                  if (img_height > max_height && img_width > max_width) {
                      this.imageError =
                          'Maximum dimentions allowed ' +
                          max_height +
                          '*' +
                          max_width +
                          'px';
                      return false;
                  } else {
                      const imgBase64Path = e.target.result;
                      this.cardImageBase64 = imgBase64Path;
                      this.isImageSaved = true;
                      // this.previewImagePath = imgBase64Path;
                  }
              };
          };

          reader.readAsDataURL(fileInput.target.files[0]);
      }


    }

     
  activarFiltroPatente(){
    this.patenteCtrl.setValue(this.patentes);
    this.PatenteFiltroCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarPatentes();
      });
  }
     
  activarFiltroEsquadra(){
    this.esquadraCtrl.setValue(this.esquadras);
    this.EsquadraFiltroCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarEsquadras();
      });
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


    carregarPatentes(){
      this.patenteService.listar().subscribe(patentes => 
        {
          this.patentes = patentes
          this.patentesFiltradas.next(this.patentes['data'].slice());
        });
    }

    carregarEsquadras(){
      this.esquadraService.carregarTodas().subscribe(esquadras => 
        {
          this.esquadras = esquadras
          this.esquadrasFiltradas.next(this.esquadras['data'].slice());
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


    this.esquadrasFiltradas.next(this.esquadras['data'].slice());
    this.esquadrasFiltradas
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: Esquadra, b: Esquadra) => a && b && a.id === b.id;
      });

    this.patentesFiltradas.next(this.patentes['data'].slice());
    this.patentesFiltradas
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: Patente, b: Patente) => a && b && a.id === b.id;
      });

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

  filtrarPatentes() {
    if (!this.patentes['data']) {
      return;
    }

    let buscar = this.PatenteFiltroCtrl.value;
   
    if (!buscar) {
      this.patentesFiltradas.next(this.patentes['data'].slice());
      return;
    }
    else {
      buscar = buscar.toLowerCase();
    }
    this.patentesFiltradas.next(
      this.patentes['data'].filter(patente => patente.designacao.toLowerCase().indexOf(buscar) > -1)
    );
  }
  filtrarEsquadras() {
    if (!this.esquadras['data']) {
      return;
    }

    let buscar = this.EsquadraFiltroCtrl.value;
   
    if (!buscar) {
      this.esquadrasFiltradas.next(this.esquadras['data'].slice());
      return;
    }
    else {
      buscar = buscar.toLowerCase();
    }
    this.esquadrasFiltradas.next(
      this.esquadras['data'].filter(e => e.designacao.toLowerCase().indexOf(buscar) > -1)
    );
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

  get senha() { return this.form.get('senha'); }
  get confSenha() { return this.form.get('confSenha'); }

  selectedBairro(event: MatSelectChange) {
    
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    this.carregarRuas(selectedData.value);

  }

    passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    if (formGroup.get('senha').value === formGroup.get('confSenha').value)
      return null;
    else
      return {passwordMismatch: true};
  };

  onPasswordInput() {
    if (this.form.hasError('passwordMismatch'))
      this.confSenha.setErrors([{'passwordMismatch': true}]);
    else
      this.confSenha.setErrors(null);
  }

  enviar(){
   var pass =  CryptoJS.AES.encrypt(this.usuario.senha.trim(), 'd3501').toString();
   this.usuario.senha = this.usuario.senha ?  pass: ''; 
    console.log('Dados: ', this.usuario)
  }



}

