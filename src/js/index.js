import "../css/style.css";
class Handwriting {
	constructor() {

		let $ = document.getElementById.bind(document);
    this.model = new Model;
    this.drawingLineWidthEl = $("drawing-line-width");
    this.clearEl = $("clear-canvas");
    this.outputEl = $("output");

    this.canvas = new fabric.Canvas('handwriting', {
      backgroundColor: "#fff",
      isDrawingMode: true
    });
    this.canvas.freeDrawingBrush.color = "#000";
    this.resetCanvas(true);
    this.resizeCanvas();

    this.model.isWarmedUp.then(this.bindEvents.bind(this));
	}

	resetCanvas(removeText = true) {

    this.canvas.clear();
    this.canvas.backgroundColor = "#D24D57";

		if(removeText) {
      this.outputEl.value = "";
      this.model.clearInput();
		}
	}

	resizeCanvas() {

    this.canvas.setDimensions({
      width: window.innerWidth - 900,
      height: window.innerHeight - 500
    });
    this.canvas.calcOffset();
    this.canvas.renderAll();
	}

	captureDrawing() {

		let group = new fabric.Group(this.canvas.getObjects()),
			{ left, top, width, height } = group,
			scale = window.devicePixelRatio,
			image = this.canvas.contextContainer.getImageData(left*scale, top*scale, width*scale, height*scale);
    this.resetCanvas(false);
    return image;

  }
  
	showRect(dimension) {

		let options = {
				fill: 'rgba(255,127,39,.5)',
				...dimension
			};

    this.canvas.add(new fabric.Rect(options));
	}
	showCapturedData(pixelData) {
		let can = document.getElementById("output"),
			ctx = can.getContext("2d");
		can.width = pixelData.width;
		can.height = pixelData.height;
		ctx.putImageData(pixelData, 0, 0);
	}

	bindEvents() {

    this.outputEl.placeholder = "output";
    this.clearEl.onclick = this.resetCanvas.bind(this);

		this.drawingLineWidthEl.onchange = ({target}) => {
      this.canvas.freeDrawingBrush.width = parseInt(target.value, 10) || 1;
      target.previousSibling.innerHTML = target.value;
		};

    this.canvas.freeDrawingBrush.width = parseInt(this.drawingLineWidthEl.value, 10) || 1;
    this.drawingLineWidthEl.previousSibling.innerHTML = this.canvas.freeDrawingBrush.width;

		let timerId = null,
			isTouchDevice = 'ontouchstart' in window,
			timeOutDuration = isTouchDevice ? 400 : 800,
			hasTimedOut = true;

		this.canvas.on("mouse:down", (options) => {
      if (hasTimedOut) this.resetCanvas(false);
      hasTimedOut = false;
				if(timerId) {
          clearTimeout(timerId);
          timerId = null;
				}
			})
			.on("mouse:up", () => {
				timerId = setTimeout(() => {
          hasTimedOut = true;
          let [character, probability] = this.model.predict(this.captureDrawing());
          this.outputEl.value += (true || probability > 0.5) ? character : "?";
				}, timeOutDuration)
			});

    window.onresize = this.resizeCanvas.bind(this);
	}
}

class Model {
	constructor() {
		this.alphabet = "abcdefghijklmnopqrstuvwxyz";
    this.characters = "0123456789" + this.alphabet.toUpperCase() + this.alphabet;
    this.inputCanvas = document.getElementById("input-canvas");
		this.isWarmedUp = this.loadModel()
			.then(this.warmUp.bind(this))
			.then(() => console.info("Backend running on:", tf.getBackend()))
  };

	loadModel() {
    console.time("Load model");
    return tf.loadLayersModel("../model/model.json").then(model => {
      this._model = model;
			console.timeEnd("Load model")
    });
	};

	/**
	 * Runs a prediction with random data to warm up the GPU
	 */
	warmUp() {
    console.time("Warmup");
    this._model.predict(tf.randomNormal([1, 28, 28, 1])).as1D().dataSync();
		this.isWarmedUp = true;
		console.timeEnd("Warmup");
  };

	preprocessImage(pixelData) {

		const targetDimension = 28,
			edgeSize = 2,
			resizeDim = targetDimension-edgeSize*2,
			padVertically = pixelData.width > pixelData.height,
			padSize = Math.round((Math.max(pixelData.width, pixelData.height) - Math.min(pixelData.width, pixelData.height))/2),
			padSquare = padVertically ? [[padSize,padSize], [0,0], [0,0]] : [[0,0], [padSize,padSize], [0,0]];

		let	tempImg = null;

		if(tempImg) tempImg.dispose();

		return tf.tidy(() => {
      let tensor = tf.browser.fromPixels(pixelData, 1)
        .pad(padSquare, 255.0);
      
      tensor = tf.image.resizeBilinear(tensor, [resizeDim, resizeDim])
        .pad([[edgeSize, edgeSize], [edgeSize, edgeSize], [0, 0]], 255.0);

			tensor = tf.scalar(1.0).sub(tensor.toFloat().div(tf.scalar(255.0)))

      tempImg = tf.keep(tf.clone(tensor));
      this.showInput(tempImg);

      return tensor.expandDims(0);
		});
  };

	predict(pixelData) {

		if(!this._model) return console.warn("Model not loaded...!");
    console.time("Prediction");
		let tensor = this.preprocessImage(pixelData),
			prediction = this._model.predict(tensor).as1D(),
			argMax = prediction.argMax().dataSync()[0],
			probability = prediction.max().dataSync()[0],
			character = this.characters[argMax];

    console.log("Predicted", character, "Probability", probability);
    console.timeEnd("Prediction");
    return [character, probability];
  };

	clearInput() {

    [...this.inputCanvas.parentElement.getElementsByTagName("img")].map(el => el.remove());
    this.inputCanvas.getContext('2d').clearRect(0, 0, this.inputCanvas.width, this.inputCanvas.height);
  };

	showInput(tempImg) {

    let legacyImg = new Image;
    legacyImg.src = this.inputCanvas.toDataURL("image/png");
    this.inputCanvas.parentElement.insertBefore(legacyImg, this.inputCanvas);

    tf.browser.toPixels(tempImg, this.inputCanvas);
  };

	/**
	 * Helper function, to easier debug tensors
	 * @param {string} name
	 * @param {tf.tensor} tensor
	 * @param {int} width
	 * @param {int} height
	 */
	static log(name, tensor, width = 28, height = 28) {

    tensor = tensor.dataSync();
    console.log("Tensor name", name, tensor);
		for(let i = 0; i<width*height; i+=width) {
			console.log(tensor.slice(i, i + width).reduce((acc, cur) => acc + ((cur === 0 ? "0" : "1") + "").padStart(2)), "");
		}
	}
}

const handwriting = new Handwriting;