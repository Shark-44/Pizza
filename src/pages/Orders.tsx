import { useState } from "react";
import ProductCard from "../components/specificPageComponents/ProductCard";
import { Product, Basket } from '../types/types';
import Sidebar from "../components/specificPageComponents/Sidebar";
import useFetchProducts from "../hooks/useFetchProducts";
import { addItem, upQuantite } from '../api/basketService';
import { useLocation } from "react-router-dom";
import Banner from "../components/specificPageComponents/Banner";

const Orders = () => {
    const [idType, setIdType] = useState<number | undefined>(undefined); 
    const [basket, setBasket] = useState<Basket[]>([]);
    const { products, error } = useFetchProducts(idType);
    const location = useLocation();
    const { orderId } = location.state || {};

   

    const handleAddToBasket = async (product: Product) => { 
        const existingItem = basket.find(item => item.produit_id === product.id);
    
        if (existingItem) {
            const quantiteCommande = existingItem.quantiteCommande + 1;
    
            try {
                const updatedBasket = await upQuantite(product.id, orderId, quantiteCommande);
                console.log("Quantité mise à jour :", updatedBasket);
    
                setBasket(prevBasket =>
                    prevBasket.map(item =>
                        item.produit_id === product.id
                            ? { ...item, quantiteCommande }
                            : item
                    )
                );
            } catch (error) {
                console.error("Erreur lors de la mise à jour de la quantité :", error);
            }
    
        } else {
            try {
                const data = await addItem(product.id, orderId);
                console.log("Produit ajouté au panier :", data);
    
                setBasket(prevBasket => [
                    ...prevBasket,
                    { produit_id: product.id, commande_id: orderId, quantiteCommande: 1 }
                ]);
            } catch (error) {
                console.error("Erreur lors de l'ajout au panier :", error);
            }
        }
    };
    

    return (
        <>
            <Banner />
            <div className="bg-yellow-50 min-h-screen">
                <Sidebar orderItems={basket} setIdType={setIdType} orderId={orderId} />
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
        </>
    );
};

export default Orders;
