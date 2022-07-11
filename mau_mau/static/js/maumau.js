/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./typescript/deck.ts":
/*!****************************!*\
  !*** ./typescript/deck.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Deck\": () => (/* binding */ Deck)\n/* harmony export */ });\nclass Deck {\r\n\r\n    getDeckArray() {\r\n        return this.deck;\r\n    }\r\n\r\n    getPlayerCardsArray() {\r\n        return this.player_cards;\r\n    }\r\n\r\n    getOpponentCardsArray() {\r\n        return this.opponent_cards;\r\n    }\r\n}\n\n//# sourceURL=webpack://cardgames/./typescript/deck.ts?");

/***/ }),

/***/ "./typescript/mau-mau.ts":
/*!*******************************!*\
  !*** ./typescript/mau-mau.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var typescript_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typescript-cookie */ \"./node_modules/typescript-cookie/dist/typescript-cookie.mjs\");\n/* harmony import */ var _deck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deck */ \"./typescript/deck.ts\");\n\r\n\r\n\r\nlet deckCookieString = typescript_cookie__WEBPACK_IMPORTED_MODULE_0__.Cookies.get(\"deck\");\r\n\r\nif (typeof deckCookieString === \"string\") {\r\n    deckCookieString = deckCookieString.split(\"\\\\054 \").join(',');\r\n    deckCookieString = deckCookieString.split(\"\\\\\").join('');\r\n}\r\n\r\nlet deckObject = JSON.parse(deckCookieString);\r\n\r\nlet deck = Object.assign(new _deck__WEBPACK_IMPORTED_MODULE_1__.Deck(), deckObject);\r\n\r\nconsole.log(deck.getDeckArray());\r\nconsole.log(deck.getPlayerCardsArray());\r\nconsole.log(deck.getOpponentCardsArray());\r\n\n\n//# sourceURL=webpack://cardgames/./typescript/mau-mau.ts?");

/***/ }),

/***/ "./node_modules/typescript-cookie/dist/typescript-cookie.mjs":
/*!*******************************************************************!*\
  !*** ./node_modules/typescript-cookie/dist/typescript-cookie.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Cookies\": () => (/* binding */ compat),\n/* harmony export */   \"DEFAULT_ATTRIBUTES\": () => (/* binding */ DEFAULT_ATTRIBUTES),\n/* harmony export */   \"DEFAULT_CODEC\": () => (/* binding */ DEFAULT_CODEC),\n/* harmony export */   \"Types\": () => (/* binding */ index),\n/* harmony export */   \"getCookie\": () => (/* binding */ getCookie),\n/* harmony export */   \"getCookies\": () => (/* binding */ getCookies),\n/* harmony export */   \"removeCookie\": () => (/* binding */ removeCookie),\n/* harmony export */   \"setCookie\": () => (/* binding */ setCookie)\n/* harmony export */ });\n/*! typescript-cookie v1.0.3 | MIT */\nvar index = /*#__PURE__*/Object.freeze({\n    __proto__: null\n});\n\nconst encodeName = (name) => encodeURIComponent(name)\n    .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)\n    .replace(/[()]/g, escape);\nconst encodeValue = (value) => {\n    return encodeURIComponent(value).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);\n};\nconst decodeName = decodeURIComponent;\nconst decodeValue = (value) => {\n    if (value[0] === '\"') {\n        value = value.slice(1, -1);\n    }\n    return value.replace(/(%[\\dA-F]{2})+/gi, decodeURIComponent);\n};\n\nfunction stringifyAttributes(attributes) {\n    // Copy incoming attributes as to not alter the original object..\n    attributes = Object.assign({}, attributes);\n    if (typeof attributes.expires === 'number') {\n        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);\n    }\n    if (attributes.expires != null) {\n        attributes.expires = attributes.expires.toUTCString();\n    }\n    return (Object.entries(attributes)\n        .filter(([key, value]) => value != null && value !== false)\n        // Considers RFC 6265 section 5.2:\n        // ...\n        // 3.  If the remaining unparsed-attributes contains a %x3B (\";\")\n        //     character:\n        // Consume the characters of the unparsed-attributes up to,\n        // not including, the first %x3B (\";\") character.\n        // ...\n        .map(([key, value]) => value === true ? `; ${key}` : `; ${key}=${value.split(';')[0]}`)\n        .join(''));\n}\nfunction get(name, decodeValue, decodeName) {\n    const scan = /(?:^|; )([^=]*)=([^;]*)/g;\n    const jar = {};\n    let match;\n    while ((match = scan.exec(document.cookie)) != null) {\n        try {\n            const found = decodeName(match[1]);\n            jar[found] = decodeValue(match[2], found);\n            if (name === found) {\n                break;\n            }\n        }\n        catch (e) { }\n    }\n    return name != null ? jar[name] : jar;\n}\nconst DEFAULT_CODEC = Object.freeze({\n    decodeName: decodeName,\n    decodeValue: decodeValue,\n    encodeName: encodeName,\n    encodeValue: encodeValue\n});\nconst DEFAULT_ATTRIBUTES = Object.freeze({\n    path: '/'\n});\nfunction setCookie(name, value, attributes = DEFAULT_ATTRIBUTES, { encodeValue: encodeValue$1 = encodeValue, encodeName: encodeName$1 = encodeName } = {}) {\n    return (document.cookie = `${encodeName$1(name)}=${encodeValue$1(value, name)}${stringifyAttributes(attributes)}`);\n}\nfunction getCookie(name, { decodeValue: decodeValue$1 = decodeValue, decodeName: decodeName$1 = decodeName } = {}) {\n    return get(name, decodeValue$1, decodeName$1);\n}\nfunction getCookies({ decodeValue: decodeValue$1 = decodeValue, decodeName: decodeName$1 = decodeName } = {}) {\n    return get(undefined, decodeValue$1, decodeName$1);\n}\nfunction removeCookie(name, attributes = DEFAULT_ATTRIBUTES) {\n    setCookie(name, '', Object.assign({}, attributes, {\n        expires: -1\n    }));\n}\n\nfunction init(converter, defaultAttributes) {\n    const api = {\n        set: function (name, value, attributes) {\n            return setCookie(name, value, Object.assign({}, this.attributes, attributes), {\n                encodeValue: this.converter.write\n            });\n        },\n        get: function (name) {\n            if (arguments.length === 0) {\n                return getCookies(this.converter.read);\n            }\n            if (name == null) {\n                return;\n            }\n            return getCookie(name, this.converter.read);\n        },\n        remove: function (name, attributes) {\n            removeCookie(name, Object.assign({}, this.attributes, attributes));\n        },\n        withAttributes: function (attributes) {\n            return init(this.converter, Object.assign({}, this.attributes, attributes));\n        },\n        withConverter: function (converter) {\n            return init(Object.assign({}, this.converter, converter), this.attributes);\n        }\n    };\n    const config = {\n        attributes: { value: Object.freeze(defaultAttributes) },\n        converter: { value: Object.freeze(converter) }\n    };\n    return Object.create(api, config);\n}\nvar compat = init({ read: DEFAULT_CODEC.decodeValue, write: DEFAULT_CODEC.encodeValue }, DEFAULT_ATTRIBUTES);\n\n\n\n\n//# sourceURL=webpack://cardgames/./node_modules/typescript-cookie/dist/typescript-cookie.mjs?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./typescript/mau-mau.ts");
/******/ 	
/******/ })()
;