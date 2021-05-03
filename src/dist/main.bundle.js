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

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.css */ \"./css/style.css\");\n\r\n\r\nclass Handwriting {\r\n\tconstructor() {\r\n\r\n\t\tlet $ = document.getElementById.bind(document);\r\n    this.model = new Model;\r\n    this.drawingLineWidthEl = $(\"drawing-line-width\");\r\n    this.clearEl = $(\"clear-canvas\");\r\n    this.outputEl = $(\"output\");\r\n\r\n    this.canvas = new fabric.Canvas('handwriting', {\r\n      backgroundColor: \"#fff\",\r\n      isDrawingMode: true\r\n    });\r\n    this.canvas.freeDrawingBrush.color = \"#000\";\r\n    this.resetCanvas(true);\r\n    this.resizeCanvas();\r\n\r\n    this.model.isWarmedUp.then(this.bindEvents.bind(this));\r\n\t}\r\n\r\n\tresetCanvas(removeText = true) {\r\n\r\n    this.canvas.clear();\r\n    this.canvas.backgroundColor = \"#ECF5EB\";\r\n\r\n\t\tif(removeText) {\r\n      this.outputEl.value = \"\";\r\n      this.model.clearInput();\r\n\t\t}\r\n\t}\r\n\r\n\tresizeCanvas() {\r\n\r\n    this.canvas.setDimensions({\r\n      width: window.innerWidth - 900,\r\n      height: window.innerHeight - 500\r\n    });\r\n    this.canvas.calcOffset();\r\n    this.canvas.renderAll();\r\n\t}\r\n\r\n\tcaptureDrawing() {\r\n\r\n\t\tlet group = new fabric.Group(this.canvas.getObjects()),\r\n\t\t\t{ left, top, width, height } = group,\r\n\t\t\tscale = window.devicePixelRatio,\r\n\t\t\timage = this.canvas.contextContainer.getImageData(left*scale, top*scale, width*scale, height*scale);\r\n    this.resetCanvas(false);\r\n    return image;\r\n\r\n  }\r\n  \r\n\tshowRect(dimension) {\r\n\r\n\t\tlet options = {\r\n\t\t\t\tfill: 'rgba(255,127,39,.5)',\r\n\t\t\t\t...dimension\r\n\t\t\t};\r\n\r\n    this.canvas.add(new fabric.Rect(options));\r\n\t}\r\n\tshowCapturedData(pixelData) {\r\n\t\tlet can = document.getElementById(\"output\"),\r\n\t\t\tctx = can.getContext(\"2d\");\r\n\t\tcan.width = pixelData.width;\r\n\t\tcan.height = pixelData.height;\r\n\t\tctx.putImageData(pixelData, 0, 0);\r\n\t}\r\n\r\n\tbindEvents() {\r\n\r\n    this.outputEl.placeholder = \"output\";\r\n    this.clearEl.onclick = this.resetCanvas.bind(this);\r\n\r\n\t\tthis.drawingLineWidthEl.onchange = ({target}) => {\r\n      this.canvas.freeDrawingBrush.width = parseInt(target.value, 10) || 1;\r\n      target.previousSibling.innerHTML = target.value;\r\n\t\t};\r\n\r\n    this.canvas.freeDrawingBrush.width = parseInt(this.drawingLineWidthEl.value, 10) || 1;\r\n    this.drawingLineWidthEl.previousSibling.innerHTML = this.canvas.freeDrawingBrush.width;\r\n\r\n\t\tlet timerId = null,\r\n\t\t\tisTouchDevice = 'ontouchstart' in window,\r\n\t\t\ttimeOutDuration = isTouchDevice ? 400 : 800,\r\n\t\t\thasTimedOut = true;\r\n\r\n\t\tthis.canvas.on(\"mouse:down\", (options) => {\r\n      if (hasTimedOut) this.resetCanvas(false);\r\n      hasTimedOut = false;\r\n\t\t\t\tif(timerId) {\r\n          clearTimeout(timerId);\r\n          timerId = null;\r\n\t\t\t\t}\r\n\t\t\t})\r\n\t\t\t.on(\"mouse:up\", () => {\r\n\t\t\t\ttimerId = setTimeout(() => {\r\n          hasTimedOut = true;\r\n          let [character, probability] = this.model.predict(this.captureDrawing());\r\n          this.outputEl.value += ( true) ? character : 0;\r\n\t\t\t\t}, timeOutDuration)\r\n\t\t\t});\r\n\r\n    window.onresize = this.resizeCanvas.bind(this);\r\n\t}\r\n}\r\n\r\nconst handwriting = new Handwriting;\n\n//# sourceURL=webpack://data_mining_kmutnb_final/./js/index.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./css/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./css/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"/* body { */\\n\\n\\n/* height: 100vh; */\\n\\n\\n/* background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%); */\\n\\n\\n/* overflow: hidden; */\\n\\n\\n/* filter: drop-shadow(0 0 10px white); */\\n\\n\\n/* } */\\n\\nbody {\\n    margin: 0;\\n    height: 100vh;\\n    display: flex;\\n    align-items: center;\\n    justify-content: center;\\n    background-image: linear-gradient(#2196f3, #81d4fa);\\n    /* filter: drop-shadow(0 0 5px white); */\\n    /* background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%); */\\n}\\n\\n.card {\\n    border-radius: 0px !important;\\n}\\n\\n.card1 {\\n    /* background-image: linear-gradient(#2196f3, #81d4fa); */\\n    background-color: white;\\n    padding: 30px 20px 30px 50px;\\n}\\n\\n\\n/* btn */\\n\\n.btn-hover {\\n    width: 200px;\\n    font-size: 16px;\\n    font-weight: 600;\\n    color: #fff;\\n    cursor: pointer;\\n    margin: 20px;\\n    height: 55px;\\n    text-align: center;\\n    border: none;\\n    background-size: 300% 100%;\\n    border-radius: 50px;\\n    moz-transition: all 0.4s ease-in-out;\\n    -o-transition: all 0.4s ease-in-out;\\n    -webkit-transition: all 0.4s ease-in-out;\\n    transition: all 0.4s ease-in-out;\\n}\\n\\n.btn-hover:hover {\\n    background-position: 100% 0;\\n    moz-transition: all 0.4s ease-in-out;\\n    -o-transition: all 0.4s ease-in-out;\\n    -webkit-transition: all 0.4s ease-in-out;\\n    transition: all 0.4s ease-in-out;\\n}\\n\\n.btn-hover:focus {\\n    outline: none;\\n}\\n\\n.btn-hover.color-10 {\\n    margin-left: auto;\\n    margin-right: auto;\\n    background-image: linear-gradient(to right, #ed6ea0, #ec8c69, #f7186a, #fbb03b);\\n    box-shadow: 0 4px 15px 0 rgba(236, 116, 149, 0.75);\\n}\\n\\n.btn-hover.color-9 {\\n    background-image: linear-gradient(to right, #25aae1, #4481eb, #04befe, #3f86ed);\\n    box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);\\n}\\n\\n.form-outline {\\n    margin-left: auto;\\n    margin-right: auto;\\n}\\n\\n\\n/* process */\\n\\n@media only screen and(max-width: 1024px) {\\n    #ex1 {\\n        width: 50% !important;\\n    }\\n}\\n\\n#ex1 {\\n    width: 100%;\\n}\\n\\n#ex1RangePicker .rangepicker-selection {\\n    background: #bababa;\\n}\\n\\n\\n/* input */\\n\\n.tb {\\n    display: table;\\n    width: 100%;\\n}\\n\\n.td {\\n    display: table-cell;\\n    vertical-align: middle;\\n}\\n\\ninput,\\nbutton {\\n    color: #fff;\\n    font-family: Nunito;\\n    padding: 0;\\n    margin: 0;\\n    border: 0;\\n    background-color: transparent;\\n}\\n\\n#cover {\\n    /* position: absolute; */\\n    top: 50%;\\n    left: 0;\\n    right: 0;\\n    /* width: 550px; */\\n    padding: 35px;\\n    /* margin: -83px auto 0 auto; */\\n    background-color: #ff7575;\\n    border-radius: 20px;\\n    box-shadow: 0 10px 40px #ff7c7c, 0 0 0 20px #ffffffeb;\\n    transform: scale(0.6);\\n}\\n\\nform {\\n    height: 96px;\\n}\\n\\ninput[type=\\\"text\\\"] {\\n    width: 100%;\\n    height: 96px;\\n    font-size: 60px;\\n    line-height: 1;\\n    color: #ff7575;\\n    letter-spacing: 5px;\\n}\\n\\ninput[type=\\\"text\\\"]::placeholder {\\n    color: #e16868;\\n}\\n\\n#s-cover {\\n    width: 1px;\\n    padding-left: 35px;\\n}\\n\\nbutton {\\n    position: relative;\\n    display: block;\\n    width: 84px;\\n    height: 96px;\\n    cursor: pointer;\\n}\\n\\n#s-circle {\\n    position: relative;\\n    top: -8px;\\n    left: 0;\\n    width: 50px;\\n    height: 50px;\\n    margin-top: 0;\\n    border-width: 15px;\\n    border: 15px solid #fff;\\n    background-color: transparent;\\n    border-radius: 50%;\\n    transition: 0.5s ease all;\\n}\\n\\nbutton span {\\n    position: absolute;\\n    top: 68px;\\n    left: 27px;\\n    display: block;\\n    width: 45px;\\n    height: 15px;\\n    background-color: transparent;\\n    border-radius: 10px;\\n    transform: rotateZ(52deg);\\n    transition: 0.5s ease all;\\n}\\n\\nbutton span:before,\\nbutton span:after {\\n    content: \\\"\\\";\\n    position: absolute;\\n    bottom: 0;\\n    right: 0;\\n    width: 45px;\\n    height: 15px;\\n    background-color: #fff;\\n    border-radius: 10px;\\n    transform: rotateZ(0);\\n    transition: 0.5s ease all;\\n}\\n\\n#s-cover:hover #s-circle {\\n    top: -1px;\\n    width: 67px;\\n    height: 15px;\\n    border-width: 0;\\n    background-color: #fff;\\n    border-radius: 20px;\\n}\\n\\n#s-cover:hover span {\\n    top: 50%;\\n    left: 56px;\\n    width: 25px;\\n    margin-top: -9px;\\n    transform: rotateZ(0);\\n}\\n\\n#s-cover:hover button span:before {\\n    bottom: 11px;\\n    transform: rotateZ(52deg);\\n}\\n\\n#s-cover:hover button span:after {\\n    bottom: -11px;\\n    transform: rotateZ(-52deg);\\n}\\n\\n#s-cover:hover button span:before,\\n#s-cover:hover button span:after {\\n    right: -6px;\\n    width: 40px;\\n    background-color: #fff;\\n}\\n\\n#ytd-url {\\n    display: block;\\n    position: fixed;\\n    right: 0;\\n    bottom: 0;\\n    padding: 10px 14px;\\n    margin: 20px;\\n    color: #fff;\\n    font-family: Nunito;\\n    font-size: 14px;\\n    text-decoration: none;\\n    background-color: #ff7575;\\n    border-radius: 4px;\\n    box-shadow: 0 10px 20px -5px rgba(255, 117, 117, 0.86);\\n    z-index: 125;\\n}\\n\\n* {\\n    outline: none;\\n    box-sizing: border-box;\\n}\\n\\n#handwriting {\\n    cursor: crosshair;\\n    width: 100%;\\n    height: 50%;\\n}\\n\\n#drawing-mode {\\n    margin-bottom: 10px;\\n    vertical-align: top;\\n    float: left;\\n}\\n\\n\\n/* #drawing-mode-options {\\n    display: block;\\n    position: absolute;\\n    top: 0;\\n    right: 0;\\n    background: #fff;\\n    padding: 10px;\\n    z-index: 1;\\n} */\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://data_mining_kmutnb_final/./css/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === \"string\") {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, \"\"]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://data_mining_kmutnb_final/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./css/style.css":
/*!***********************!*\
  !*** ./css/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./css/style.css\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__.default, options);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});\n\n//# sourceURL=webpack://data_mining_kmutnb_final/./css/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : 0;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://data_mining_kmutnb_final/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./js/index.js");
/******/ 	
/******/ })()
;