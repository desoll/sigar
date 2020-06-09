'use strict'
const uuidv4 = require('uuid/v4');

const BairroHook = exports = module.exports = {}

BairroHook.uuid = async (bairro) => {
  bairro.id = uuidv4();
}
