import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Provincia } from '../../provincia/provincia.model';
import { ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ProvinciaService } from '../../provincia/provincia.service';
import { MunicipioService } from '../../municipio/municipio.service';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { takeUntil, take } from 'rxjs/operators';
import { Municipio } from '../../municipio/municipio.model';
import { uuid } from 'uuid';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-novo.bairro',
  templateUrl: './novo.bairro.component.html',
  styleUrls: ['./novo.bairro.component.css']
})
export class NovoBairroComponent implements OnInit, AfterViewInit, OnDestroy {

  public provincias: Provincia[];
  public municipios: Municipio[];

  public provinciaCtrl: FormControl = new FormControl();
  public municipioCtrl: FormControl = new FormControl();

  public ProvinciaFiltroCtrl: FormControl = new FormControl();
  public MunicipioFiltroCtrl: FormControl = new FormControl();

  public provinciasFiltradas: ReplaySubject<Provincia[]> = new ReplaySubject<Provincia[]>(1);
  public municipiosFiltrados: ReplaySubject<Municipio[]> = new ReplaySubject<Municipio[]>(1);

  @ViewChild("singleSelect", { static: true }) singleSelect: MatSelect;

  protected _onDestroy = new Subject<void>();
  constructor(private provinciaService: ProvinciaService, private municipioService: MunicipioService) { }

  ngOnInit(): void {
    this.carregarProvincias();
    this.carregarMunicipios('');
    this.provinciaCtrl.setValue(this.provincias);
    this.municipioCtrl.setValue(this.municipios);


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
  }

  carregarProvincias() {
    this.provinciaService.listar().subscribe(provincias => {
      this.provincias = provincias
      this.provinciasFiltradas.next(this.provincias['data'].slice());
    });
  }

  carregarMunicipios(provincia_id: uuid.v4) {
    // this.municipioService.listar('00817a1a-792b-49aa-96f1-51a946934834').subscribe(municipios => {
    this.municipioService.listar(provincia_id).subscribe(municipios => {
      this.municipios = municipios
      this.municipiosFiltrados.next(this.municipios['data'].slice());
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

  selected(event: MatSelectChange) {
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    this.carregarMunicipios(selectedData.value.id);

  }



}
