"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/**
 * quick ts implementation of example from
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * with some minor improvements
 * @todo: test (?)
 * @todo: add node.js implementation with node's http inside. Just to make SDK cross-platform
 */
var XhrRequest = function () {
    function XhrRequest() {
        _classCallCheck(this, XhrRequest);
    }

    _createClass(XhrRequest, null, [{
        key: "ajax",

        // Method that performs the ajax request
        value: function ajax(method, url) {
            var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
            var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

            // Creating a promise
            return new Promise(function (resolve, reject) {
                // Instantiates the XMLHttpRequest
                var client = XhrRequest.createXMLHTTPObject();
                var uri = url;
                var payload = null;
                // Add given payload to get request
                if (args && method === XhrRequest.Method.GET) {
                    uri += "?";
                    var argcount = 0;
                    for (var key in args) {
                        if (args.hasOwnProperty(key)) {
                            if (argcount++) {
                                uri += "&";
                            }
                            uri += encodeURIComponent(key) + "=" + encodeURIComponent(args[key]);
                        }
                    }
                } else if (args) {
                    if (!headers) {
                        headers = {};
                    }
                    headers["Content-Type"] = "application/json; charset=utf-8";
                    payload = JSON.stringify(args);
                }
                for (var _key in options) {
                    if (_key in client) {
                        client[_key] = options[_key];
                    }
                }
                // hack: method[method] is somewhat like .toString for enum Method
                // should be made in normal way
                client.open(XhrRequest.Method[method], uri, true);
                // Add given headers
                if (headers) {
                    for (var _key2 in headers) {
                        if (headers.hasOwnProperty(_key2)) {
                            client.setRequestHeader(_key2, headers[_key2]);
                        }
                    }
                }
                payload ? client.send(payload) : client.send();
                client.onload = function () {
                    if (client.status >= 200 && client.status < 300) {
                        // Performs the function "resolve" when this.status is equal to 2xx
                        resolve(client);
                    } else {
                        // Performs the function "reject" when this.status is different than 2xx
                        reject(client);
                    }
                };
                client.onerror = function () {
                    reject(client);
                };
            });
        }
    }, {
        key: "get",
        value: function get(url) {
            var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            return XhrRequest.ajax(XhrRequest.Method.GET, url, payload, headers, options);
        }
    }, {
        key: "post",
        value: function post(url) {
            var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            return XhrRequest.ajax(XhrRequest.Method.POST, url, payload, headers, options);
        }
    }, {
        key: "put",
        value: function put(url) {
            var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            return XhrRequest.ajax(XhrRequest.Method.PUT, url, payload, headers, options);
        }
    }, {
        key: "delete",
        value: function _delete(url) {
            var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            return XhrRequest.ajax(XhrRequest.Method.DELETE, url, payload, headers, options);
        }
    }, {
        key: "createXMLHTTPObject",
        value: function createXMLHTTPObject() {
            var xmlhttp = null;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = XhrRequest.XMLHttpFactories[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var i = _step.value;

                    try {
                        xmlhttp = i();
                    } catch (e) {
                        continue;
                    }
                    break;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return xmlhttp;
        }
    }]);

    return XhrRequest;
}();

XhrRequest.XMLHttpFactories = [function () {
    return new XMLHttpRequest();
}, function () {
    return new window["ActiveXObject"]("Msxml2.XMLHTTP");
}, function () {
    return new window["ActiveXObject"]("Msxml3.XMLHTTP");
}, function () {
    return new window["ActiveXObject"]("Microsoft.XMLHTTP");
}];
(function (XhrRequest) {
    var Method = void 0;
    (function (Method) {
        Method[Method["GET"] = "GET"] = "GET";
        Method[Method["POST"] = "POST"] = "POST";
        Method[Method["PUT"] = "PUT"] = "PUT";
        Method[Method["DELETE"] = "DELETE"] = "DELETE";
    })(Method = XhrRequest.Method || (XhrRequest.Method = {}));
})(XhrRequest || (XhrRequest = {}));
exports.default = XhrRequest;