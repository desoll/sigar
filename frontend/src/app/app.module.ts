import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Importação da toolbar no Material design
import { MatToolbarModule } from  '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
//Imports para a criar formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
//
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { GlobalHttpInterceptorService} from './global-http-Interceptor.service';


//Componentes
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import { HomeComponent } from './views/home/home.component';
import { PatentesComponent } from './views/patentes/patentes.component';
import { NovaPatenteComponent } from './components/patente/nova-patente/nova-patente.component';
import { NovoUsuarioComponent } from './components/usuario/novo.usuario/novo.usuario.component';
import { NovaProvinciaComponent } from './components/provincia/nova-provincia/nova-provincia.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    PatentesComponent,
    NovaPatenteComponent,
    NovoUsuarioComponent,
    NovaProvinciaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule, 
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatIconModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatSelectModule,
    FlexLayoutModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,    useClass: GlobalHttpInterceptorService,    multi: true  },
    { provide: ErrorHandler, useClass:GlobalErrorHandlerService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
