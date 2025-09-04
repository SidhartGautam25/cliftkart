import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosConfig";
import { findTagIndex } from "../../utils/tags";
import { findCategoryIndex } from "../../utils/categories";

interface Product {
  // You can still define known properties for type-safety and autocompletion
  id: string;
  name: string;
  price: number;

  // This is the index signature. It allows the object to have any
  // other property where the key is a string and the value is of any type.
  [key: string]: any;
}

interface ProductResponse {
  products: Product[];
  totalPages: number;
  currentPage: number;
  // ... other response fields
}

const useProductFetcher = (
  initialTag: string = "",
  initialPage: number = 1,
  byTag: boolean = true
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [tag, setTag] = useState<string>(initialTag);
  const [category, setCategory] = useState<string>(initialTag);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchRelatedProducts = async (pageNum: number, category: string) => {
    setLoading(true);
    setError(null);
    try {
      const cat=findCategoryIndex(category);
      let link = `/api/v1/products?page=${pageNum}&category=${cat}`;
      const { data } = await axiosInstance.get(link);
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setPage(data.currentPage);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async (pageNum: number, Tag: string) => {
    console.log("Trying to fetch products");
    setLoading(true);
    setError(null);

    try {
      let link = `/api/v1/productsByTag?page=${pageNum}`;

      if (Tag) {
        console.log("Tag in fetch product hook is ",Tag);
        const tag = findTagIndex(Tag);
        console.log("tag in fetch hook is ",tag);
        link += `&tag=${tag}`;
      }

      console.log("Trying to get products");
      const { data } = await axiosInstance.get<ProductResponse>(link);
      console.log("Data is ", data);

      setProducts(data.products);
      setTotalPages(data.totalPages);
      setPage(data.currentPage);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (byTag) {
      fetchProducts(page, tag);
    } else {
      fetchRelatedProducts(page,category);
    }
  }, []);

  // Function to manually refetch with new parameters
  const refetch = (newTag?: string, newPage?: number) => {
    const updatedTag = newTag !== undefined ? newTag : tag;
    const updatedPage = newPage !== undefined ? newPage : page;

    if (!byTag) {
      if (newTag !== undefined) setCategory(newTag);
      fetchRelatedProducts(updatedPage,category);
    } else {
      if (newTag !== undefined) setTag(newTag);
      if (newPage !== undefined) setPage(newPage);
      fetchProducts(updatedPage, updatedTag);
    }

    
  };

  return {
    products,
    loading,
    error,
    page,
    totalPages,
    tag,
    refetch,
    setPage,
    setTag,
  };
};

export default useProductFetcher;
