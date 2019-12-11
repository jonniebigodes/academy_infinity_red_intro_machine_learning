import React from "react";
import { useDropzone } from "react-dropzone";

const getClassName = (className, isActive) => {
  if (!isActive) return className;
  return `${className} ${className}-active`;
};
const DropZone = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept:'image/jpg,image/jpeg, image/png,image/gif',
    multiple:false
  });
  return (
    <div className={getClassName("dropzone", isDragActive)} {...getRootProps()}>
      <input className="dropzone-input" {...getInputProps()} />
      <div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content">Release to drop the files here</p>
        ) : (
          <p className="dropzone-content">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>
    </div>
  );
};

export default DropZone;
