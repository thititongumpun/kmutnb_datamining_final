const tf = require('@tensorflow/tfjs');
const tfnode = require('@tensorflow/tfjs-node');

export async function loadModel(){
    const handler = tfnode.io.fileSystem('../model/model.json');
    const model = await tf.loadLayersModel(handler);
    console.log("Model loaded")
};


	// loadModel() {
  //   console.time("Load model");
  //   return tf.loadLayersModel("../model/model.json").then(model => {
  //     this._model = model;
  //     console.timeEnd("Load model")
  //   });
	// };