import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { HomeComponent } from './views/home/home.component';
import { PatentesComponent } from './views/patentes/patentes.component';
import { NovaPatenteComponent } from './components/patente/nova-patente/nova-patente.component';
import { NovoUsuarioComponent } from './components/usuario/novo.usuario/novo.usuario.component';
import { NovaProvinciaComponent } from './components/provincia/nova-provincia/nova-provincia.component';

const routes: Routes = [{
  path:"",
  component: HomeComponent
},
{
  path: "patente",
  component: PatentesComponent
},
{
  path: "patente/nova",
  component: NovaPatenteComponent
},
{
  path:"usuario/novo",
  component: NovoUsuarioComponent
},
{
   path:"provincia/nova",
   component: NovaProvinciaComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }
