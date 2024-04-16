import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

const ImageContainer = ({ image }) => {
  

  return (<>
 
  
    <div className='container mt-3 p-3 ' style={{ height: "95vh", overflowY: "scroll" }}>
    
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 550: 2, 500: 3, 600: 4 }}>
        <Masonry>
          {image.map((item) => (
            <img src={`../../src/assets/images/${item.imageUrl}`}
              className="p-2 rounded-2 "
              alt={item.image}
              key={item._id}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>

    </div>
    </>)
}

export default ImageContainer
