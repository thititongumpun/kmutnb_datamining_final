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

/***/ "./js/Model.js":
/*!*********************!*\
  !*** ./js/Model.js ***!
  \*********************/
/***/ (() => {

eval("class Model {\r\n\tconstructor() {\r\n\t\tthis.alphabet = \"abcdefghijklmnopqrstuvwxyz\";\r\n    this.characters = \"0123456789\" + this.alphabet.toUpperCase() + this.alphabet;\r\n    this.inputCanvas = document.getElementById(\"input-canvas\");\r\n\t\tthis.isWarmedUp = this.loadModel()\r\n\t\t\t.then(this.warmUp.bind(this))\r\n\t\t\t.then(() => console.info(\"Backend running on:\", tf.getBackend()))\r\n  };\r\n\r\n\tloadModel() {\r\n    console.time(\"Load model\");\r\n    return tf.loadLayersModel(\"/src/model/model.json\").then(model => {\r\n      this._model = model;\r\n      console.timeEnd(\"Load model\")\r\n    });\r\n  };\r\n\r\n\t/**\r\n\t * Runs a prediction with random data to warm up the GPU\r\n\t */\r\n\twarmUp() {\r\n    console.time(\"Warmup\");\r\n    this._model.predict(tf.randomNormal([1, 28, 28, 1])).as1D().dataSync();\r\n\t\tthis.isWarmedUp = true;\r\n    console.timeEnd(\"Warmup\");\r\n  };\r\n\r\n\tpreprocessImage(pixelData) {\r\n\r\n\t\tconst targetDimension = 28,\r\n\t\t\tedgeSize = 2,\r\n\t\t\tresizeDim = targetDimension-edgeSize*2,\r\n\t\t\tpadVertically = pixelData.width > pixelData.height,\r\n\t\t\tpadSize = Math.round((Math.max(pixelData.width, pixelData.height) - Math.min(pixelData.width, pixelData.height))/2),\r\n\t\t\tpadSquare = padVertically ? [[padSize,padSize], [0,0], [0,0]] : [[0,0], [padSize,padSize], [0,0]];\r\n\r\n\t\tlet\ttempImg = null;\r\n\r\n\t\tif(tempImg) tempImg.dispose();\r\n\r\n\t\treturn tf.tidy(() => {\r\n      let tensor = tf.browser.fromPixels(pixelData, 1)\r\n        .pad(padSquare, 255.0);\r\n      \r\n      tensor = tf.image.resizeBilinear(tensor, [resizeDim, resizeDim])\r\n        .pad([[edgeSize, edgeSize], [edgeSize, edgeSize], [0, 0]], 255.0);\r\n\r\n\t\t\ttensor = tf.scalar(1.0).sub(tensor.toFloat().div(tf.scalar(255.0)))\r\n\r\n      tempImg = tf.keep(tf.clone(tensor));\r\n      this.showInput(tempImg);\r\n\r\n      return tensor.expandDims(0);\r\n\t\t});\r\n  };\r\n\r\n\tpredict(pixelData) {\r\n\r\n\t\tif(!this._model) return console.warn(\"Model not loaded...!\");\r\n    console.time(\"Prediction\");\r\n\t\tlet tensor = this.preprocessImage(pixelData),\r\n\t\t\tprediction = this._model.predict(tensor).as1D(),\r\n\t\t\targMax = prediction.argMax().dataSync()[0],\r\n\t\t\tprobability = prediction.max().dataSync()[0],\r\n\t\t\tcharacter = this.characters[argMax];\r\n\r\n    console.log(\"Predicted\", character, \"Probability\", probability);\r\n    console.timeEnd(\"Prediction\");\r\n    return [character, probability];\r\n  };\r\n\r\n\tclearInput() {\r\n\r\n    [...this.inputCanvas.parentElement.getElementsByTagName(\"img\")].map(el => el.remove());\r\n    this.inputCanvas.getContext('2d').clearRect(0, 0, this.inputCanvas.width, this.inputCanvas.height);\r\n  };\r\n\r\n\tshowInput(tempImg) {\r\n\r\n    let legacyImg = new Image;\r\n    legacyImg.src = this.inputCanvas.toDataURL(\"image/png\");\r\n    this.inputCanvas.parentElement.insertBefore(legacyImg, this.inputCanvas);\r\n\r\n    tf.browser.toPixels(tempImg, this.inputCanvas);\r\n  };\r\n\r\n\t/**\r\n\t * Helper function, to easier debug tensors\r\n\t * @param {string} name\r\n\t * @param {tf.tensor} tensor\r\n\t * @param {int} width\r\n\t * @param {int} height\r\n\t */\r\n\tstatic log(name, tensor, width = 28, height = 28) {\r\n\r\n    tensor = tensor.dataSync();\r\n    console.log(\"Tensor name\", name, tensor);\r\n\t\tfor(let i = 0; i<width*height; i+=width) {\r\n      console.log(tensor.slice(i, i + width).reduce((acc, cur) => acc + ((cur === 0 ? \"0\" : \"1\") + \"\").padStart(2)), \"\");\r\n\t\t}\r\n\t}\r\n}\n\n//# sourceURL=webpack://data_mining_kmutnb_final/./js/Model.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/Model.js"]();
/******/ 	
/******/ })()
;