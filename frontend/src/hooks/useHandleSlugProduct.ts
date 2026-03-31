
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types/productType';

export const useHandleSlugProduct = () => {
  const navigate = useNavigate();
  const handleSlug = (product: Product) => {
    navigate(`/chi-tiet/${product.slug}`);
  };

  return { handleSlug };
};