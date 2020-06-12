'use strict'
const uuidv4 = require("uuid/v4");

const RuaHook = exports = module.exports = {}

RuaHook.uuid = async (rua) => {
  rua.id = uuidv4();
}
