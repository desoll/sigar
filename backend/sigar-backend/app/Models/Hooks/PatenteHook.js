'use strict'
const uuidv4 = require("uuid/v4");

const PatenteHook = exports = module.exports = {}

PatenteHook.uuid = async (patente) => {
  patente.id = uuidv4();
};
