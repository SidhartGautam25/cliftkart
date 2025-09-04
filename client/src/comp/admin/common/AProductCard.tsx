// components/dashboard/AProductCard.tsx
import React from "react";
import { FilePenLine, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";



interface AProductCardProps {
  product: Record<string,any>;
  id: string;
  onDelete?: (id: string) => void; // Optional for now
}

const AProductCard: React.FC<AProductCardProps> = ({ product, id, onDelete }) => {

  const naviage=useNavigate();
  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    } else {
      console.log("Delete product", id);
    }
  };

   const handleEdit = () => {
    console.log("id is ",id);
     naviage(`/admin/product/edit/${id}`)
  };

  return (
    <div className="bg-white rounded-lg border shadow p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
  {/* Product Info */}
  <div className="flex items-center gap-4">
    <img
      src={product.image[0]}
      alt={product.name}
      className="w-16 h-16 object-cover rounded-md border"
    />
    <div>
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-600">₹{product.price.toFixed(2)}</p>
    </div>
  </div>

  {/* Action Buttons Group */}
  <div className="flex items-center gap-2">
    {/* Edit Button */}
    <button
      onClick={handleEdit}
      className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition-colors"
    >
      <FilePenLine className="w-4 h-4 mr-1.5" />
      Edit
    </button>
    
    {/* Delete Button */}
    <button
      onClick={handleDelete}
      className="flex items-center px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm transition-colors"
    >
      <Trash2 className="w-4 h-4 mr-1.5" />
      Delete
    </button>
  </div>
</div>
  );
};

export default AProductCard;
