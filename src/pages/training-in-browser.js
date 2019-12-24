import React, { useEffect,useState} from "react"
import * as tf from "@tensorflow/tfjs"
export default () => {
    const [answerValue,setAnswerValue]=useState([])
  useEffect(() => {
    const trainFizz = async () => {
      // creates a sequential model
      const sequentialModel = tf.sequential()
      // defines the shape and inputs of the model
      sequentialModel.add(
        tf.layers.dense({
          inputShape: [1], // one input
          units: 1, // one node/unit/neuron
        })
      )
      // compiles the model
      sequentialModel.compile({ optimizer: "sgd", loss: "meanSquaredError" })
      // input values initial values
      const xs = tf.tensor([-1, 0, 1, 2, 3, 4])
      const ys = tf.tensor([-5, -2, 1, 4, 7, 10]) // expected outputs
      const history= await sequentialModel.fit(xs,ys,{epochs:500})
      const inputTensor= tf.tensor([10])
      const answer= sequentialModel.predict(inputTensor)

      setAnswerValue(Math.round(answer.dataSync()))
      // cleanup
        tf.dispose([xs,ys,sequentialModel,answer,inputTensor])
      //
    }
    trainFizz()
  }, [])
  return (
    <div>
      <h1>How to train in browser</h1>
      <h1>10 results in {answerValue}</h1>
    </div>
  )
}
