"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
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

var ApiAiBaseError = exports.ApiAiBaseError = function (_Error) {
    _inherits(ApiAiBaseError, _Error);

    function ApiAiBaseError(message) {
        _classCallCheck(this, ApiAiBaseError);

        var _this = _possibleConstructorReturn(this, (ApiAiBaseError.__proto__ || Object.getPrototypeOf(ApiAiBaseError)).call(this, message));

        _this.message = message;
        _this.stack = new Error().stack;
        return _this;
    }

    return ApiAiBaseError;
}(Error);

var ApiAiClientConfigurationError = exports.ApiAiClientConfigurationError = function (_ApiAiBaseError) {
    _inherits(ApiAiClientConfigurationError, _ApiAiBaseError);

    function ApiAiClientConfigurationError(message) {
        _classCallCheck(this, ApiAiClientConfigurationError);

        var _this2 = _possibleConstructorReturn(this, (ApiAiClientConfigurationError.__proto__ || Object.getPrototypeOf(ApiAiClientConfigurationError)).call(this, message));

        _this2.name = "ApiAiClientConfigurationError";
        return _this2;
    }

    return ApiAiClientConfigurationError;
}(ApiAiBaseError);

var ApiAiRequestError = exports.ApiAiRequestError = function (_ApiAiBaseError2) {
    _inherits(ApiAiRequestError, _ApiAiBaseError2);

    function ApiAiRequestError(message) {
        var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, ApiAiRequestError);

        var _this3 = _possibleConstructorReturn(this, (ApiAiRequestError.__proto__ || Object.getPrototypeOf(ApiAiRequestError)).call(this, message));

        _this3.message = message;
        _this3.code = code;
        _this3.name = "ApiAiRequestError";
        return _this3;
    }

    return ApiAiRequestError;
}(ApiAiBaseError);