'use strict'

const Route = use('Route')


Route.get('patente','PatenteController.listar');
Route.post('patente/nova','PatenteController.criar');

Route.post('provincia/nova','ProvinciaController.criar');
Route.get('provincia','ProvinciaController.listar');

Route.group(()=>{
    Route.post('users/login','UserController.login');
    Route.post('users/add','UserController.store');
}).middleware(['auth'])
