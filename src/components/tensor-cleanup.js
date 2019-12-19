import React, { useEffect, useState } from "react"
import * as tf from "@tensorflow/tfjs"
import useInterval from "../hooks/useInterval"
export default () => {
  const [doomedTensor, setDoomedTensor] = useState(null)
  const [currentTensors, setCurrentTensors] = useState(0)
  useEffect(() => {
    const createDummyTensor = async () => {
      setDoomedTensor(tf.tensor([1, 2, 3]))
      setCurrentTensors(tf.memory().numTensors)
    }

    createDummyTensor()
  }, [])
  const cleanupTensor = () => {
    doomedTensor.dispose()
    setCurrentTensors(tf.memory().numTensors)
  }
  const createTensor = () => {
    setDoomedTensor(tf.tensor([1, 2, 3]))
    setCurrentTensors(tf.memory().numTensors)
  }
  const disposeAllTensors = () => {
    const trueSurvivor=tf.tidy(()=>{
        const random1=tf.tensor([1, 2, 3])
        const random2=tf.tensor([4,5,6])
        return tf.concat([random1,random2])
    })
    trueSurvivor.print()
    setCurrentTensors(tf.memory().numTensors)
    trueSurvivor.dispose()
    setCurrentTensors(tf.memory().numTensors)
  }
  return (
    <div>
      <h1>cleanup tensors</h1>
      <div>
        <p>Current Tensors:{currentTensors}</p>
        <button onClick={createTensor}>create tensor</button>
        <button onClick={cleanupTensor}>destroy tensor</button>
        <button onClick={disposeAllTensors}>destroy all tensors</button>
      </div>
    </div>
  )
}
