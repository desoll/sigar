import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { HomeComponent } from './views/home/home.component';
import { PatentesComponent } from './views/patentes/patentes.component';
import { NovaPatenteComponent } from './components/patente/nova-patente/nova-patente.component';
import { NovoUsuarioComponent } from './components/usuario/novo.usuario/novo.usuario.component';
import { NovoMunicipioComponent} from './components/municipio/novo.municipio/novo.municipio.component';
import { NovoBairroComponent } from './components/bairro/novo.bairro/novo.bairro.component';
import { NovaRuaComponent } from './components/rua/nova.rua/nova.rua.component';
import { ListarEnderecoComponent } from './components/rua/listar-endereco/listar-endereco.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { NovaEsquadraComponent } from './components/esquadra/nova.esquadra/nova.esquadra.component';
import { ListarEsquadraComponent } from './components/esquadra/listar/listar.esquadra/listar.esquadra.component';


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
  path:"municipio/novo",
  component:NovoMunicipioComponent
},
{
  path:"bairro/novo",
  component:NovoBairroComponent
}, 
{
  path:"rua/nova",
  component:NovaRuaComponent
},
{
  path:"rua/actualizar/:id",
  component:NovaRuaComponent
},
{
  path:"enderecos",
  component: ListarEnderecoComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path:'esquadra/nova',
  component: NovaEsquadraComponent
},
{
  path:'esquadra/actualizar/:id',
  component: NovaEsquadraComponent
},
{
  path:'esquadra',
  component: ListarEsquadraComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
