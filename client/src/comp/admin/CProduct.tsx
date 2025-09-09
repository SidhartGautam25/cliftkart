// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../context/hooks";
// import {
//   createProduct,
//   removeErrors,
//   removeSuccess,
// } from "../../context/admin/adminSlice";
// import { toast, ToastContainer } from "react-toastify";
// import { categories, CatItems } from "../../utils/categories";
// import { tags as Tags } from "../../utils/tags";
// // import { logFormData } from "../../utils/logThings";

// const CProductC: React.FC = () => {
//   // const categories:string[]=["vegetables","fruits"];
//   // const Tags: string[] = ["free", "50% OFF", "30% OFF"];

//   const [id, setId] = useState("");
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [subcat, setSubcat] = useState("");
//   const [issubcat, setIssubcat] = useState(false);
//   // const [catid, setCatid] = useState("");
//   const [subcategories,setSubcategories]=useState<CatItems | null>(null);
//   const [stock, setStock] = useState("");
//   const [image, setImage] = useState<string[]>([]);
//   const [iloading, setIloading] = useState<boolean>(false);
//   // const [imagePreview, setImagePreview] = useState<string[]>([]);
//   const [tags, setTags] = useState<string[]>([]);
//   const [discount, setDiscount] = useState("");
//   const MAX_IMAGES = 5;

//   const { error, success, loading } = useAppSelector((state) => state.admin);

//   const dispatch = useAppDispatch();
//   if (iloading) {
//     toast.success("Image processing");
//   }
//   let items:CatItems | null;
//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedValue = e.target.value;
//     setCategory(selectedValue);
//     items = categories.find((item) => item.str === selectedValue) || null;
//     if (items?.subcategories?.length) {
//       setIssubcat(true);
//       setSubcategories(items);
//     }
//   };

//   // const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const files = e.target.files;
//   //   if (!files) return;
//   //    if (image.length + files.length > MAX_IMAGES) {
//   //     toast.error(`You can only upload a maximum of ${MAX_IMAGES} images.`);
//   //     return;
//   //   }

//   //   const data = new FormData();
//   //   if (files) {
//   //     data.append("file", files[0]);
//   //     data.append("upload_preset", "ppn3qr4u");
//   //     setIloading(true);

//   //     const res = await fetch(
//   //       "https://api.cloudinary.com/v1_1/dkzpbucfz/image/upload",
//   //       {
//   //         method: "POST",
//   //         body: data,
//   //       }
//   //     );
//   //     const file = await res.json();
//   //     setImage(file.secure_url);
//   //     console.log("we are here now ");
//   //     console.log(file.secure_url);
//   //     setIloading(false);
//   //   }
//   //   if (e.target.files?.length) {
//   //     toast.success("Image uploaded selected successfully!");
//   //   }
//   // };


//   const uploadImage = async (e:React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;

//     // Check if the total number of images will exceed the limit
//     if (image.length + files.length > MAX_IMAGES) {
//       toast.error(`You can only upload a maximum of ${MAX_IMAGES} images.`);
//       return;
//     }

//     setIloading(true);

//     // Create an array of upload promises
//     const uploadPromises = Array.from(files).map(async (file) => {
//       const data = new FormData();
//       data.append("file", file);
//       data.append("upload_preset", "ppn3qr4u"); // Your Cloudinary preset

//       const res = await fetch(
//         "https://api.cloudinary.com/v1_1/dkzpbucfz/image/upload", // Your Cloudinary URL
//         {
//           method: "POST",
//           body: data,
//         }
//       );
//       return res.json();
//     });

//     try {
//       // Wait for all uploads to complete
//       const uploadedFiles = await Promise.all(uploadPromises);
//       const newImageUrls = uploadedFiles.map((file) => file.secure_url);

//       // Add the new image URLs to the existing ones
//       setImage((prevImages) => [...prevImages, ...newImageUrls]);
//       toast.success("Images uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading images:", error);
//       toast.error("Something went wrong while uploading images.");
//     } finally {
//       setIloading(false);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // dispatch(createProduct({id,name,price,description,category,stock,image,tags,discount}));
//     //     const myForm = new FormData();
//     //     myForm.set('name', name || '');
//     //     myForm.set('price', price?.toString() || '0');
//     //     myForm.set('description', description || '');
//     //     myForm.set('category', category || '');
//     //     myForm.set('stock', stock?.toString() || '0');
//     //     myForm.set('id', id || '');
//     //     myForm.set('discount', discount?.toString() || '0');

//     //     // Safe array iteration with checks
//     //     if (image && image.length > 0) {
//     //       image.forEach((img) => {
//     //         myForm.append("image", img);
//     //     });
//     // }

//     //     if (tags && tags.length > 0) {
//     //       tags.forEach((tag) => {
//     //         if (tag) {
//     //           myForm.append("tags", tag);
//     //         }
//     //      });
//     //     }
//     //     logFormData(myForm);
//     dispatch(
//       createProduct({
//         id,
//         name,
//         price,
//         description,
//         category,
//         stock,
//         discount,
//         tags,
//         image,
//         subcat
//       })
//     );
//     if(error){
//       toast.error("Please Try Again . Some Error occured while uploading")
//     }else{
//       toast.success("Product created successfully");
//     }

//   };

//   const handleCheckboxChange = (tag: string): void => {
//     setTags((prevTags: string[]) =>
//       prevTags.includes(tag)
//         ? prevTags.filter((t: string) => t !== tag)
//         : [...prevTags, tag]
//     );
//   };

//   //   const createProductImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
//   //   const files = e.target.files;
//   //   console.log("files are ",files);

//   //   if (!files) return;

//   //   const fileArray: File[] = Array.from(files);

//   //   setImage([]);
//   //   // setImagePreview([]);

//   //   fileArray.forEach((file: File) => {
//   //     const reader = new FileReader();
//   //     reader.onload = (): void => {
//   //       if (reader.readyState === 2 && reader.result) {
//   //         const result = reader.result as string;
//   //         console.log("result is ",result);
//   //         // setImagePreview((old: string[]) => [...old, result]);
//   //         setImage((old: string[]) => [...old, result]);
//   //       }
//   //     };
//   //     reader.readAsDataURL(file);
//   //   });
//   // };

//   useEffect(() => {
//     if (error) {
//       toast.error(error, { position: "top-center", autoClose: 6000 });
//       dispatch(removeErrors());
//     }
//     if (success) {
//       toast.success("Product Created successfully", {
//         position: "top-center",
//         autoClose: 6000,
//       });
//       dispatch(removeSuccess());
//       setName("");
//       setPrice("");
//       setDescription("");
//       setCategory("");
//       setStock("");
//       setImage([]);
//       // setImagePreview([]);
//     }
//   }, [dispatch, error, success]);

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-2xl mx-auto">
//         <div className="bg-white rounded-lg shadow-lg p-8">
//           <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
//             Create Product
//           </h1>

//           <form
//             className="space-y-6"
//             encType="multipart/form-data"
//             onSubmit={handleSubmit}
//           >
//             {/* Product Name */}
//             <div className="space-y-2">
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Product Name *
//               </label>
//               <input
//                 id="name"
//                 type="text"
//                 placeholder="Enter Product Name"
//                 required
//                 name="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//               />
//             </div>

//             {/* Product ID */}
//             <div className="space-y-2">
//               <label
//                 htmlFor="id"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Product ID *
//               </label>
//               <input
//                 id="id"
//                 type="text"
//                 placeholder="Enter Id for this product"
//                 required
//                 name="id"
//                 value={id}
//                 onChange={(e) => setId(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//               />
//             </div>

//             {/* Price and Discount Row */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <label
//                   htmlFor="price"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Product Price *
//                 </label>
//                 <input
//                   id="price"
//                   type="number"
//                   placeholder="Enter Product Price"
//                   required
//                   name="price"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor="discount"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Discount (%)
//                 </label>
//                 <input
//                   id="discount"
//                   type="text"
//                   placeholder="Enter Discount"
//                   name="discount"
//                   value={discount}
//                   onChange={(e) => setDiscount(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                 />
//               </div>
//             </div>

//             {/* Description */}
//             <div className="space-y-2">
//               <label
//                 htmlFor="description"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Product Description *
//               </label>
//               <textarea
//                 id="description"
//                 placeholder="Enter Product Description"
//                 required
//                 name="description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 rows={4}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-vertical"
//               />
//             </div>

//             {/* Category */}
//             <div className="space-y-2">
//               <label
//                 htmlFor="category"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Category *
//               </label>
//               <select
//                 id="category"
//                 required
//                 name="category"
//                 value={category}
//                 // onChange={(e) => setCategory(e.target.value)}
//                 onChange={handleCategoryChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//               >
//                 <option value="">Choose a Category</option>
//                 {categories.map((item) => (
//                   <option value={item.str} key={item.id}>
//                     {item.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {issubcat && (
//                <div className="space-y-2">
//               <label
//                 htmlFor="category"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                Sub Category *
//               </label>
//               <select
//                 id="subcat"
//                 required
//                 name="subcat"
//                 value={subcat}
//                 // onChange={(e) => setCategory(e.target.value)}
//                 onChange={(e)=>setSubcat(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//               >
//                 <option value="">Choose a Sub category</option>
//                 {subcategories?.subcategories?.map((item) => (
//                   <option value={item.str} key={item.id}>
//                     {item.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             )}

//             {/* Tags */}
//             <div className="space-y-3">
//               <label className="block text-sm font-medium text-gray-700">
//                 Select Tags
//               </label>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                 {Tags.map((tag: Record<any,any>) => (
//                   <label
//                     key={tag.str}
//                     className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={tags.includes(tag.str)}
//                       onChange={() => handleCheckboxChange(tag.str)}
//                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
//                     />
//                     <span className="text-sm text-gray-700">{tag.name}</span>
//                   </label>
//                 ))}
//               </div>
//               {tags.length > 0 && (
//                 <div className="mt-2 p-3 bg-blue-50 rounded-lg">
//                   <p className="text-sm text-blue-800">
//                     <span className="font-medium">Selected Tags:</span>{" "}
//                     {tags.join(", ")}
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Stock */}
//             <div className="space-y-2">
//               <label
//                 htmlFor="stock"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Stock Quantity *
//               </label>
//               <input
//                 id="stock"
//                 type="number"
//                 placeholder="Enter Product Stock"
//                 required
//                 name="stock"
//                 value={stock}
//                 onChange={(e) => setStock(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//               />
//             </div>

//             {/* Image Upload */}
//             <div className="space-y-3">
//               <label
//                 htmlFor="image"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Product Images
//               </label>
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
//                 <input
//                   id="image"
//                   type="file"
//                   name="image"
//                   multiple
//                   onChange={uploadImage}
//                   className="hidden"
//                 />
//                 <label
//                   htmlFor="image"
//                   className="cursor-pointer flex flex-col items-center space-y-2"
//                 >
//                   <svg
//                     className="w-12 h-12 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                     />
//                   </svg>
//                   <div className="text-sm text-gray-600">
//                     <span className="font-medium text-blue-600 hover:text-blue-500">
//                       Click to upload
//                     </span>
//                     <span> or drag and drop</span>
//                   </div>
//                   <p className="text-xs text-gray-500">
//                     PNG, JPG, GIF up to 10MB
//                   </p>
//                 </label>
//               </div>
//             </div>

//             {/* Image Preview */}
//             {/* {imagePreview.length > 0 && (
//               <div className="space-y-3">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Image Preview
//                 </label>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {imagePreview.map((img, index) => (
//                     <div key={index} className="relative group">
//                       <img
//                         src={img}
//                         alt={`Product Preview ${index + 1}`}
//                         className="w-full h-24 object-cover rounded-lg border border-gray-200"
//                       />
//                       <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg"></div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )} */}

//             {/* Submit Button */}
//             <div className="pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center space-x-2">
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     <span>Creating Product...</span>
//                   </div>
//                 ) : (
//                   "Create Product"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <ToastContainer/>
//     </div>
//   );
// };

// export default CProductC;



import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import {
  createProduct,
  removeErrors,
  removeSuccess,
} from "../../context/admin/adminSlice";
import { toast, ToastContainer } from "react-toastify";
import { categories} from "../../utils/categories";
import { tags as Tags } from "../../utils/tags";
//import { Colors } from "chart.js";
// A small X icon component for the remove button

import { Size } from "../../utils/colors";
import ColorSelector from "./cproduct/ColorSelector";
const XCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
      clipRule="evenodd"
    />
  </svg>
);

const CProductC: React.FC = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcat, setSubcat] = useState("");
  const [issubcat, setIssubcat] = useState(false);
  const [subcategories, setSubcategories] = useState<Record<string, any> | null>({});
  const [stock, setStock] = useState("");
  const [image, setImage] = useState<string[]>([]);
  const [iloading, setIloading] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [size,setSize]=useState<string[]>([]);
  const [color,setColor]=useState<string[]>([]);
  const [discount, setDiscount] = useState("");
  const [isColor,setIsColor]=useState(false);
  const [isSize,setIsSize]=useState(false);
  const MAX_IMAGES = 5;
  const [stockDetail, setStockDetail] = useState({});
  const { error, success, loading } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  if (iloading) {
    toast.info("Uploading images...");
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setCategory(selectedValue);
    const items = categories.find((item) => item.str === selectedValue) || null;
    if (items?.subcategories?.length) {
      setIssubcat(true);
      setSubcategories(items);
    } else {
      setIssubcat(false);
      setSubcat("");
      setSubcategories(null);
    }


    if(items?.colors){
      setIsColor(true);
    }
    if(items?.ssize){
      setIsSize(true);
    }
  };


const handleStockDetailChange = (size:string, value:string) => {
  setStockDetail(prevDetails => ({
    ...prevDetails,
    [size]: value === '' ? undefined : Number(value) // Update the specific size, convert to number
  }));
};


  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (image.length + files.length > MAX_IMAGES) {
      toast.error(`You can only upload a maximum of ${MAX_IMAGES} images.`);
      return;
    }

    setIloading(true);

    const uploadPromises = Array.from(files).map(async (file) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "ppn3qr4u"); // Your Cloudinary preset

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dkzpbucfz/image/upload", // Your Cloudinary URL
        {
          method: "POST",
          body: data,
        }
      );
      return res.json();
    });

    try {
      const uploadedFiles = await Promise.all(uploadPromises);
      const newImageUrls = uploadedFiles.map((file) => file.secure_url);

      setImage((prevImages) => [...prevImages, ...newImageUrls]);
      toast.success("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Something went wrong while uploading images.");
    } finally {
      setIloading(false);
    }
  };

  // ** NEW: Function to remove an image **
  const removeImage = (urlToRemove: string) => {
    setImage((prevImages) =>
      prevImages.filter((imageUrl) => imageUrl !== urlToRemove)
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      createProduct({
        id,
        name,
        price,
        description,
        category,
        stock,
        discount,
        tags,
        image,
        subcat,
        size,
        colors:color,
        stockDetail
      })
    );
  };

  const handleCheckboxChange = (tag: string): void => {
    setTags((prevTags: string[]) =>
      prevTags.includes(tag)
        ? prevTags.filter((t: string) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSizeCheckboxChange=(sz:string): void =>{
    setSize((prevSz: string[]) =>
      prevSz.includes(sz)
        ? prevSz.filter((s: string) => s !== sz)
        : [...prevSz, sz]
    );
  }

  useEffect(() => {
    if (error) {
      toast.error("Some error occured while creating the product", { position: "top-center", autoClose: 6000 });
      dispatch(removeErrors());
    }
    if (success) {
      toast.success("Product Created successfully", {
        position: "top-center",
        autoClose: 6000,
      });
      dispatch(removeSuccess());
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setStock("");
      setImage([]);
    }
  }, [dispatch, error, success]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Create Product
          </h1>

          <form
            className="space-y-6"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            {/* ... (all your other form fields remain the same) ... */}
            {/* Product Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name *
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter Product Name"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>

            {/* Product ID */}
            <div className="space-y-2">
              <label
                htmlFor="id"
                className="block text-sm font-medium text-gray-700"
              >
                Product ID *
              </label>
              <input
                id="id"
                type="text"
                placeholder="Enter Id for this product"
                required
                name="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>

            {/* Price and Discount Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Price *
                </label>
                <input
                  id="price"
                  type="number"
                  placeholder="Enter Product Price"
                  required
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="discount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Discount (%)
                </label>
                <input
                  id="discount"
                  type="text"
                  placeholder="Enter Discount"
                  name="discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Product Description *
              </label>
              <textarea
                id="description"
                placeholder="Enter Product Description"
                required
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-vertical"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category *
              </label>
              <select
                id="category"
                required
                name="category"
                value={category}
                onChange={handleCategoryChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              >
                <option value="">Choose a Category</option>
                {categories.map((item) => (
                  <option value={item.str} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            {isSize && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Select Size Available for this item
              </label>
              <div className="grid grid-cols-6 md:grid-cols-5 gap-1">
                {Size.map((sz: string,ind:number) => (
                  <label
                    key={ind}
                    className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={size.includes(sz)}
                      onChange={() => handleSizeCheckboxChange(sz)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-sm text-gray-700">{sz}</span>
                  </label>
                ))}
              </div>
              {size.length > 0 && (
                <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Selected Size:</span>{" "}
                    {size.join(", ")}
                  </p>
                </div>
              )}
            </div>


            )}
            
            <ColorSelector isColor={isColor} selectedColors={color} setSelectedColors={setColor}/>
            {issubcat && (
               <div className="space-y-2">
              <label
                htmlFor="subcat"
                className="block text-sm font-medium text-gray-700"
              >
               Sub Category *
              </label>
              <select
                id="subcat"
                required
                name="subcat"
                value={subcat}
                onChange={(e)=>setSubcat(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              >
                <option value="">Choose a Sub category</option>
                {subcategories?.subcategories?.map((item:any) => (
                  <option value={item.str} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            )}

            {/* Tags */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Select Tags
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Tags.map((tag: Record<string, any>) => (
                  <label
                    key={tag.str}
                    className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={tags.includes(tag.str)}
                      onChange={() => handleCheckboxChange(tag.str)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-sm text-gray-700">{tag.name}</span>
                  </label>
                ))}
              </div>
              {tags.length > 0 && (
                <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Selected Tags:</span>{" "}
                    {tags.join(", ")}
                  </p>
                </div>
              )}
            </div>


 {/* ================================================================== */}
        {/* Detailed Stock by Size (NEW SECTION)                            */}
        {/* ================================================================== */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Detailed Stock by Size
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg">
            {size.map((s) => (
              <div key={s} className="space-y-1">
                <label
                  htmlFor={`stock-${s}`}
                  className="block text-sm font-medium text-gray-600"
                >
                  Stock for Size: <span className="font-bold">{s}</span>
                </label>
                <input
                  id={`stock-${s}`}
                  type="number"
                  placeholder="e.g., 10"
                  name={s}
                  value={stockDetail[s] || ''}
                  onChange={(e) => handleStockDetailChange(s, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            ))}
          </div>
        </div>




            {/* Stock */}
            <div className="space-y-2">
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700"
              >
                Stock Quantity *
              </label>
              <input
                id="stock"
                type="number"
                placeholder="Enter Product Stock"
                required
                name="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
              <label
                htmlFor="image-upload-input"
                className="block text-sm font-medium text-gray-700"
              >
                Product Images ({image.length}/{MAX_IMAGES})
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  id="image-upload-input"
                  type="file"
                  name="image"
                  multiple
                  accept="image/png, image/jpeg, image/gif"
                  onChange={uploadImage}
                  className="hidden"
                  disabled={iloading || image.length >= MAX_IMAGES}
                />
                <label
                  htmlFor="image-upload-input"
                  className={`cursor-pointer flex flex-col items-center space-y-2 ${
                    iloading || image.length >= MAX_IMAGES
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-blue-600 hover:text-blue-500">
                      {iloading ? "Uploading..." : "Click to upload"}
                    </span>
                    <span> or drag and drop</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </label>
              </div>
            </div>

            {/* ** NEW: Image Preview Section ** */}
            {image.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-800 mb-2">
                  Uploaded Images:
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {image.map((url) => (
                    <div key={url} className="relative group">
                      <img
                        src={url}
                        alt="Uploaded product"
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button" // Important to prevent form submission
                        onClick={() => removeImage(url)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        <XCircleIcon />
                      </button>
                    </div>
                  ))}
                  {iloading && (
                    <div className="w-full h-24 bg-gray-200 rounded-lg animate-pulse"></div>
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || iloading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Creating Product..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CProductC;
