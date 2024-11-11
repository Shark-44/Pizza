import { useState } from "react";
import useFetchTypes from "../hooks/useFetchTypes";
import useFetchProducts from "../hooks/useFetchProducts";
import { Plus, Minus } from "lucide-react";
import { updatedPrice } from "../api/priceService";
import { PriceUpdateRequest } from "../types/types";

type UpdatedPrices = {
    [key: number]: number;
};

const ProductTableByType = () => {
    const types = useFetchTypes("fr");
    const { products, error } = useFetchProducts();
    const [openType, setOpenType] = useState<number | null>(null);
    const [updatedPrices, setUpdatedPrices] = useState<UpdatedPrices>({});

    const toggleType = (typeId: number) => {
        setOpenType(prevType => (prevType === typeId ? null : typeId));
    };

    const handlePriceChange = (productId: number, delta: number) => {
        setUpdatedPrices((prevPrices) => {
            const currentPrice = prevPrices[productId] ?? Number(products.find(p => p.id === productId)?.nouveauPrix) ?? 0;
            const newPrice = (currentPrice + delta).toFixed(2);  
    
            return { ...prevPrices, [productId]: parseFloat(newPrice) };  
        });
    };

    const updatePrice = async (productId: number, nouveauPrix: number) => {
        const produit = products.find(p => p.id === productId);
        if (!produit) return;

        const priceData: PriceUpdateRequest = {
            dateprix: new Date().toISOString().split("T")[0],
            ancienPrix: produit.nouveauPrix,
            nouveauPrix: nouveauPrix,
            produit_id: productId,
        };

        try {
            const response = await updatedPrice(priceData);
            console.log(`Prix du produit ${productId} mis à jour avec succès !`,response);
        } catch (error) {
            console.error('Erreur lors de l\'envoi du prix mis à jour:', error);
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="min-h-screen p-8 pt-28">
            {types.map((type) => (
                <div key={type.id} className="mb-4">
                    <button
                        onClick={() => toggleType(type.id)}
                        className="w-full text-left p-4 bg-blue-500 text-white rounded"
                    >
                        {type.nomtype}
                    </button>

                    {openType === type.id && (
                        <div className="overflow-x-auto">
                            <table className="w-full mt-2 border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-6 py-3 text-left">Nom Produit</th>
                                        <th className="px-6 py-3 text-right">Prix Actuel</th>
                                        <th className="px-6 py-3 text-center">Nouveau Prix</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products
                                        .filter(product => product.type_id === type.id)
                                        .map((product) => {
                                            const currentPrice = updatedPrices[product.id] ?? Number(product.nouveauPrix) ?? 0;

                                            return (
                                                <tr key={product.id} className="border-t">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center space-x-4">
                                                            <span className="font-medium">{product.nomproduit}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                         <button
                                                            onClick={() => handlePriceChange(product.id, -.05)}
                                                            className="p-1 rounded hover:bg-gray-100"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        {Number(product.nouveauPrix || 0).toFixed(2)} €
                                                        <button
                                                            onClick={() => handlePriceChange(product.id, .05)}
                                                            className="p-1 rounded hover:bg-gray-100"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center justify-center space-x-2">
                                                            <span>{currentPrice.toFixed(2)} €</span>
                                                            <button
                                                                onClick={() => updatePrice(product.id, currentPrice)}
                                                                className="ml-2 p-1 rounded bg-green-500 text-white"
                                                            >
                                                                Mettre à jour
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProductTableByType;
