import React, { useEffect, useState } from "react"
import * as tf from "@tensorflow/tfjs"

const numToBinTensor = num =>
  tf.tensor(
    num
      .toString(2)
      .padStart(10, "0")
      .split("")
      .map(Number)
  )
const FizBuzzPage = () => {
  const [numTensors, setNumTensorsLoaded] = useState(0)
  const [fizzResults,setfizzResults]=useState(null)
  useEffect(() => {
    const loadFizModel = async () => {
      const fizzBuzzResult = []
      // Hosted with ❤ by Infinite Red
      const modelPath =
        "https://s3.amazonaws.com/ir_public/ai/fizzbuzz/fizzbuzz-model.json"
      const model = await tf.loadLayersModel(modelPath)
      // STEP 1: create a batch of 100 consecutive numbers to predict
      const first100 = tf.tidy(() =>
        tf.stack([...Array(100).keys()].map(x => numToBinTensor(x + 1)))
      )

      // STEP 2: Run model on input numbers (1 to 100)
      const resultData = await model.predict(first100)
      setNumTensorsLoaded(tf.memory().numTensors)
      // STEP 3: Build list of highest predicted results
      resultData.unstack().forEach((result, index) => {
        const resultData = result.dataSync() // tensor to array
        // find Max prediction index
        const winner = resultData.indexOf(Math.max(...resultData))
        fizzBuzzResult.push([index + 1, "fizz", "buzz", "fizzbuzz"][winner])
        result.dispose()
      })
      first100.dispose()
      resultData.dispose()
      model.dispose()
      setNumTensorsLoaded(tf.memory().numTensors)
      setfizzResults(fizzBuzzResult.join(", "))
    }
    loadFizModel()
  }, [])
  return (
    <div>
      <h1>Fizz Buzz Model example</h1>
     <h3>
         {fizzResults}
     </h3>
      <p>Number of tensors running</p>
      <p>{numTensors}</p>
    </div>
  )
}

export default FizBuzzPage
