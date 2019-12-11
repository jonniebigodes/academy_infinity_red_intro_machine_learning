import React from "react";
import Image from './Image'
import ImageGif from './ImageGif'
import "../../assets/App.css";
/**
 * ImageList Component
 * @param {Array} images list of images information
 * @param {Object} classifyModel data mode information
 */
const ImageList = ({ images, classifyModel }) => {
  // render each image by calling Image component
  const renderImage = image =>
    image.fileType !== "image/gif" ? (
      <Image
        image={image}
        key={`${image.id}-image`}
        dataModel={classifyModel}
      />
    ) : (
      <ImageGif
        image={image}
        key={`${image.id}-image`}
        dataModel={classifyModel}
      />
    );

  // Return the list of files
  return <section className="file-list">{images.map(renderImage)}</section>;
};

export default ImageList;
