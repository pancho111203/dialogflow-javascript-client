"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ApiAiClient = exports.ApiAiConstants = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2017 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _Interfaces = require("./Interfaces");

Object.keys(_Interfaces).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _Interfaces[key];
        }
    });
});

var _ApiAiConstants = require("./ApiAiConstants");

Object.defineProperty(exports, "ApiAiConstants", {
    enumerable: true,
    get: function get() {
        return _ApiAiConstants.ApiAiConstants;
    }
});

var _Errors = require("./Errors");

var _EventRequest = require("./Request/EventRequest");

var _TextRequest = require("./Request/TextRequest");

var _TextRequest2 = _interopRequireDefault(_TextRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiAiClient = exports.ApiAiClient = function () {
    function ApiAiClient(options) {
        _classCallCheck(this, ApiAiClient);

        if (!options || !options.accessToken) {
            throw new _Errors.ApiAiClientConfigurationError("Access token is required for new ApiAi.Client instance");
        }
        this.accessToken = options.accessToken;
        this.apiLang = options.lang || _ApiAiConstants.ApiAiConstants.DEFAULT_CLIENT_LANG;
        this.apiVersion = options.version || _ApiAiConstants.ApiAiConstants.DEFAULT_API_VERSION;
        this.apiBaseUrl = options.baseUrl || _ApiAiConstants.ApiAiConstants.DEFAULT_BASE_URL;
        this.sessionId = options.sessionId || this.guid();
    }

    _createClass(ApiAiClient, [{
        key: "textRequest",
        value: function textRequest(query) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (!query) {
                throw new _Errors.ApiAiClientConfigurationError("Query should not be empty");
            }
            options.query = query;
            return new _TextRequest2.default(this, options).perform();
        }
    }, {
        key: "eventRequest",
        value: function eventRequest(eventName) {
            var eventData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            if (!eventName) {
                throw new _Errors.ApiAiClientConfigurationError("Event name can not be empty");
            }
            options.event = { name: eventName, data: eventData };
            return new _EventRequest.EventRequest(this, options).perform();
        }
        // @todo: implement local tts request
        /*public ttsRequest(query) {
            if (!query) {
                throw new ApiAiClientConfigurationError("Query should not be empty");
            }
            return new TTSRequest(this).makeTTSRequest(query);
        }*/
        /*public userEntitiesRequest(options: IRequestOptions = {}): UserEntitiesRequest {
            return new UserEntitiesRequest(this, options);
        }*/

    }, {
        key: "getAccessToken",
        value: function getAccessToken() {
            return this.accessToken;
        }
    }, {
        key: "getApiVersion",
        value: function getApiVersion() {
            return this.apiVersion ? this.apiVersion : _ApiAiConstants.ApiAiConstants.DEFAULT_API_VERSION;
        }
    }, {
        key: "getApiLang",
        value: function getApiLang() {
            return this.apiLang ? this.apiLang : _ApiAiConstants.ApiAiConstants.DEFAULT_CLIENT_LANG;
        }
    }, {
        key: "getApiBaseUrl",
        value: function getApiBaseUrl() {
            return this.apiBaseUrl ? this.apiBaseUrl : _ApiAiConstants.ApiAiConstants.DEFAULT_BASE_URL;
        }
    }, {
        key: "setSessionId",
        value: function setSessionId(sessionId) {
            this.sessionId = sessionId;
        }
    }, {
        key: "getSessionId",
        value: function getSessionId() {
            return this.sessionId;
        }
        /**
         * generates new random UUID
         * @returns {string}
         */

    }, {
        key: "guid",
        value: function guid() {
            var s4 = function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            };
            return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
        }
    }]);

    return ApiAiClient;
}();