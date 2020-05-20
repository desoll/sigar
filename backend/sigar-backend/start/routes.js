'use strict'

const Route = use('Route')

Route.group(()=>{
    Route.post('users/login','UserController.login');
    Route.post('users/add','UserController.store');

}).middleware(['auth'])
