'use strict'
const uuidv4 = require("uuid/v4");

const EstadoHook = exports = module.exports = {}

EstadoHook.uuid = async (estado) => {
  estado.id = uuidv4();
};
