'use strict'
const uuidv4 = require("uuid/v4");

const EsquadraHook = exports = module.exports = {}

EsquadraHook.uuid = async (esquadra) => {
  esquadra.id = uuidv4();
}
