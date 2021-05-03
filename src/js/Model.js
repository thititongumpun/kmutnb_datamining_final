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
    return tf.loadLayersModel("/src/model/model.json").then(model => {
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