/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/***/ (() => {

eval("// import '../css/style';\r\n\r\n\r\nclass Handwriting {\r\n\tconstructor() {\r\n\r\n\t\tlet $ = document.getElementById.bind(document);\r\n    this.model = new Model;\r\n    this.drawingLineWidthEl = $(\"drawing-line-width\");\r\n    this.clearEl = $(\"clear-canvas\");\r\n    this.outputEl = $(\"output\");\r\n\r\n    this.canvas = new fabric.Canvas('handwriting', {\r\n      backgroundColor: \"#fff\",\r\n      isDrawingMode: true\r\n    });\r\n    this.canvas.freeDrawingBrush.color = \"#000\";\r\n    this.resetCanvas(true);\r\n    this.resizeCanvas();\r\n\r\n    this.model.isWarmedUp.then(this.bindEvents.bind(this));\r\n\t}\r\n\r\n\tresetCanvas(removeText = true) {\r\n\r\n    this.canvas.clear();\r\n    this.canvas.backgroundColor = \"#ECF5EB\";\r\n\r\n\t\tif(removeText) {\r\n      this.outputEl.value = \"\";\r\n      this.model.clearInput();\r\n\t\t}\r\n\t}\r\n\r\n\tresizeCanvas() {\r\n\r\n    this.canvas.setDimensions({\r\n      width: window.innerWidth - 900,\r\n      height: window.innerHeight - 500\r\n    });\r\n    this.canvas.calcOffset();\r\n    this.canvas.renderAll();\r\n\t}\r\n\r\n\tcaptureDrawing() {\r\n\r\n\t\tlet group = new fabric.Group(this.canvas.getObjects()),\r\n\t\t\t{ left, top, width, height } = group,\r\n\t\t\tscale = window.devicePixelRatio,\r\n\t\t\timage = this.canvas.contextContainer.getImageData(left*scale, top*scale, width*scale, height*scale);\r\n    this.resetCanvas(false);\r\n    return image;\r\n\r\n  }\r\n  \r\n\tshowRect(dimension) {\r\n\r\n\t\tlet options = {\r\n\t\t\t\tfill: 'rgba(255,127,39,.5)',\r\n\t\t\t\t...dimension\r\n\t\t\t};\r\n\r\n    this.canvas.add(new fabric.Rect(options));\r\n\t}\r\n\tshowCapturedData(pixelData) {\r\n\t\tlet can = document.getElementById(\"output\"),\r\n\t\t\tctx = can.getContext(\"2d\");\r\n\t\tcan.width = pixelData.width;\r\n\t\tcan.height = pixelData.height;\r\n\t\tctx.putImageData(pixelData, 0, 0);\r\n\t}\r\n\r\n\tbindEvents() {\r\n\r\n    this.outputEl.placeholder = \"output\";\r\n    this.clearEl.onclick = this.resetCanvas.bind(this);\r\n\r\n\t\tthis.drawingLineWidthEl.onchange = ({target}) => {\r\n      this.canvas.freeDrawingBrush.width = parseInt(target.value, 10) || 1;\r\n      target.previousSibling.innerHTML = target.value;\r\n\t\t};\r\n\r\n    this.canvas.freeDrawingBrush.width = parseInt(this.drawingLineWidthEl.value, 10) || 1;\r\n    this.drawingLineWidthEl.previousSibling.innerHTML = this.canvas.freeDrawingBrush.width;\r\n\r\n\t\tlet timerId = null,\r\n\t\t\tisTouchDevice = 'ontouchstart' in window,\r\n\t\t\ttimeOutDuration = isTouchDevice ? 400 : 800,\r\n\t\t\thasTimedOut = true;\r\n\r\n\t\tthis.canvas.on(\"mouse:down\", (options) => {\r\n      if (hasTimedOut) this.resetCanvas(false);\r\n      hasTimedOut = false;\r\n\t\t\t\tif(timerId) {\r\n          clearTimeout(timerId);\r\n          timerId = null;\r\n\t\t\t\t}\r\n\t\t\t})\r\n\t\t\t.on(\"mouse:up\", () => {\r\n\t\t\t\ttimerId = setTimeout(() => {\r\n          hasTimedOut = true;\r\n          let [character, probability] = this.model.predict(this.captureDrawing());\r\n          this.outputEl.value += ( true) ? character : 0;\r\n\t\t\t\t}, timeOutDuration)\r\n\t\t\t});\r\n\r\n    window.onresize = this.resizeCanvas.bind(this);\r\n\t}\r\n}\r\n\r\nconst handwriting = new Handwriting;\n\n//# sourceURL=webpack://data_mining_kmutnb_final/./js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/index.js"]();
/******/ 	
/******/ })()
;