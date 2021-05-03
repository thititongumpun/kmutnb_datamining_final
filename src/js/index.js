// import '../css/style';


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
    this.canvas.backgroundColor = "#ECF5EB";

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

const handwriting = new Handwriting;