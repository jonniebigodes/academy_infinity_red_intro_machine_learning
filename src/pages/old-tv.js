import React, { useEffect, useState, useRef } from "react"
import * as tf from "@tensorflow/tfjs"
import stockTv from "../assets/tv-clipart-cartoon-14-transparent.png"
import GhostImage from "../assets/ghost-icon.png"
import "../assets/oldtv.css"
import Footer from "../components/Footer"
import { generateTensorDataBw,generateTensorDataRGB,generateOffTensor,generateOnTensor } from '../utils/helpers'
import useInterval from '../hooks/useInterval'
export default () => {
  const [offTensor,setOffTensor]= useState(generateOffTensor())
  const [onTensor,setOnTensor]= useState(generateOnTensor())
  const [tvOn, setTvOn] = useState(false)
  const [selectedChannel, setselectedChannel] = useState("")
  const [currentTensor, setCurrentTensor] = useState(0)
  const [bwTensors, setBWTensors] = useState(null)
  const [rgbTensors, setRgbTensors] = useState(null)
  const [noiseImageTensor,setNoiseImageTensors]= useState(null)
  const tvCanvas = useRef()
  const ghostImageRef = useRef()

  useEffect(() => {

    setBWTensors(generateTensorDataBw())
    setRgbTensors(generateTensorDataRGB())
    tf.browser.toPixels(offTensor, tvCanvas.current)
    console.log(`useeffect ghostImageRef.current.width:${ghostImageRef.current.width}`)
    const imageToTensor=tf.image.resizeBilinear(
      tf.browser.fromPixels(ghostImageRef.current),
      [250, 250],
      true
    )
     const imageWithNoise= [...Array(20).keys()].map(x => {
      return tf.randomUniform([250, 250, 3], 0, 255, "int32").add(imageToTensor)
      .div(512);
    })
    setNoiseImageTensors(imageWithNoise)
    console.log(`did mount num tensor:${tf.memory().numTensors}`)
    
    // testing disposal of tensors
    imageToTensor.dispose()
    //
  }, [])
  useInterval(
    () => {
      if (selectedChannel !== "") {
        console.log(`effect num tensors:${tf.memory().numTensors}`)
        let TensorInfo = null
        if (selectedChannel === "bw") {
          TensorInfo = bwTensors[currentTensor]
          tf.browser.toPixels(TensorInfo, tvCanvas.current)
        }
        if (selectedChannel === "rgb") {
          TensorInfo = rgbTensors[currentTensor]
          tf.browser.toPixels(TensorInfo, tvCanvas.current)
        }
        if (selectedChannel === "img") {
          TensorInfo = noiseImageTensor[currentTensor]
          tf.browser.toPixels(TensorInfo, tvCanvas.current)
        }
        setCurrentTensor(
          currentTensor >= bwTensors.length - 1 ? 0 : currentTensor + 1
        )
      }
    },
    tvOn ? 50 : null
  )

  const onTvOnClick = async () => {
    setTvOn(!tvOn)
    setCurrentTensor(0)
    setselectedChannel('')
    await tf.browser.toPixels(tvOn?offTensor:onTensor,tvCanvas.current)
    
    
  }
  const handleTvMode=value=>{
    setselectedChannel(tvOn?value:'')
    setCurrentTensor(0)
  }
  return (
    <div className="oldTvApp">
      <h1>old tv homework</h1>
      <div className="tvContainer">
        <canvas ref={tvCanvas} className="screenCanvas"/>
        <img
          src={GhostImage}
          className={`screenCanvas ghost-hidden `}
          ref={ghostImageRef}
         /*  onLoad={onLoadGhostImage} */
          alt="dummy screen"
        />
        <img src={stockTv} alt="tv" className="tvImage" />
        <div className="tvControls">
          <div className="buttonsContainer">
            <button
              onClick={onTvOnClick}
              className={`button-item ${
                tvOn ? "button-item-on" : "button-item-off"
              }`}
            >
              <span className="upBar">
                <b></b>
                <svg viewBox="-5.5 -5.5 71 71" id="circle">
                  <circle
                    cx="30"
                    cy="30"
                    r="30"
                    stroke="white"
                    strokeWidth="11"
                    fill="transparent"
                  ></circle>
                </svg>
              </span>
            </button>
            <button
              onClick={()=>handleTvMode('bw')}
              className="button-item button-bw"
            />

            <button
              onClick={()=>handleTvMode('rgb')}
              className="button-item button-rgb"
            />
            <button
              onClick={()=>handleTvMode('img')}
              className="button-item button-image"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}