import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetchFullOrders from "../hooks/useFetchFullOrders";
import { OrderProduct } from "../types/types";
import { Plus, Minus } from "lucide-react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { upQuantite, deleteBasket } from '../api/basketService';
import Button from "../components/aggregate/button";
import { useNavigate } from "react-router-dom";
import { finishOrder } from "../api/orderService";

const OrderValidation = () => {
    
    const location = useLocation();
    const { orderId } = location.state || {};
    const navigate = useNavigate();

    const { fullOrder, error } = useFetchFullOrders(orderId );
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
    const [confirmDeletion, setConfirmDeletion] = useState<{ [key: number]: boolean }>({});
    const [showTooltip, setShowTooltip] = useState<{ [key: number]: boolean }>({});
    const [activeProducts, setActiveProducts] = useState<OrderProduct[]>([]);

    useEffect(() => {
        if (fullOrder) {
            const initialQuantities: { [key: number]: number } = {};
            fullOrder.produits.forEach((product: OrderProduct) => {
                initialQuantities[product.produit_id] = product.quantiteCommande;
            });
            setQuantities(initialQuantities);
            setActiveProducts(fullOrder.produits);
        }
    }, [fullOrder]);

    const handleQuantityChange = (productId: number, change: number) => {
        setQuantities((prev) => {
            const currentQty = prev[productId] || 0;
            const newQty = currentQty + change;

            if (newQty <= 0) {
                setConfirmDeletion((prevConfirm) => ({ ...prevConfirm, [productId]: true }));
                setShowTooltip((prevShow) => ({ ...prevShow, [productId]: true }));
                return prev;
            }

            setActiveProducts(currentProducts => 
                currentProducts.map(product => 
                    product.produit_id === productId 
                        ? { ...product, quantiteCommande: newQty } 
                        : product
                )
            );
            upQuantite(productId, orderId, newQty)
            setConfirmDeletion((prevConfirm) => ({ ...prevConfirm, [productId]: false }));
            setShowTooltip((prevShow) => ({ ...prevShow, [productId]: false }));
            return { ...prev, [productId]: newQty };
        });
        
    };

    const confirmRemoveProduct = (productId: number) => {
        // Supprime le produit du panier dans la base de données
        deleteBasket(productId, orderId);
        
        // Supprimer le produit de activeProducts
        setActiveProducts(currentProducts => 
            currentProducts.filter(product => product.produit_id !== productId)
        );
        
        // Mettre à jour les quantités
        setQuantities((prev) => {
            const newQuantities = { ...prev };
            delete newQuantities[productId];
            return newQuantities;
        });
        
        setConfirmDeletion((prevConfirm) => ({ ...prevConfirm, [productId]: false }));
        setShowTooltip((prevShow) => ({ ...prevShow, [productId]: false }));
    };

    const cancelDeletion = (productId: number) => {
        setConfirmDeletion((prevConfirm) => ({ ...prevConfirm, [productId]: false }));
        setShowTooltip((prevShow) => ({ ...prevShow, [productId]: false }));
    };

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-yellow-50">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    const calculateTotal = () => {
        return activeProducts.reduce((total, product) => {
            const qty = quantities[product.produit_id] || 0;
            return total + product.prixUnitaire * qty;
        }, 0);
    };
    const handlefinish = () =>{
        const total = calculateTotal(); 
        finishOrder(orderId, total); 
        navigate('/');
    }
    return (
        <div className="bg-yellow-50 min-h-screen p-8 pt-28">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <div className="border-b pb-4 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Commande N° {fullOrder?.numeroCommande}
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left">Produit</th>
                                <th className="px-6 py-3 text-right">Prix unitaire</th>
                                <th className="px-6 py-3 text-center">Quantité</th>
                                <th className="px-6 py-3 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeProducts.map((product: OrderProduct) => {
                                const qty = quantities[product.produit_id] || 0;
                                const total = product.prixUnitaire * qty;

                                return (
                                    <tr key={product.produit_id} className="border-t">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={API_URL + product.photoProduit}
                                                    alt={product.nomproduit}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <span className="font-medium">{product.nomproduit}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {product.prixUnitaire.toFixed(2)} €
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center space-x-2">
                                                {confirmDeletion[product.produit_id] ? (
                                                    <div className="bg-gray-200 p-2 rounded flex items-center space-x-2">
                                                        <span className="text-sm">Confirmer la suppression ?</span>
                                                        <button
                                                            onClick={() => confirmRemoveProduct(product.produit_id)}
                                                            className="text-red-500 hover:underline mx-1 text-sm"
                                                        >
                                                            Oui
                                                        </button>
                                                        <button
                                                            onClick={() => cancelDeletion(product.produit_id)}
                                                            className="text-blue-500 hover:underline mx-1 text-sm"
                                                        >
                                                            Non
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <button
                                                            id={`decrease-${product.produit_id}`}
                                                            onClick={() => handleQuantityChange(product.produit_id, -1)}
                                                            className="p-1 rounded hover:bg-gray-100"
                                                            data-tooltip-id={`tooltip-${product.produit_id}`}
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        {qty === 1 && (
                                                            <ReactTooltip
                                                                id={`tooltip-${product.produit_id}`}
                                                                place="top"
                                                                content="Attention, vous supprimez le produit"
                                                                isOpen={showTooltip[product.produit_id]}
                                                            />
                                                        )}
                                                        <span className="w-12 text-center">{qty}</span>
                                                        <button
                                                            onClick={() => handleQuantityChange(product.produit_id, 1)}
                                                            className="p-1 rounded hover:bg-gray-100"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium">
                                            {total.toFixed(2)} €
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr className="border-t">
                                <td colSpan={3} className="px-6 py-4 text-right font-semibold">
                                    Total
                                </td>
                                <td className="px-6 py-4 text-right font-semibold">
                                    {calculateTotal().toFixed(2)} €
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <Button        
            label="Payer"
            onClick={handlefinish}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            />
        </div>
    );
};

export default OrderValidation;