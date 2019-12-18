import * as tf from "@tensorflow/tfjs"
export const generateTensorDataBw = () =>
  [...Array(20).keys()].map(x => {
    return tf.randomUniform([250, 350, 1], 0, 1)
  })
export const generateTensorDataRGB = () =>
  [...Array(20).keys()].map(x => {
    return tf.randomUniform([250, 350, 3], 0, 1)
  })
export const generateOffTensor=()=> tf.zeros([250, 350])
export const generateOnTensor=()=>tf.ones([250, 350])
