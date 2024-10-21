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
                console.log("Réponse de fetchProducts:", res); // Affiche la structure de la réponse

                if (Array.isArray(res)) {
                    setProducts(res);
                } else if (typeof res === 'object' && res !== null) {
                    // Si la réponse est un objet, essayez de trouver un tableau de produits à l'intérieur
                    const productsArray = Object.values(res).find(Array.isArray);
                    if (productsArray) {
                        setProducts(productsArray);
                    } else {
                        console.error("Impossible de trouver un tableau de produits dans la réponse", res);
                    }
                } else {
                    console.error("La réponse n'est pas un tableau ni un objet", res);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des produits", error);
            }
        };
   
        fetchData();
    }, []);
   
    return (
        <div>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default Orders;