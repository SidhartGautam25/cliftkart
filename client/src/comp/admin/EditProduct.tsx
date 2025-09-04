import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { categories } from "../../utils/categories";
import { tags as Tags } from "../../utils/tags";

import { useParams } from "react-router-dom";
import { useAdminProduct } from "../../context/hooks/admin/product";


export interface CatItem {
  id: string;
  name: string;
  str: string;
}

export type CatItems = CatItem[];



const EditProductC: React.FC = () => {
  const { product, fetchProductDetails, loading, updateProduct, error,success } = useAdminProduct();
  console.log("product in the edit component is ", product);
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [iid, setIid] = useState("");
  const [subcat, setSubcat] = useState("");
  const [issubcat, setIssubcat] = useState(false);
  const [subcategories, setSubcategories] = useState<CatItems | null>(null);
  const [stock, setStock] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [discount, setDiscount] = useState("");
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setCategory(selectedValue);
    const items = categories.find((item) => item.str === selectedValue) || null;
    if (items?.subcategories?.length) {
      setIssubcat(true);
      setSubcategories(items.subcategories);
    }
  };



  const handleSubmit = () => {

    console.log("you clicked to update the product and going to call updateProduct")
    console.log("tags is ", tags);
    const productData = {
      id: iid,
      name,
      price,
      description,
      category,
      stock,
      discount,
      tags,
      image: product?.image,
      subcat
    };
    const pid = id || "";
    updateProduct(pid, productData)

    // if (error) {
    //   toast.error("Please Try Again . Some Error occured while updating the details")
    // } else {
    //   toast.success("Product updated successfully");
    // }

  };

  const handleCheckboxChange = (tag: string): void => {
    setTags((prevTags: string[]) =>
      prevTags.includes(tag)
        ? prevTags.filter((t: string) => t !== tag)
        : [...prevTags, tag]
    );
  };

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error, { position: "top-center", autoClose: 6000 });
  //     dispatch(removeErrors());
  //   }
  //   if (success) {
  //     toast.success("Product Created successfully", {
  //       position: "top-center",
  //       autoClose: 6000,
  //     });
  //     dispatch(removeSuccess());
  //     setName("");
  //     setPrice("");
  //     setDescription("");
  //     setCategory("");
  //     setStock("");
  //     setImage([]);
  //     // setImagePreview([]);
  //   }
  // }, [dispatch, error, success]);

  useEffect(() => {
  if (error) {
    toast.error("some error occurs while updating the product details"); // Or a more generic message
    // clearAdminState(); // Reset the error state so it doesn't show again
  }

  if (success) {
    toast.success("Product updated successfully");
    // clearAdminState(); // Reset the success state
  }
}, [error, success]);



  console.log("product detail on edit page is ", product);
  useEffect(() => {
    console.log("id is ", id);
    if (id) {
      fetchProductDetails(id);
    }
    console.log("fetched product detail is ", product);
  }, [id, fetchProductDetails]);

  useEffect(() => {
    console.log("product in edit use effect is ", product);
    setName(product?.name ?? "");
    // setCategory(product?.category ?? "");
    setDescription(product?.description ?? "");
    setPrice(product?.price ?? "");
    setStock(product?.stock ?? "");
    setDiscount(product?.discount ?? "");
    console.log("product id is ", product?.id)
    setIid(product?.id ?? "")
    setTags(product?.tags ?? [])
    setSubcat(product?.subcat ?? "")

    const currentCategoryStr = product?.category ?? "";
    setCategory(currentCategoryStr);

    if (currentCategoryStr) {
      const categoryData = categories.find(
        (item) => item.str === currentCategoryStr
      );

      // If that category has subcategories, update the state to show them
      if (categoryData?.subcategories?.length) {
        setIssubcat(true);
        setSubcategories(categoryData.subcategories);
      } else {
        // Otherwise, ensure the subcategory dropdown is hidden
        setIssubcat(false);
        setSubcategories(null);
      }
    }

  }, [product])

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Edit Product Details
          </h1>

          <form
            className="space-y-6"
            encType="multipart/form-data"
          // onSubmit={handleSubmit}
          >
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

            {/* Product ID  */}
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
                value={iid}
                // onChange={(e) => setIid(e.target.value)}
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
                // onChange={(e) => setCategory(e.target.value)}
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

            {issubcat && (
              <div className="space-y-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sub Category *
                </label>
                <select
                  id="subcat"
                  required
                  name="subcat"
                  value={subcat}
                  // onChange={(e) => setCategory(e.target.value)}
                  onChange={(e) => setSubcat(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                >
                  <option value="">Choose a Sub category</option>
                  {subcategories?.map((item) => (
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
                {Tags.map((tag: Record<any, any>) => (
                  <label
                    key={tag.str}
                    className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={tags?.includes(tag.str)}
                      onChange={() => handleCheckboxChange(tag.str)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-sm text-gray-700">{tag.name}</span>
                  </label>
                ))}
              </div>
              {tags?.length > 0 && (
                <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Selected Tags:</span>{" "}
                    {tags.join(", ")}
                  </p>
                </div>
              )}
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


            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Editing  Product Details...</span>
                  </div>
                ) : (
                  "Edit Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditProductC;
