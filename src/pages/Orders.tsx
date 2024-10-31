import { useState } from "react";
import ProductCard from "../components/specificPageComponents/ProductCard";
import { Product, Basket } from '../types/types';
import Sidebar from "../components/specificPageComponents/Sidebar";
import useFetchProducts from "../hooks/useFetchProducts";
import { addItem } from '../api/basketService';

const Orders = () => {
    const [idType, setIdType] = useState<number | undefined>(undefined); 
    const [basket, setBasket] = useState<Basket[]>([]);
    const { products, error } = useFetchProducts(idType);
    console.log("Mon panier :", basket);

    const handleAddToBasket = async (product: Product) => {  // Change to async
        setBasket((prevBasket) => {
            const existingItem = prevBasket.find(item => item.produit_id === product.id);

            if (existingItem) {
                return prevBasket.map(item =>
                    item.produit_id === product.id
                        ? { ...item, quantiteCommande: item.quantiteCommande + 1 }
                        : item
                );
            } else {
                
                addItem(product.id, 2)  
                    .then((data) => {
                        
                        console.log("Produit ajouté au panier :", data);
                    })
                    .catch((error) => {
                        console.error("Erreur lors de l'ajout au panier :", error);
                    });
                
                return [...prevBasket, { produit_id: product.id, commande_id: 0, quantiteCommande: 1 }];
            }
        });
    };

    return (
        <div className="bg-yellow-50 min-h-screen">
            <Sidebar orderItems={basket} setIdType={setIdType} />
            <div className="bg-yellow-50 flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20 ml-64">
                {error ? (
                    <p>{error}</p>
                ) : (
                    products.map((product: Product) => (
                        <ProductCard key={product.id} product={product} onAddToBasket={handleAddToBasket} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Orders;
