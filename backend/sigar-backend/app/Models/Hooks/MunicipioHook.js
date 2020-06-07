'use strict'
const uuidv4 = require("uuid/v4");

const MunicipioHook = exports = module.exports = {}

MunicipioHook.uuid = async (municipio) => {
  municipio.id = uuidv4();
};
