import React from 'react';
import type { Product } from '../../types/productType';
import { useHandleSlugProduct } from '../../hooks/useHandleSlugProduct';

interface ItemProps {
  product: Product;
}

export const Item: React.FC<ItemProps> = ({ product }) => {
  const { handleSlug } = useHandleSlugProduct();

  return (
    <div
      onClick={() => handleSlug(product)}
      className="border p-2 rounded shadow hover:shadow-lg transition cursor-pointer"
    >
      <img 
        src={product.image_url || '/placeholder.png'} 
        alt={product.name} 
        className="w-full h-40 object-contain mb-2 rounded"
      />
      <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
      <p className="text-red-500 font-bold mt-1">{product.price.toLocaleString()}₫</p>
    </div>
  );
};