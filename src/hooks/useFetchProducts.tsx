import { useEffect, useState } from "react";
import { fetchProductsAndPrice, fetchProductsByType } from "../api/productService";
import { Product } from '../types/types';
import useLanguage from '../hooks/useLanguage';


const normalizeKeys = (data: any[]) => {
    return data.map(item => ({
        ...item,
        typeId: item.type_id,
        
    }));
};

const useFetchProducts = (idType?: number) => {
    const { language } = useLanguage();
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = idType !== undefined 
                    ? await fetchProductsByType(idType, language)
                    : await fetchProductsAndPrice(language);

               
                const normalizedData = normalizeKeys(res);
                setProducts(normalizedData);
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
