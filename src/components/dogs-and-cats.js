import React, { useEffect, useRef, useState } from "react"
import * as tf from "@tensorflow/tfjs"
import * as DogsNCats from "dogs-n-cats"

export default () => {
  const [currentTensorData, setCurrentTensorData] = useState(null)
  const imageCanvas = useRef()
  useEffect(() => {
    const loadCats = async () => {
      /*
        // fetches a simple cat image from the dataset(training set)
        const result= await DogsNCats.load();
        const [cat,catLabel]= result.cats.get()
         cat.print() 
          tf.browser.toPixels(cat,imageCanvas.current)
         */

      // fetches a random item from the training dataset
      const randomResult = await DogsNCats.load()
      const [dncTensor, dncLabel] = randomResult.training.get()
      setCurrentTensorData(["dog","cat"][dncLabel.dataSync()])
      tf.browser.toPixels(dncTensor, imageCanvas.current)
      //
     
    }
    loadCats()
  }, [])

  return (
    <div>
      <h1>cats n dogs</h1>
      <h2>{currentTensorData}</h2>
      <div>
        <canvas ref={imageCanvas} style={{ width: "32px", height: "32px" }} />
      </div>
    </div>
  )
}
