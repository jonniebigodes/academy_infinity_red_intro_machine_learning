import React, { useState,useRef} from "react"
import * as tf from "@tensorflow/tfjs"
import StockImage from "../assets/stockimage.jpg"

export default () => {
  const [tensorInfo, setTensorInfo] = useState(null)
  const [imageWidth,setimageWidth]=useState(0)
  const [imageHeight,setimageHeight]=useState(0)
  const imageTensorCanvas= useRef();
  const onImageLoad = e => {
    const imageTensor = tf.browser.fromPixels(e.target)
    imageTensor.print()
    setTensorInfo(imageTensor)
    setimageWidth(imageTensor.shape[1])
    setimageHeight(imageTensor.shape[0])
    tf.browser.toPixels(imageTensor,imageTensorCanvas.current)
  }
  return (
    <div>
      <h1>Example of Image loading with tensorflow</h1>
      <div>
      <img
        /* style={{ width: "400px", height: "400px" }} */
        src={StockImage}
        onLoad={onImageLoad}
        alt="stock tensor"
      />
      <h4>
        Image is {imageWidth}x{imageHeight}
      </h4>
      </div>
      <div>
        <h4>image back from tensor</h4>
        <canvas ref={imageTensorCanvas}/>
      </div>
    </div>
  )
}
