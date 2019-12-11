import React, { useState, useEffect, useRef } from "react";
import "../../assets/App.css";
/**
 * Gif Image component (not working)
 * @param {Object} image image information
 * @param {Object} dataModel the datamodel representation
 */
export default ({ image, dataModel }) => {
  const [gifImageInformation, setgifImageInformation] = useState(image);

  const gifRef = useRef();
  useEffect(() => {
    const classifyGifImage = async () => {
      const framePredictions = await dataModel.classifyGif(gifRef.current);
      const MergedFramedPredictions = [].concat(...framePredictions);
      const nsfwWords = ["Hentai", "Sexy", "Porn"];
      const isGifNSFW = MergedFramedPredictions.some(x =>
        nsfwWords.includes(x.className)
      );
      setgifImageInformation({
        ...gifImageInformation,
        safeContent: !isGifNSFW,
        preditionValue: Math.floor(
          MergedFramedPredictions[0].probability * 100
        ).toFixed(2),
        imageCategory: MergedFramedPredictions[0].className,
        probabilityList: MergedFramedPredictions.slice(0, 5).map(item => {
          return {
            category: item.className,
            percentage: Math.floor(
              MergedFramedPredictions[0].probability * 100
            ).toFixed(2)
          };
        })
      });
    };
    classifyGifImage();
  }, []);

  return (
    <div className={`file-item `}>
      <div className={`${gifImageInformation.safeContent?null:'blur-gif'}`}>
        <img
            alt={`img - ${image.id}`}
            src={gifImageInformation.src}
          
            ref={gifRef}
          />
      </div>
       
      <div>
        <span>
          Image{" "}
          {gifImageInformation.safeContent
            ? gifImageInformation.name
            : "######"}{" "}
          is a {gifImageInformation.safeContent ? "ok image" : "no no image"}
        </span>
        <span>
          <p>
            Categorized as {gifImageInformation.imageCategory} with a prediction
            value of {gifImageInformation.preditionValue}%
          </p>
        </span>
        <div>
          {gifImageInformation.probabilityList.map((item, index) => (
            <span key={`gif_category_${index}`}>
              <p>
                {item.category} with {item.percentage}%
              </p>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
