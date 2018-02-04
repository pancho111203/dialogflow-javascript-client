"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiAiClient = require("./es6/ApiAiClient");

Object.keys(_ApiAiClient).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ApiAiClient[key];
    }
  });
});