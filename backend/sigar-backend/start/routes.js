'use strict'

const Route = use('Route')


Route.get('patente','PatenteController.listar');
Route.post('patente/nova','PatenteController.criar');

Route.get('provincia','ProvinciaController.listar');

Route.post('municipio/novo','MunicipioController.criar');
Route.get('municipio','MunicipioController.listar');

Route.post('bairro/novo','BairroController.criar');
Route.get('bairro','BairroController.listar');

Route.post('rua/nova','RuaController.criar');
Route.patch('rua/actualizar','RuaController.actualizarDados');
Route.delete('rua/apagar','RuaController.apagar');
Route.get('rua/enderecos','RuaController.listarEndereco');
Route.get('rua','RuaController.listarPorId');
Route.get('rua/listarPorBairro','RuaController.listarPorBairro');

Route.post('esquadra/nova','EsquadraController.criar');
Route.get('esquadra','EsquadraController.listarGeral');
Route.get('esquadra/listar','EsquadraController.listar');
Route.get('esquadra/editarDados','EsquadraController.editarDados');
Route.patch('esquadra/actualizar','EsquadraController.actualizarDados');
Route.delete('esquadra/apagar', 'EsquadraController.apagar');

Route.group(()=>{
    Route.post('users/login','UserController.login');
    Route.post('users/add','UserController.store');
}).middleware(['auth'])
