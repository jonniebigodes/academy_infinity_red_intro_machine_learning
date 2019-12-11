import React, { useCallback, useState,useEffect } from "react";
import * as nsfwjs from 'nsfwjs'
import DropZone from "../components/NSFWHomeWork/DropZone";
import ImageList from '../components/NSFWHomeWork/ImageList'
import Footer from '../components/Footer'
import uuid from "uuid/v4";
import "../assets/App.css";

function NsfwHomework() {
  const [images, setImages] = useState([]);
  const [NSFWModel,setNSFWModel]= useState(null)

  // loads the model on component mount
  useEffect(()=>{
    const loadNSFWDataModel= async ()=>{
      const nsfwInfo= await nsfwjs.load()
      setNSFWModel(nsfwInfo)
    }
    loadNSFWDataModel()
  },[])

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.map(file => {
      const reader = new FileReader();
      reader.onload = async function(e) {
        setImages(prevState => [
          ...prevState,
          {
            id: uuid(),
            name:file.name,
            src: e.target.result,
            fileType:file.type,
            safeContent:false,
            preditionValue:0,
            probabilityList:[],
            imageCategory:''
          }
        ]);
      };
      reader.readAsDataURL(file)
      return file
    });
  }, []);
  return (
    <div className="nsfwApp">
      <h1>Lecture NSFW implementation</h1>
      <DropZone onDrop={onDrop} />
      <ImageList images={images} classifyModel={NSFWModel}/>
      <Footer/>
    </div>
    
  );
}

export default NsfwHomework;
