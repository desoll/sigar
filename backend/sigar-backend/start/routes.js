'use strict'

const Route = use('Route')


Route.get('patente','PatenteController.listar');
Route.post('patente/nova','PatenteController.criar');

Route.get('provincia','ProvinciaController.listar');

Route.post('municipio/novo','MunicipioController.criar');
Route.get('municipio','MunicipioController.listar');

Route.post('bairro/novo','BairroController.criar');
Route.get('bairro','BairroController.listar');

Route.post('rua/nova','RuaController.criar')


Route.group(()=>{
    Route.post('users/login','UserController.login');
    Route.post('users/add','UserController.store');
}).middleware(['auth'])
