
import { useNavigate } from 'react-router-dom';
import type { SupplierType } from '../types/supplierType';

export const useHandleSlugSupplier = () => {
  const navigate = useNavigate();
  const handleSlug = (product: SupplierType) => {
    navigate(`/nha-cung-cap/${product.slug}`);
  };

  return { handleSlug };
};