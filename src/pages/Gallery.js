import React from 'react'
import Gallery from 'react-grid-gallery';

const ImageGallery = ({images}) => {
  const IMAGES = images
  return (
    <div>
      <div style={{
                    display: "block",
                    minHeight: "1px",
                    width: "100%",
                    border: "1px solid #ddd",
                    overflow: "auto"}}></div>
      <Gallery images={IMAGES} enableImageSelection={false} enableLightbox={false}/>
    </div>
  )
}

export default ImageGallery