import Card from "./Card";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct, removeErrors } from "../../context/product/productSlice";
import { toast } from "react-toastify";

interface Product {
  [key: string]: any;
}

export default function ProductsC() {
  const { loading, error, products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const { category = "vegetables" } = useParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    priceRange: "all",
    discount: false,
    inStock: false,
  });

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product._id}`);
  };

  useEffect(() => {
    dispatch(getProduct({ page: 1, category }));
  }, [dispatch, category]);

  useEffect(() => {
    if (error) {
      toast.error("Some error occurred", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  const filteredProducts = products.filter((product: Product) => {
    const price = product.price || 0;
    const inStock = product.stock > 0;
    const hasDiscount = product.discount > 0;

    let pass = true;

    if (filters.inStock && !inStock) pass = false;
    if (filters.discount && !hasDiscount) pass = false;

    switch (filters.priceRange) {
      case "under500":
        if (price >= 500) pass = false;
        break;
      case "500to1000":
        if (price < 500 || price > 1000) pass = false;
        break;
      case "above1000":
        if (price <= 1000) pass = false;
        break;
    }

    return pass;
  });

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar for Desktop */}
        <aside className="hidden md:block w-full md:w-1/4 border rounded-lg p-4 bg-white shadow-sm h-fit sticky top-20">
          <Filters filters={filters} setFilters={setFilters} />
        </aside>

        {/* Filter Dropdown for Mobile */}
        <div className="block md:hidden mb-4">
          <details className="border rounded-lg bg-white shadow-sm">
            <summary className="p-4 cursor-pointer font-medium">Filter Products</summary>
            <div className="p-4 border-t">
              <Filters filters={filters} setFilters={setFilters} />
            </div>
          </details>
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-3/4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product: Product, idx: number) => (
                <div
                  key={product._id || idx}
                  className="cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <Card product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10 text-lg">
              No products found with selected filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 🔽 Filter Section extracted for reuse in sidebar + dropdown
function Filters({
  filters,
  setFilters,
}: {
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <>
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      {/* Price Filter */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Price</h4>
        <div className="space-y-1 text-sm text-gray-700">
          {["all", "under500", "500to1000", "above1000"].map((val) => (
            <label key={val} className="block">
              <input
                type="radio"
                name="price"
                value={val}
                checked={filters.priceRange === val}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="mr-2"
              />
              {val === "all"
                ? "All"
                : val === "under500"
                ? "Under ₹500"
                : val === "500to1000"
                ? "₹500 - ₹1000"
                : "Above ₹1000"}
            </label>
          ))}
        </div>
      </div>

      {/* Discount & Stock */}
      <div className="mb-2">
        <h4 className="text-sm font-medium mb-2">Other</h4>
        <label className="block text-sm text-gray-700">
          <input
            type="checkbox"
            checked={filters.discount}
            onChange={() => setFilters((prev: any) => ({ ...prev, discount: !prev.discount }))}
            className="mr-2"
          />
          With Discount
        </label>
        <label className="block text-sm text-gray-700">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={() => setFilters((prev: any) => ({ ...prev, inStock: !prev.inStock }))}
            className="mr-2"
          />
          In Stock Only
        </label>
      </div>
    </>
  );
}
