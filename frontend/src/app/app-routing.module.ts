import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { HomeComponent } from './views/home/home.component';
import { PatentesComponent } from './views/patentes/patentes.component';
const routes: Routes = [{
  path:"",
  component: HomeComponent
},
{
  path: "patentes",
  component: PatentesComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
