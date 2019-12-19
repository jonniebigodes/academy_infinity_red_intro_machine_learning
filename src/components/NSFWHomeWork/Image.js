import React, { useState, useEffect, useRef } from "react";
import "../../assets/App.css";
/**
 * Image component
 * @param {Object} image image information
 * @param {Object} dataModel the datamodel representation
 */
export default ({ image, dataModel }) => {
    const [imageInformation, setImageInformation] = useState(image);
    const imageRef = useRef();
    useEffect(() => {
      const classifyImage = async () => {
        const predictions = await dataModel.classify(imageRef.current);
        setImageInformation({
          ...imageInformation,
          safeContent:
            predictions[0].className === "Neutral" ||
            predictions[0].className === "Drawing",
          preditionValue: (Math.floor(predictions[0].probability*100)).toFixed(2),
          imageCategory: predictions[0].className,
          probabilityList: predictions.map(item => {
            return {
              category: item.className,
              percentage: (Math.floor(item.probability*100)).toFixed(2)
            };
          })
        });
      };
      classifyImage();
    }, []);
    return (
      <div className="file-item">
        <img
          alt={`img - ${image.id}`}
          src={image.src}
          className={
            imageInformation.safeContent ? "file-img" : "nsfw-file-image"
          }
          ref={imageRef}
        />
        <div>
          <span style={{
            overflow:'hidden',
            whiteSpace:'nowrap',
            textOverflow: 'ellipsis',
            width:'300px',
            display:'inline-block'
          }}>
            Image{" "}
            {imageInformation.safeContent ? imageInformation.name : "######"}
          </span>
          <span><p>{imageInformation.safeContent ? "ok image" : "no no image"}</p></span>
          <span><p>Categorized as {imageInformation.imageCategory} with a prediction value of {imageInformation.preditionValue}%</p></span>
          <div>
            {imageInformation.probabilityList.map((item,index) => (
              <span key={`image_category_${index}`}>
                <p>{item.category} with {item.percentage}%</p>
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };