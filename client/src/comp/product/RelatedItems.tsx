import React from "react";
import ProductCard from "./ProductCard";
import useProductFetcher from "../../context/hooks/tagProduct";

type RelatedItemsProps = {
  cat: string;
  id: string;
};

const RelatedItems: React.FC<RelatedItemsProps> = ({ cat, id }) => {
  const category = cat || "fashion";
  const { products: allProducts, loading } = useProductFetcher(
    category,
    1,
    false
  );

  // 1. Filter out the product that matches the current product's ID
  // 2. Slice the result to ensure the list never exceeds 4 items
  const products = allProducts
    .filter((product) => product.id !== id)
    .slice(0, 4);

  console.log(
    "in related item section ",
    products,
    " and loading is ",
    loading
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Heading */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-4 bg-red-500 rounded-sm" />
        <h2 className="text-lg font-semibold">Related Item</h2>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product, idx) => (
          <div key={idx}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedItems;
