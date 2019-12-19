import React, { useEffect, useRef, useState } from "react"
import * as tf from "@tensorflow/tfjs"
import * as DogsNCats from "dogs-n-cats"
import Footer from '../components/Footer'
import '../assets/dogs.css'
export default () => {
  const gridCatsDogs = useRef()
  useEffect(() => {
    const loadCatsNDogs = async () => {
      const randomResult = await DogsNCats.load()
      const [images]=randomResult.training.get(15)
      
      const listOfDogsCats= tf.tidy(()=>{
          const listOfImages= tf.unstack(images)
          return tf.concat(listOfImages,1)
      })
      tf.browser.toPixels(listOfDogsCats, gridCatsDogs.current)
      //
    }
    loadCatsNDogs()
  }, [])

  return (
    <div className="dogApp">
      <h1>Cats and Dogs implementation</h1>
      <div className="listofDogs">
        <canvas ref={gridCatsDogs} />
      </div>
      <Footer/>
    </div>
  )
}
