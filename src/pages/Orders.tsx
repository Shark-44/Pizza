import { useEffect, useState } from "react";
import ProductCard from "../components/specificPageComponents/ProductCard";
import { fetchProducts, fetchProductsByType } from "../api/productService";
import { Product } from '../types/types';
import Sidebar from "../components/specificPageComponents/Sidebar";

const Orders = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [idType, setIdType] = useState<number | undefined>(undefined); 

    const orderItems = [
        { id: 1, name: 'Article 1', quantity: 2 },
        { id: 2, name: 'Article 2', quantity: 1 },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = idType !== undefined 
                    ? await fetchProductsByType(idType)
                    : await fetchProducts();
                setProducts(res);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits", error);
            }
        };
        
        fetchData();
    }, [idType]);

    return (
        <div className="flex">
            <Sidebar orderItems={orderItems} setIdType={setIdType} />
            <div className="bg-yellow-50 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-20 ml-64">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Orders;
