import { useLocation } from "react-router-dom";
import { useState } from "react";
import useFetchFullOrders from "../hooks/useFetchFullOrders";
import { OrderProduct } from "../types/types";
import { Plus, Minus } from "lucide-react";

const OrderValidation = () => {
    const location = useLocation();
    const { id } = location.state || {};
    const { fullOrder, error } = useFetchFullOrders(2); // Remettre id a la place de 2. Ici pour des tests 
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const [quantities, setQuantities] = useState<{[key: number]: number}>({});

    const handleQuantityChange = (productId: number, change: number) => {
        setQuantities(prev => {
            const currentQty = prev[productId] || 0;
            const newQty = Math.max(0, currentQty + change);
            return { ...prev, [productId]: newQty };
        });
    };

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-yellow-50">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    const calculateTotal = () => {
        if (!fullOrder?.produits) return 0;
        return fullOrder.produits.reduce((total, product) => {
            const qty = quantities[product.produit_id] || product.quantiteCommande;
            return total + (product.prixUnitaire * qty);
        }, 0);
    };

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
                            {fullOrder?.produits.map((product: OrderProduct) => {
                                const qty = quantities[product.produit_id] || product.quantiteCommande;
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
                                                <button
                                                    onClick={() => handleQuantityChange(product.produit_id, -1)}
                                                    className="p-1 rounded hover:bg-gray-100"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-12 text-center">{qty}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(product.produit_id, 1)}
                                                    className="p-1 rounded hover:bg-gray-100"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
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
        </div>
    );
};

export default OrderValidation;