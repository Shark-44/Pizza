import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../api/productService";
import { Product } from '../types/types';

const Orders = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchProducts();          
                    setProducts(res);
             
            } catch (error) {
                console.error("Erreur lors de la récupération des produits", error);
            }
        };
   
        fetchData();
    }, []);
   
    return (
        <div className="bg-yellow-50 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default Orders;