import { useState } from "react";
import { CreateCategoryApi } from "../services/categoryApi";
import type { CategoryCreate } from "../types/categoryType";

export const useCreateCategory = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createCategory = async (data: CategoryCreate) => {
        try {
            setLoading(true);
            setError(null);

            const res = await CreateCategoryApi(data);
            return res;
        } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    return {
        createCategory,
        loading,
        error
    };
};