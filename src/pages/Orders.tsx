import { useState } from "react";
import ProductCard from "../components/specificPageComponents/ProductCard";
import { Product } from '../types/types';
import Sidebar from "../components/specificPageComponents/Sidebar";
import useFetchProducts from "../hooks/useFetchProducts";

const Orders = () => {
    const [idType, setIdType] = useState<number | undefined>(undefined); 

    const { products, error } = useFetchProducts(idType);

    const orderItems = [
        { id: 1, name: 'Article 1', quantity: 2 },
        { id: 2, name: 'Article 2', quantity: 1 },
    ];

    return (
        <div className="flex">
            <Sidebar orderItems={orderItems} setIdType={setIdType} />
            <div className="bg-yellow-50 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-20 ml-64">
                {error ? (
                    <p>{error}</p> 
                ) : (
                    products.map((product: Product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Orders;
