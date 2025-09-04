// import React from "react";
// import { useAppSelector } from "../../context/hooks";



// const ProductImages: React.FC = () => {
//   // const [selected, setSelected] = useState(images[0]);

//    const {  product } = useAppSelector((state) => state.product);
//    const images=product?.image;

//   return (
//     <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-4">
//       {/* Thumbnails */}
//       <div className="flex md:flex-col gap-3">
//         {images.map((img:any, i:any) => (
//           <img
//             key={i}
//             src={img}
//             alt="img"
//             // onClick={() => setSelected(img)}
//             className={`w-16 h-16 object-cover border cursor-pointer border-gray-200`}
//           />
//         ))}
//       </div>

//       {/* Main Image */}
//       <div className="flex-1 bg-gray-100 flex items-center justify-center p-4">
//         {/* <img src={selected} alt="img" className="max-h-96 object-contain" /> */} 
//         <img src={product?.image[0]} alt="img" className="max-h-96 object-contain" /> 
//       </div>
//     </div>
//   );
// };

// export default ProductImages;


import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../context/hooks";

const ProductImages: React.FC = () => {
  const { product } = useAppSelector((state) => state.product);
  const images = product?.image || []; // Default to an empty array to prevent errors

  // State to hold the currently displayed main image
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // State to hold the array of images to be shown as thumbnails
  const [thumbnailImages, setThumbnailImages] = useState<string[]>([]);

  useEffect(() => {
    // This effect runs when the 'images' array changes (e.g., when the product loads)
    if (images.length > 0) {
      // 1. Set the default main image to the first one in the array
      setSelectedImage(images[0]);

      // 2. Apply the conditional logic for thumbnails
      if (images.length === 1) {
        // If there's only one image, create an array of 4 repeating thumbnails
        setThumbnailImages(Array(4).fill(images[0]));
      } else {
        // If there are multiple images, use the original array for thumbnails
        setThumbnailImages(images);
      }
    }
  }, [images]); // The dependency array ensures this runs when 'images' is updated

  // Handler to change the main image when a thumbnail is clicked
  const handleThumbnailClick = (img: string) => {
    // No need to do anything if there's only one unique image
    if (images.length > 1) {
      setSelectedImage(img);
    }
  };
  
  // Don't render anything if there are no images yet
  if (!images || images.length === 0) {
    return (
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 rounded-lg h-96">
            <p className="text-gray-500">No images available</p>
        </div>
    );
  }

  return (
    <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 order-first md:order-none">
        {thumbnailImages.map((img: string, i: number) => (
          <img
            key={i}
            src={img}
            alt={`Product thumbnail ${i + 1}`}
            onClick={() => handleThumbnailClick(img)}
            // Add a visual indicator to the selected thumbnail
            className={`w-16 h-16 object-cover border-2 rounded-md cursor-pointer transition-all ${
              selectedImage === img && images.length > 1
                ? "border-blue-500"
                : "border-gray-200 hover:border-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center p-4 rounded-lg">
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Main product"
            className="max-h-96 w-auto object-contain"
          />
        )}
      </div>
    </div>
  );
};

export default ProductImages;

