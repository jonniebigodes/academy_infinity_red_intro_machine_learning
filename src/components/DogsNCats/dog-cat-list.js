import React, { useEffect, useRef } from "react"
import * as tf from "@tensorflow/tfjs"
import * as DogsNCats from "dogs-n-cats"

import "../../assets/dogs.css"

const DogsNCatsList = () => {
  const gridCatsDogs = useRef()
  useEffect(() => {
    const loadCatsNDogs = async () => {
      const randomResult = await DogsNCats.load()
      const [images] = randomResult.training.get(15)
      const listOfDogsCats = tf.tidy(() => {
        const listOfImages = tf.unstack(images)
        return tf.concat(listOfImages, 1)
      })
      await tf.browser.toPixels(listOfDogsCats, gridCatsDogs.current)
      listOfDogsCats.dispose()
      //
    }
    loadCatsNDogs()
  }, [])

  return <canvas ref={gridCatsDogs} />
}
export default DogsNCatsList
