import { useEffect, useState } from "react";
import { fetchProducts, fetchProductsByType } from "../api/productService";
import { Product } from '../types/types';

const useFetchProducts = (idType?: number) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = idType !== undefined 
                    ? await fetchProductsByType(idType)
                    : await fetchProducts();
                setProducts(res);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits", error);
                setError("Erreur lors de la récupération des produits");
            }
        };

        fetchData();
    }, [idType]);

    return { products, error };
};

export default useFetchProducts;
