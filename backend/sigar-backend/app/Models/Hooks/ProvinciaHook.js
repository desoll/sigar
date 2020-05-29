'use strict'
const uuidv4 = require("uuid/v4");

const ProvinciaHook = exports = module.exports = {}

ProvinciaHook.uuid = async (provincia) => {
  provincia.id = uuidv4();
};
