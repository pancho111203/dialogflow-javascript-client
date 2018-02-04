"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _Errors = require("../Errors");

var _XhrRequest = require("../XhrRequest");

var _XhrRequest2 = _interopRequireDefault(_XhrRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Request = function () {
    function Request(apiAiClient, options) {
        _classCallCheck(this, Request);

        this.apiAiClient = apiAiClient;
        this.options = options;
        this.uri = this.apiAiClient.getApiBaseUrl() + "query?v=" + this.apiAiClient.getApiVersion();
        this.requestMethod = _XhrRequest2.default.Method.POST;
        this.headers = {
            Authorization: "Bearer " + this.apiAiClient.getAccessToken()
        };
        this.options.lang = this.apiAiClient.getApiLang();
        this.options.sessionId = this.apiAiClient.getSessionId();
    }

    _createClass(Request, [{
        key: "perform",
        value: function perform() {
            var overrideOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var options = overrideOptions ? overrideOptions : this.options;
            return _XhrRequest2.default.ajax(this.requestMethod, this.uri, options, this.headers).then(Request.handleSuccess.bind(this)).catch(Request.handleError.bind(this));
        }
    }], [{
        key: "handleSuccess",
        value: function handleSuccess(xhr) {
            return Promise.resolve(JSON.parse(xhr.responseText));
        }
    }, {
        key: "handleError",
        value: function handleError(xhr) {
            var error = new _Errors.ApiAiRequestError(null);
            try {
                var serverResponse = JSON.parse(xhr.responseText);
                if (serverResponse.status && serverResponse.status.errorDetails) {
                    error = new _Errors.ApiAiRequestError(serverResponse.status.errorDetails, serverResponse.status.code);
                } else {
                    error = new _Errors.ApiAiRequestError(xhr.statusText, xhr.status);
                }
            } catch (e) {
                error = new _Errors.ApiAiRequestError(xhr.statusText, xhr.status);
            }
            return Promise.reject(error);
        }
    }]);

    return Request;
}();

exports.default = Request;