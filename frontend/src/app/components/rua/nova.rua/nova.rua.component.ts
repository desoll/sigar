import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Provincia } from '../../provincia/provincia.model';
import { Municipio } from '../../municipio/municipio.model';
import { FormControl, FormGroup, FormBuilder, Form } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { ProvinciaService } from '../../provincia/provincia.service';
import { MunicipioService } from '../../municipio/municipio.service';
import { BairroService } from '../../bairro/bairro.service';
import { Router } from '@angular/router';
import { MatOption } from '@angular/material/core';
import { takeUntil, take } from 'rxjs/operators';
import { uuid } from 'uuid';
import { Bairro } from '../../bairro/bairro.model';

@Component({
  selector: 'app-nova.rua',
  templateUrl: './nova.rua.component.html',
  styleUrls: ['./nova.rua.component.css']
})
export class NovaRuaComponent implements OnInit, AfterViewInit, OnDestroy {

  public provincias: Provincia[];
  public municipios: Municipio[];
  public bairros:     Bairro[];

  public provinciaCtrl: FormControl = new FormControl();
  public municipioCtrl: FormControl = new FormControl();
  public bairroCtrl:    FormControl = new FormControl();

  public ProvinciaFiltroCtrl: FormControl = new FormControl();
  public MunicipioFiltroCtrl: FormControl = new FormControl();
  public BairroFiltroCtrl:    FormControl = new FormControl();

  form: FormGroup;
  public provinciasFiltradas: ReplaySubject<Provincia[]> = new ReplaySubject<Provincia[]>(1);
  public municipiosFiltrados: ReplaySubject<Municipio[]> = new ReplaySubject<Municipio[]>(1);
  public bairrosFiltrados:    ReplaySubject<Bairro[]> = new ReplaySubject<Bairro[]>(1);


  @ViewChild("singleSelect", { static: true }) singleSelect: MatSelect;

  protected _onDestroy = new Subject<void>();

  constructor(private provinciaService: ProvinciaService, private municipioService: MunicipioService, private bairroService: BairroService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.carregarProvincias();
    this.carregarMunicipios('');
    this.carregarBairros('');

    this.provinciaCtrl.setValue(this.provincias);
    this.municipioCtrl.setValue(this.municipios);
    this.bairroCtrl.setValue(this.bairros);

    this.ProvinciaFiltroCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarProvincias();
      });

    this.MunicipioFiltroCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarMunicipios();
      });
    this.BairroFiltroCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarBairros();
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

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.provinciasFiltradas
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: Provincia, b: Provincia) => a && b && a.id === b.id;
      });

    this.municipiosFiltrados
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (m: Municipio, n: Municipio) => m && n && m.id === n.id;
      });
    this.bairrosFiltrados
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (m: Bairro, n: Bairro) => m && n && m.id === n.id;
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

  selectedProvincia(event: MatSelectChange) {
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    this.carregarMunicipios(selectedData.value.id);

  }
  
  selectedMunicipio(event: MatSelectChange) {
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    this.carregarBairros(selectedData.value.id);

  }

}