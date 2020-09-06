'use strict'
const uuidv4 = require('uuid/v4');

const UsuarioHook = exports = module.exports = {}

UsuarioHook.uuid = async (usuario) => {
  usuario.id = uuidv4();
}
