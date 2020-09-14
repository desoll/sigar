//import { Component, OnInit } from '@angular/core';


import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
//import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
//import { AuthenticationService } from '../../../core/services/auth.service';
//import { SpinnerService } from '../../core/services/spinner.service';
//import { AuthGuard } from 'src/app/core/guards/auth.guard';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  isAuthenticated: boolean;
  animate_utilizador = false;
  animate_endereco = false;
  animate_esquadra = false;
  Usuario = 'Dilangue'
  carregar = true;
  private _mobileQueryListner: () => void;
  mobileQuery: MediaQueryList;

  constructor(private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher) {

this.dimensionar();
   }

   dimensionar(){
     this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
     this.mobileQuery.addListener(this._mobileQueryListner);
   }


  logout() {
    //this.authService.logout('/');
  }
  ngOnInit(): void {
    // this.isAuthenticated = await this.authService.checkAuthenticated();
    this.Processar();
  }
  Processar() {
    var rand = Math.round(Math.random() * (3000 - 500)) + 500;
    setTimeout(() => {
    this.carregar = false;
    }, rand);
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

  ngOnDestroy(){
    this.mobileQuery.removeListener(this._mobileQueryListner)
  }

  ngAfterViewInit(){
    this.changeDetectorRef.detectChanges();
  }

}
