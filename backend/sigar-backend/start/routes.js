'use strict'

const Route = use('Route')


Route.get('patente','PatenteController.index');
Route.post('patente/nova','PatenteController.criar');

Route.group(()=>{
    Route.post('users/login','UserController.login');
    Route.post('users/add','UserController.store');
}).middleware(['auth'])
